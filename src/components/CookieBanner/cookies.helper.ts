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

const deleteDomainCookies = () => {
  if (typeof window !== "undefined") {
    const cookies = document.cookie.split("; ");
    cookies.forEach((cookie) => {
      const d = window.location.hostname.split(".");
      while (d.length > 0) {
        const cookieBase = `${encodeURIComponent(
          cookie.split(";")[0].split("=")[0]
        )}=;expires=${new Date(0).toUTCString()};domain=${d.join(".")};path=`;
        document.cookie = `${cookieBase}/`;

        const p = window.location.pathname.split("/");
        while (p.length > 0) {
          document.cookie = `${cookieBase}${p.join("/")}`;
          p.pop();
        }

        d.shift();
      }
    });
  }
};

export const setConsent = (consent: boolean) => {
  // treat no consent as 'revoked' and delete existing cookies
  if (!consent) {
    deleteDomainCookies();
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
