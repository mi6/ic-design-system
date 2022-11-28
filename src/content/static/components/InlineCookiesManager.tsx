import React, { useState } from "react";
import { IcSwitch } from "@ukic/react";
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
    <IcSwitch
      checked={approved}
      label="Optional analytics cookies"
      onIcChange={() => handleChange()}
      showState
    />
  );
};

export default InlineCookiesManager;
