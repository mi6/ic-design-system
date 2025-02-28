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
  imageSrc?: Array<string> | string;
  imageAlt: string;
  state?: "good" | "bad" | "none" | "caution";
  caption?: string;
  videoSrc?: string;
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
  imageSrc = "",
  videoSrc = "",
  imageAlt,
  state = "none",
  caption = "",
}) => {
  const { theme } = useTheme();
  const transformedImageSrc = passImage(imageSrc, theme);

  const imageData = useStaticQuery(graphql`
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
  `);
  const isBase64: boolean = transformedImageSrc.includes(
    "data:image/png;base64"
  );
  const imageObject: ImageFile[] = imageData.allFile.edges;

  const filterImageData: any = (imagePath: string) => {
    if (imagePath !== "" && imageObject !== undefined) {
      const croppedImagePath = imagePath.substring(
        imagePath.lastIndexOf("/"),
        imagePath.lastIndexOf("-")
      );

      const gatsbyFileObjMatches = imageObject.filter((image: ImageFile) =>
        image.node.relativePath.includes(croppedImagePath)
      );

      let gatsbyFileObj;

      if (gatsbyFileObjMatches) {
        if (gatsbyFileObjMatches.length > 1) {
          gatsbyFileObj = gatsbyFileObjMatches.find(
            (image) => !image.node.relativePath.includes("dark")
          );
        } else {
          [gatsbyFileObj] = gatsbyFileObjMatches;
        }
      }

      if (gatsbyFileObj !== undefined) {
        return gatsbyFileObj.node.childImageSharp.gatsbyImageData;
      }

      // eslint-disable-next-line no-console
      console.warn(
        "Image file could not be found by gatsby-source-filesystem."
      );
      return undefined;
    }

    if (imageObject === undefined) {
      // eslint-disable-next-line no-console
      console.warn("No images found by gatsby-source-filesystem.");
    }
    if (imagePath === "") {
      // eslint-disable-next-line no-console
      console.warn("No image path given to DoDontCaution");
    }
    return undefined;
  };

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
      {transformedImageSrc &&
        (isBase64 ? (
          <img
            src={transformedImageSrc}
            alt={imageAlt}
            className="image-wide"
            loading="lazy"
          />
        ) : (
          <GatsbyImage
            image={filterImageData(transformedImageSrc)}
            alt={imageAlt}
            className="image-wide"
          />
        ))}
      {videoSrc && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video controls loop className="image-wide">
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      {caption && <ic-typography variant="label">{caption}</ic-typography>}
    </div>
  );
};

export default DoDontCaution;
