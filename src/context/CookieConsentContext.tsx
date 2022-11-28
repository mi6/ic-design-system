import React from 'react';

interface IContext {
    cookieConsent: boolean,
    // eslint-disable-next-line no-unused-vars
    handleCookieConsent: (consent: boolean) => void
}
const CookieConsentContext = React.createContext<IContext>({
    cookieConsent: false,
    handleCookieConsent: (consent) => consent
});

export default CookieConsentContext;