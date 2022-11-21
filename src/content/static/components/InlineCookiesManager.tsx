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

  document.addEventListener("icChange", handleChange);

  return (
    <IcSwitch checked={approved} label="Optional analytics cookies" showState />
  );
};

export default InlineCookiesManager;
