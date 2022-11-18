import React from "react";
import { IcTypography, IcButton, IcLink } from "@ukic/react";

import "./index.css";

interface TypographicScaleProps {
  variants: string;
}

const TypographicScale: React.FC<TypographicScaleProps> = ({ variants }) => (
  <div className="typography-container">
    {variants.indexOf("h1") >= 0 && (
      <>
        <IcTypography variant="h1">Heading extra large</IcTypography>
        <IcTypography variant="caption" className="internal-caption">
          Nunito Sans • ExtraBold • 42pt • Line-height: 56pt • Letter-spacing:
          normal
        </IcTypography>
      </>
    )}
    {variants.indexOf("h2") >= 0 && (
      <>
        <IcTypography variant="h2">Heading large</IcTypography>
        <IcTypography variant="caption" className="internal-caption">
          Nunito Sans • Bold • 34pt • Line-height: 45pt • Letter-spacing:
          0.0025rem
        </IcTypography>
      </>
    )}
    {variants.indexOf("h3") >= 0 && (
      <>
        <IcTypography variant="h3">Heading medium</IcTypography>
        <IcTypography variant="caption" className="internal-caption">
          Open Sans • Regular • 24pt • Line-height: 32pt • Letter-spacing:
          normal
        </IcTypography>
      </>
    )}
    {variants.indexOf("h4") >= 0 && (
      <>
        <IcTypography variant="h4">Heading small</IcTypography>
        <IcTypography variant="caption" className="internal-caption">
          Open Sans • SemiBold • 20pt • Line-height: 24pt • Letter-spacing:
          0.0015rem
        </IcTypography>
      </>
    )}
    {variants.indexOf("subtitle-large") >= 0 && (
      <>
        <IcTypography variant="subtitle-large">Subtitle large</IcTypography>
        <IcTypography variant="caption" className="internal-caption">
          Open Sans • Bold • 16pt • Line-height: 24pt • Letter-spacing:
          0.0015rem
        </IcTypography>
      </>
    )}
    {variants.indexOf("subtitle-small") >= 0 && (
      <>
        <IcTypography variant="subtitle-small">
          Subtitle small and table headings
        </IcTypography>
        <IcTypography variant="caption" className="internal-caption">
          Open Sans • SemiBold • 14pt • Line-height: 16pt • Letter-spacing:
          0.0015rem
        </IcTypography>
      </>
    )}
    {variants.indexOf("body") >= 0 && (
      <>
        <IcTypography variant="body">Body</IcTypography>
        <IcTypography variant="caption" className="internal-caption">
          Open Sans • Regular • 16pt • Line-height: 24pt • Letter-spacing:
          0.005rem
        </IcTypography>
      </>
    )}
    {variants.indexOf("caption") >= 0 && (
      <>
        <IcTypography variant="caption">
          Helper text on input fields and other captions
        </IcTypography>
        <IcTypography variant="caption" className="internal-caption">
          Open Sans • SemiBold • 12pt • Line-height: 20pt • Letter-spacing:
          0.0025rem
        </IcTypography>
      </>
    )}
    {variants.indexOf("caption-uppercase") >= 0 && (
      <>
        <IcTypography variant="caption-uppercase">
          Helper text on input fields and other captions
        </IcTypography>
        <IcTypography variant="caption" className="internal-caption">
          Open Sans • SemiBold • 12pt • Line-height: 20pt • Letter-spacing:
          0.0025rem
        </IcTypography>
      </>
    )}
    {variants.indexOf("label") >= 0 && (
      <>
        <IcButton variant="secondary" className="additional-padding">
          Secondary button
        </IcButton>
        <IcTypography variant="caption" className="internal-caption">
          Open Sans • SemiBold • 14pt • Line-height: 24pt • Letter-spacing:
          0.0025rem
        </IcTypography>
      </>
    )}
    {variants.indexOf("label-uppercase") >= 0 && (
      <>
        <IcButton variant="destructive" className="additional-padding">
          DESTRUCTIVE BUTTON
        </IcButton>
        <IcTypography variant="caption" className="internal-caption">
          Open Sans • SemiBold • 14pt • Line-height: 24pt • Letter-spacing:
          0.0025rem
        </IcTypography>
      </>
    )}
    {variants.indexOf("link") >= 0 && (
      <>
        <IcTypography variant="body" className="additional-padding">
          <IcLink href="/styles/typography">Link style</IcLink>
        </IcTypography>
        <IcTypography variant="caption" className="internal-caption">
          Open Sans • Bold underline • 16pt • Line-height: 24pt •
          Letter-spacing: 0.0025rem
        </IcTypography>
      </>
    )}
  </div>
);

export default TypographicScale;
