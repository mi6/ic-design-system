import React, { createRef, useState, useEffect, useContext } from "react";

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
  const banner: React.RefObject<HTMLDivElement> = createRef();
  const { handleCookieConsent } = useContext(CookieConsentContext);

  const handleConsent = (consent: boolean) => {
    setConsent(consent);
    setSubmitted(true);
    handleCookieConsent(consent);
  };

  useEffect(() => {
    banner.current?.focus(); // set focus to cookies banner when submitted, to focus on message
  }, [submitted]);

  useEffect(() => {
    if (submitted || !visible) {
      window.dispatchEvent(new Event("resize"));
    }
  }, [visible, submitted]);

  if (!visible || isBotOrDoNotTrack()) {
    return null;
  }

  return (
    <div
      id="cookie-banner"
      aria-label="cookies banner"
      role="region"
      ref={banner}
    >
      {submitted ? (
        <ic-section-container full-height aligned="full-width" tab-index="-1">
          <ic-typography role="alert" variant="body">
            You’ve {consentCookieApproved() ? "accepted" : "rejected"} analytics
            cookies. You can{" "}
            <ic-link href="/icds/cookies-policy">
              change your cookie settings
            </ic-link>{" "}
            at any time.
          </ic-typography>
          <div className="buttons">
            <ic-button variant="primary" onClick={() => setVisible(false)}>
              Hide cookie message
            </ic-button>
          </div>
        </ic-section-container>
      ) : (
        <ic-section-container full-height aligned="full-width">
          <ic-typography variant="h2">Cookies on this site</ic-typography>
          <ic-typography variant="body">
            We’d like to use analytics cookies to understand how you use the
            Design System, so that we can make improvements.
          </ic-typography>
          <div className="buttons">
            <ic-button variant="primary" onClick={() => handleConsent(true)}>
              Accept
            </ic-button>
            <ic-button variant="secondary" onClick={() => handleConsent(false)}>
              Decline
            </ic-button>
            <ic-link href="/icds/cookies-policy">Manage cookies</ic-link>
          </div>
        </ic-section-container>
      )}
    </div>
  );
};

export default CookieBanner;
