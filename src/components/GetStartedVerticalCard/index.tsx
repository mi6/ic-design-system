import { IcCardVertical } from "@ukic/react";
import { Link as GatsbyLink } from "gatsby";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { passImage } from "../../utils/helpers";

interface GetStartedVerticalCardProps {
  heading: string;
  message: string;
  imageSrc: string | string[];
  href: string;
  imageAlt: string;
}
const GetStartedVerticalCard: React.FC<GetStartedVerticalCardProps> = ({
  heading,
  message,
  href,
  imageSrc,
  imageAlt,
}) => {
  const { theme } = useTheme();
  return (
    <GatsbyLink to={href}>
      <IcCardVertical heading={heading} message={message} clickable>
        <img
          src={passImage(imageSrc, theme)}
          alt={imageAlt}
          slot="image-top"
          loading="lazy"
        />
      </IcCardVertical>
    </GatsbyLink>
  );
};

export default GetStartedVerticalCard;
