import React from "react";

import "./index.css";

interface TypographicScaleProps {
  variants: string;
}

const TypographicScale: React.FC<TypographicScaleProps> = ({ variants }) => (
  <div className="typography-container">
    {variants.indexOf("h1") >= 0 && (
      <>
        <ic-typography variant="h1">Heading extra large</ic-typography>
        <ic-typography variant="caption" data-class="internal-caption">
          Nunito Sans • ExtraBold • 42pt • Line-height: 56pt • Letter-spacing:
          normal
        </ic-typography>
      </>
    )}
    {variants.indexOf("h2") >= 0 && (
      <>
        <ic-typography variant="h2">Heading large</ic-typography>
        <ic-typography variant="caption" data-class="internal-caption">
          Nunito Sans • Bold • 34pt • Line-height: 45pt • Letter-spacing:
          0.0025rem
        </ic-typography>
      </>
    )}
    {variants.indexOf("h3") >= 0 && (
      <>
        <ic-typography variant="h3">Heading medium</ic-typography>
        <ic-typography variant="caption" data-class="internal-caption">
          Open Sans • Regular • 24pt • Line-height: 32pt • Letter-spacing:
          normal
        </ic-typography>
      </>
    )}
    {variants.indexOf("h4") >= 0 && (
      <>
        <ic-typography variant="h4">Heading small</ic-typography>
        <ic-typography variant="caption" data-class="internal-caption">
          Open Sans • SemiBold • 20pt • Line-height: 24pt • Letter-spacing:
          0.0015rem
        </ic-typography>
      </>
    )}
    {variants.indexOf("subtitle-large") >= 0 && (
      <>
        <ic-typography variant="subtitle-large">Subtitle large</ic-typography>
        <ic-typography variant="caption" data-class="internal-caption">
          Open Sans • Bold • 16pt • Line-height: 24pt • Letter-spacing:
          0.0015rem
        </ic-typography>
      </>
    )}
    {variants.indexOf("subtitle-small") >= 0 && (
      <>
        <ic-typography variant="subtitle-small">
          Subtitle small and table headings
        </ic-typography>
        <ic-typography variant="caption" data-class="internal-caption">
          Open Sans • SemiBold • 14pt • Line-height: 16pt • Letter-spacing:
          0.0015rem
        </ic-typography>
      </>
    )}
    {variants.indexOf("body") >= 0 && (
      <>
        <ic-typography variant="body">Body</ic-typography>
        <ic-typography variant="caption" data-class="internal-caption">
          Open Sans • Regular • 16pt • Line-height: 24pt • Letter-spacing:
          0.005rem
        </ic-typography>
      </>
    )}
    {variants.indexOf("caption") >= 0 && (
      <>
        <ic-typography variant="caption">
          Helper text on input fields and other captions
        </ic-typography>
        <ic-typography variant="caption" data-class="internal-caption">
          Open Sans • SemiBold • 12pt • Line-height: 20pt • Letter-spacing:
          0.0025rem
        </ic-typography>
      </>
    )}
    {variants.indexOf("caption-uppercase") >= 0 && (
      <>
        <ic-typography variant="caption-uppercase">
          Helper text on input fields and other captions
        </ic-typography>
        <ic-typography variant="caption" data-class="internal-caption">
          Open Sans • SemiBold • 12pt • Line-height: 20pt • Letter-spacing:
          0.0025rem
        </ic-typography>
      </>
    )}
    {variants.indexOf("label") >= 0 && (
      <>
        <ic-button variant="secondary" data-class="additional-padding">
          Secondary button
        </ic-button>
        <ic-typography variant="caption" data-class="internal-caption">
          Open Sans • SemiBold • 14pt • Line-height: 24pt • Letter-spacing:
          0.0025rem
        </ic-typography>
      </>
    )}
    {variants.indexOf("label-uppercase") >= 0 && (
      <>
        <ic-button variant="destructive" data-class="additional-padding">
          DESTRUCTIVE BUTTON
        </ic-button>
        <ic-typography variant="caption" data-class="internal-caption">
          Open Sans • SemiBold • 14pt • Line-height: 24pt • Letter-spacing:
          0.0025rem
        </ic-typography>
      </>
    )}
    {variants.indexOf("link") >= 0 && (
      <>
        <ic-typography variant="body" data-class="additional-padding">
          <ic-link href="/styles/typography">Link style</ic-link>
        </ic-typography>
        <ic-typography variant="caption" data-class="internal-caption">
          Open Sans • Bold underline • 16pt • Line-height: 24pt •
          Letter-spacing: 0.0025rem
        </ic-typography>
      </>
    )}
  </div>
);

export default TypographicScale;
