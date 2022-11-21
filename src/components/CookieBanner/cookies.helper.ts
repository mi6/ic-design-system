// One year
const EXPIRY_IN_SECONDS = 31104000000;

export const setCookie = (value: string) => {
  const date = new Date();

  date.setTime(date.getTime() + EXPIRY_IN_SECONDS);
  document.cookie = `${value}; expires=${date.toUTCString()}; path=/;`;
};

export const consentCookieActioned = () =>
  document.cookie.indexOf("ICDSPREF") !== -1;

export const consentCookieApproved = () =>
  consentCookieActioned() && document.cookie.indexOf("ICDSPREF=true") !== -1;

export const setConsent = (consent: boolean) => {
  // treat no consent as 'revoked' and delete existing cookies
  if (!consent) {
    /* eslint-disable */
    document.cookie.replace(/(?<=^|;).+?(?=\=|;|$)/g, (name) =>
      location.hostname
        .split(".")
        .reverse()
        .reduce(
          (domain) => (
            (domain = domain.replace(/^\.?[^.]+/, "")),
            (document.cookie = `${name}=;max-age=0;path=/;domain=${domain}`),
            domain
          ),
          location.hostname
        )
    );
    /* eslint-enable */
  } else if (consent) {
    setCookie(`gatsby_ga-gdpr=${consent}`);
  }
  setCookie(`ICDSPREF=${consent}`);
};

export const isBotOrDoNotTrack = () => {
  const isBot = /bot|crawler|spider|crawling/i.test(navigator.userAgent);

  // Check if DoNotTrack is activated
  const dnt = navigator.doNotTrack; // || window.doNotTrack;
  const isToTrack =
    dnt !== null && dnt !== undefined
      ? dnt && dnt !== "yes" && dnt !== "1"
      : true;

  return isBot || !isToTrack;
};
