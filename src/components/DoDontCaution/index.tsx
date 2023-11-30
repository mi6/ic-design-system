import React from "react";
import clsx from "clsx";

import "./index.css";

import Icon from "@mdi/react";
import { mdiCheck, mdiClose, mdiAlert } from "@mdi/js";

interface DoDontCautionProps {
  imageSrc?: string;
  imageAlt: string;
  state?: "good" | "bad" | "none" | "caution";
  caption?: string;
  videoSrc?: string;
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
}) => (
  <div
    className={clsx(state === "none" ? state : STATE_VALUES[state].classPrefix)}
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
    {imageSrc && (
      <img
        src={imageSrc}
        alt={imageAlt}
        className="image-wide"
        loading="lazy"
      />
    )}
    {videoSrc && (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <video controls loop className="image-wide">
        <source src={videoSrc} type="video/mp4" />
      </video>
    )}
    {caption && <ic-typography variant="label">{caption}</ic-typography>}
  </div>
);

export default DoDontCaution;
