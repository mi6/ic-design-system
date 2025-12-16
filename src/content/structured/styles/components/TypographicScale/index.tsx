import React from "react";

import "./index.css";
import { TypographyConfig, TypographyVariant } from "./typography.config";

const ExampleElement: React.FC<{
  variant: TypographyVariant;
  title: string;
  textDecoration?: string;
}> = ({ variant, title, textDecoration }) => {
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

  switch (textDecoration) {
    case "underline":
      return (
        <ic-typography variant={variant} underline>
          {title}
        </ic-typography>
      );
    case "strikethrough":
      return (
        <ic-typography variant={variant} strikethrough>
          {title}
        </ic-typography>
      );
    case "bold":
      return (
        <ic-typography variant={variant} bold>
          {title}
        </ic-typography>
      );
    case "italic":
      return (
        <ic-typography variant={variant} italic>
          {title}
        </ic-typography>
      );
    default:
      return <ic-typography variant={variant}>{title}</ic-typography>;
  }
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
        textDecoration,
      }) => (
        <>
          <ExampleElement
            variant={variant}
            title={title}
            textDecoration={textDecoration}
          />
          <ic-typography variant="caption" data-class="internal-caption">
            {`${fontFamily} • ${fontWeight} • ${fontSize}rem • Line-height: ${lineHeight}rem • Letter-spacing: ${letterSpacing}`}
          </ic-typography>
        </>
      )
    )}
  </div>
);

export default TypographicScale;
