import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { IcCardHorizontal } from "@ukic/canary-react";
import { passImage, useViewportWidth } from "../../utils/helpers";
import { useTheme } from "../../context/ThemeContext";

interface GetStartedHorizontalCardProps {
  heading: string;
  message: string;
  imageSrc: string | string[];
  href: string;
  imageAlt: string;
}
const GetStartedHorizontalCard: React.FC<GetStartedHorizontalCardProps> = ({
  heading,
  message,
  imageSrc,
  href,
  imageAlt,
}) => {
  const { theme } = useTheme();
  const viewportWidth = useViewportWidth();
  const isSmallViewport = viewportWidth < 577;

  return (
    <GatsbyLink to={href}>
      <IcCardHorizontal
        heading={heading}
        message={message}
        clickable
        size="large"
        style={{ "--card-horizontal-width": "100%" }}
      >
        {!isSmallViewport && (
          <img
            src={passImage(imageSrc, theme)}
            alt={imageAlt}
            slot="image"
            loading="lazy"
          />
        )}
      </IcCardHorizontal>
    </GatsbyLink>
  );
};

export default GetStartedHorizontalCard;
