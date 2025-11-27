/* eslint jsx-a11y/media-has-caption: 0 */
import React from "react";
import clsx from "clsx";
import { IcTypography } from "@ukic/react";
import Icon from "@mdi/react";
import { mdiCheck, mdiClose, mdiAlert } from "@mdi/js";
import { useTheme } from "../../context/ThemeContext";
import { passImage } from "../../utils/helpers";
import "./index.css";

interface ThemedVideoProps {
  width?: string;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  title?: string;
  src: Array<string> | string;
  type?: any;
  caption?: string;
  state?: "good" | "bad" | "none" | "caution";
}

const STATE_VALUES = {
  good: { icon: mdiCheck, classPrefix: "do" },
  bad: { icon: mdiClose, classPrefix: "dont" },
  caution: { icon: mdiAlert, classPrefix: "caution" },
};

const ThemedVideo: React.FC<ThemedVideoProps> = ({
  width = "100%",
  muted,
  controls,
  loop,
  title = "",
  src = "",
  type = "video/mp4",
  caption = "",
  state = "none",
}) => {
  const vidSrc = passImage(src, useTheme().theme);

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
      {caption !== "" && (
        <IcTypography
          variant="label"
          style={{ marginTop: "-1rem", marginBottom: "1.5rem" }}
        >
          {caption}
        </IcTypography>
      )}
    </div>
  );
};

export default ThemedVideo;
