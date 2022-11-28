import React, { useState, useEffect } from "react";
import {
  IcSectionContainer,
  IcTypography,
  IcLink,
  IcButton,
} from "@ukic/react";

import "./cookies.css";
import {
  consentCookieApproved,
  consentCookieActioned,
  isBotOrDoNotTrack,
  setConsent,
} from "./cookies.helper";
import CookieConsentContext from "../../context/CookieConsentContext";

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(!consentCookieActioned());
  const [submitted, setSubmitted] = useState(false);
  const banner: React.RefObject<HTMLDivElement> = React.createRef();
  const { handleCookieConsent } = React.useContext(CookieConsentContext)

  const handleConsent = (consent: boolean) => {
    setConsent(consent);
    setSubmitted(true);
    handleCookieConsent(consent);
  };

  useEffect(() => {
    // set focus to cookies banner when submitted, to focus on message
    if (banner.current) {
      banner.current.focus();
    }
  }, [submitted]);

  if (!visible || isBotOrDoNotTrack()) {
    return null;
  }

  return (
    <div
      className="banner"
      aria-label="cookies banner"
      role="region"
      ref={banner}
    >
      {(submitted && (
        <IcSectionContainer full-height aligned="full-width" tab-index="-1">
          <IcTypography role="alert" variant="body">
            You’ve {consentCookieApproved() ? "accepted" : "rejected"} analytics
            cookies. You can{" "}
            <IcLink href="icds/cookies-policy">
              change your cookie settings
            </IcLink>{" "}
            at any time.
          </IcTypography>
          <div className="buttons">
            <IcButton variant="primary" onClick={() => setVisible(false)}>
              Hide cookie message
            </IcButton>
          </div>
        </IcSectionContainer>
      )) || (
        <IcSectionContainer full-height aligned="full-width">
          <IcTypography variant="h2">Cookies on this site</IcTypography>
          <IcTypography variant="body">
            We’d like to use analytics cookies to understand how you use the
            Design System, so that we can make improvements.
          </IcTypography>
          <div className="buttons">
            <IcButton variant="primary" onClick={() => handleConsent(true)}>
              Accept
            </IcButton>
            <IcButton variant="secondary" onClick={() => handleConsent(false)}>
              Decline
            </IcButton>
            <IcLink href="icds/cookies-policy">Manage cookies</IcLink>
          </div>
        </IcSectionContainer>
      )}
    </div>
  );
};

export default CookieBanner;
