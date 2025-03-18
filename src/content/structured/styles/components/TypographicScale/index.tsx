import React from "react";

import "./index.css";
import { TypographyConfig, TypographyVariant } from "./typography.config";

const ExampleElement: React.FC<{
  variant: TypographyVariant;
  title: string;
}> = ({ variant, title }) => {
  if (variant === "link")
    return (
      <ic-typography variant="body" data-class="additional-padding">
        <ic-link href="/styles/typography">{title}</ic-link>
      </ic-typography>
    );
  if (variant.includes("label"))
    return (
      <ic-button
        variant={variant === "label-uppercase" ? "destructive" : "secondary"}
        data-class="additional-padding"
      >
        {title}
      </ic-button>
    );
  return <ic-typography variant={variant}>{title}</ic-typography>;
};

const TypographicScale: React.FC<{
  config: TypographyConfig[];
}> = ({ config }) => (
  <div className="typography-container">
    {config.map(
      ({
        variant,
        title,
        fontFamily,
        fontSize,
        fontWeight,
        letterSpacing,
        lineHeight,
      }) => (
        <>
          <ExampleElement variant={variant} title={title} />
          <ic-typography variant="caption" data-class="internal-caption">
            {`${fontFamily} • ${fontWeight} • ${fontSize}rem • Line-height: ${lineHeight}rem • Letter-spacing: ${letterSpacing}`}
          </ic-typography>
        </>
      )
    )}
  </div>
);

export default TypographicScale;
