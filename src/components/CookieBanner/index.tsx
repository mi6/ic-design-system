import React, { createRef, useState, useEffect, useContext } from "react";
import { Link as GatsbyLink } from "gatsby";

import "./cookies.css";
import {
  consentCookieApproved,
  consentCookieActioned,
  isBotOrDoNotTrack,
  setCookieConsent,
  setLocalStorageConsent,
  deleteLocalStorage,
  deleteDomainCookies,
} from "./cookies.helper";
import CookieConsentContext from "../../context/CookieConsentContext";

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(!consentCookieActioned());
  const [submitted, setSubmitted] = useState(false);
  const banner: React.RefObject<HTMLDivElement> = createRef();
  const { handleCookieConsent, handleLocalStorageConsent } =
    useContext(CookieConsentContext);

  const handleConsent = (consent: boolean) => {
    setCookieConsent(consent);
    setLocalStorageConsent(consent);
    setSubmitted(true);
    handleCookieConsent(consent);
    handleLocalStorageConsent(consent);
  };

  useEffect(() => {
    banner.current?.focus(); // set focus to cookies banner when submitted, to focus on message
  }, [submitted]);

  useEffect(() => {
    if (submitted || !visible) {
      window.dispatchEvent(new Event("resize"));
    }
  }, [visible, submitted]);

  useEffect(() => {
    // Deletes cookies and local storage if banner is re-triggered, after previously accepting, to assume non-consent
    if (visible) {
      deleteLocalStorage();
      deleteDomainCookies();
    }
  }, [visible]);

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
            cookies and local storage. You can{" "}
            <ic-link>
              <GatsbyLink
                slot="router-item"
                to="/icds/cookies-and-storage-policy"
              >
                change your preferences
              </GatsbyLink>
            </ic-link>{" "}
            at any time.
          </ic-typography>
          <div className="buttons">
            <ic-button variant="primary" onClick={() => setVisible(false)}>
              Hide message
            </ic-button>
          </div>
        </ic-section-container>
      ) : (
        <ic-section-container full-height aligned="full-width">
          <ic-typography variant="h2">
            Cookies and Storage on this site
          </ic-typography>
          <ic-typography variant="body">
            We’d like to use analytics cookies to understand how you use the
            Design System, so that we can make improvements. Additionally, we
            use local storage to improve your experience by remembering your
            preferences.
          </ic-typography>
          <div className="buttons">
            <ic-button variant="primary" onClick={() => handleConsent(true)}>
              Accept
            </ic-button>
            <ic-button variant="secondary" onClick={() => handleConsent(false)}>
              Decline
            </ic-button>
            <ic-link>
              <GatsbyLink
                slot="router-item"
                to="/icds/cookies-and-storage-policy"
              >
                Manage preferences
              </GatsbyLink>
            </ic-link>
          </div>
        </ic-section-container>
      )}
    </div>
  );
};

export default CookieBanner;
