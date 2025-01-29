import { createContext } from "react";

interface IContext {
  cookieConsent: boolean;
  localStorageConsent: boolean;
  // eslint-disable-next-line no-unused-vars
  handleCookieConsent: (consent: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  handleLocalStorageConsent: (consent: boolean) => void;
}

const CookieConsentContext = createContext<IContext>({
  cookieConsent: false,
  localStorageConsent: false,
  handleCookieConsent: (consent) => consent,
  handleLocalStorageConsent: (consent) => consent,
});

export default CookieConsentContext;
