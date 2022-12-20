import React, { useState } from "react";
import {
  consentCookieApproved,
  setConsent,
} from "../../../components/CookieBanner/cookies.helper";
import CookieConsentContext from "../../../context/CookieConsentContext";

const InlineCookiesManager: React.FC = () => {
  const [approved, setApproved] = useState(consentCookieApproved());
  const { handleCookieConsent } = React.useContext(CookieConsentContext);

  const handleChange = () => {
    setApproved(!approved);
    setConsent(!approved);
    handleCookieConsent(!approved);
  };

  return (
    <ic-switch
      checked={approved}
      label="Optional analytics cookies"
      onIcChange={() => handleChange()}
      show-state
      disabled={!process.env.GATSBY_GA_TRACKING_ID}
    />
  );
};

export default InlineCookiesManager;
