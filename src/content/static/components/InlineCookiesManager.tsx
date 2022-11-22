import React, { useState } from "react";
import { IcSwitch } from "@ukic/react";
import {
  consentCookieApproved,
  setConsent,
} from "../../../components/CookieBanner/cookies.helper";

const InlineCookiesManager: React.FC = () => {
  const [approved, setApproved] = useState(consentCookieApproved());

  const handleChange = () => {
    setApproved(!approved);
    setConsent(!approved);
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
