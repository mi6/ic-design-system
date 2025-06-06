/* eslint jsx-a11y/media-has-caption: 0 */
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { passImage } from "../../utils/helpers";

interface ThemedVideoProps {
  width?: string;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  title?: string;
  src: Array<string> | string;
  type?: any;
}

const ThemedVideo: React.FC<ThemedVideoProps> = ({
  width = "100%",
  muted,
  controls,
  loop,
  title = "",
  src = "",
  type = "video/mp4",
}) => {
  const vidSrc = passImage(src, useTheme().theme);

  return (
    <video
      key={vidSrc}
      width={width}
      muted={muted}
      controls={controls}
      loop={loop}
      title={title}
    >
      <source src={vidSrc} type={type} />
    </video>
  );
};

export default ThemedVideo;
