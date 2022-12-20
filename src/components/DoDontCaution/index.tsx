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

const DoDontCaution: React.FC<DoDontCautionProps> = ({
  imageSrc = "",
  videoSrc = "",
  imageAlt,
  state = "none",
  caption = "",
}) => (
  <div
    className={clsx(
      state === "bad" && "dont",
      state === "good" && "do",
      state === "caution" && "caution",
      state === "none" && "none"
    )}
  >
    {state === "bad" && (
      <div
        slot="icon"
        className={clsx("do-dont-caution-containers", "dont-icon")}
      >
        <Icon path={mdiClose} aria-hidden="true" />
      </div>
    )}
    {state === "good" && (
      <div
        slot="icon"
        className={clsx("do-dont-caution-containers", "do-icon")}
      >
        <Icon path={mdiCheck} aria-hidden="true" />
      </div>
    )}
    {state === "caution" && (
      <div
        slot="icon"
        className={clsx("do-dont-caution-containers", "caution-icon")}
      >
        <Icon path={mdiAlert} aria-hidden="true" />
      </div>
    )}
    {imageSrc && <img src={imageSrc} alt={imageAlt} className="image-wide" />}
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
