import React, { useState } from "react";
import { IcSwitch } from "@ukic/react";
import {
  consentCookieApproved,
  deleteCookie,
  setConsent,
} from "../../../components/CookieBanner/cookies.helper";

const InlineCookiesManager: React.FC = () => {
  const [approved, setApproved] = useState(consentCookieApproved());

  const handleChange = () => {
    setApproved(!approved);
    setConsent(!approved);
  };

  if (!approved) {
    deleteCookie("_ga_L8G7D6EHQB");
  }

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
