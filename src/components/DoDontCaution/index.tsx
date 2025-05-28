import React from "react";
import clsx from "clsx";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

import "./index.css";

import Icon from "@mdi/react";
import { mdiCheck, mdiClose, mdiAlert } from "@mdi/js";
import { useTheme } from "../../context/ThemeContext";
import { passImage } from "../../utils/helpers";

interface DoDontCautionProps {
  imageSrc: Array<string> | string;
  imageAlt: string;
  state?: "good" | "bad" | "none" | "caution";
  caption?: string;
}
interface ImageFile {
  node: {
    relativePath: string;
    ext: string;
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}
const STATE_VALUES = {
  good: { icon: mdiCheck, classPrefix: "do" },
  bad: { icon: mdiClose, classPrefix: "dont" },
  caution: { icon: mdiAlert, classPrefix: "caution" },
};

const DoDontCaution: React.FC<DoDontCautionProps> = ({
  imageSrc,
  imageAlt,
  state = "none",
  caption,
}) => {
  const { theme } = useTheme();
  const transformedImageSrc = passImage(imageSrc, theme);

  const imageData: ImageFile[] = useStaticQuery(graphql`
    query {
      allFile(filter: { ext: { in: [".jpg", ".png"] } }) {
        edges {
          node {
            relativePath
            ext
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `).allFile.edges;

  const filterImageData = () => {
    if (!imageData) {
      // eslint-disable-next-line no-console
      console.warn("No images found by gatsby-source-filesystem.");
      return undefined;
    }

    const imageMatches = imageData.filter((image) =>
      image.node.relativePath.includes(
        transformedImageSrc.substring(
          transformedImageSrc.lastIndexOf("/"),
          transformedImageSrc.lastIndexOf("-")
        )
      )
    );

    const imageFile =
      imageMatches.length > 1
        ? imageMatches.find(
            (image) => !image.node.relativePath.endsWith("dark.png")
          )
        : imageMatches[0];

    if (!imageFile) {
      // eslint-disable-next-line no-console
      console.warn(
        "Image file could not be found by gatsby-source-filesystem."
      );
      return undefined;
    }

    return imageFile.node.childImageSharp.gatsbyImageData;
  };

  const filteredImageData = filterImageData();

  return (
    <div
      className={clsx(
        state === "none" ? state : STATE_VALUES[state].classPrefix
      )}
    >
      {state !== "none" && (
        <div
          slot="icon"
          className={clsx(
            "do-dont-caution-containers",
            `${STATE_VALUES[state].classPrefix}-icon`
          )}
        >
          <Icon path={STATE_VALUES[state].icon} aria-hidden="true" />
        </div>
      )}
      {transformedImageSrc.includes("data:image/png;base64") ? (
        <img
          src={transformedImageSrc}
          alt={imageAlt}
          className="image-wide"
          loading="lazy"
        />
      ) : (
        filteredImageData && (
          <GatsbyImage
            image={filteredImageData}
            alt={imageAlt}
            className="image-wide"
          />
        )
      )}
      {caption && <ic-typography variant="label">{caption}</ic-typography>}
    </div>
  );
};

export default DoDontCaution;
