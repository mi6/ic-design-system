import React from "react";

interface SimpleImageProps {
  imageSrc: string;
  imageAlt?: string;
  imageStyle?: React.CSSProperties;
}

const SimpleImage: React.FC<SimpleImageProps> = ({
  imageSrc,
  imageAlt = "",
  imageStyle,
}) => <img src={imageSrc} alt={imageAlt} style={imageStyle} loading="lazy" />;

export default SimpleImage;
