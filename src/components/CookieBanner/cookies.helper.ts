// One year
const EXPIRY_IN_SECONDS = 31104000000;
// policyDate should mirror the date the policy was last updated, which triggers a new cookie, to force users to re-accept the updated policy
const policyDate = "2025-04-22";

export const setCookie = (value: string) => {
  if (typeof document !== "undefined") {
    const date = new Date();

    date.setTime(date.getTime() + EXPIRY_IN_SECONDS);
    document.cookie = `${value}; expires=${date.toUTCString()}; path=/;`;
  }
};

export const consentCookieActioned = () =>
  typeof document !== "undefined"
    ? document.cookie.indexOf(`ICDSPREF_${policyDate}`) !== -1
    : false;

export const consentCookieApproved = () =>
  consentCookieActioned() &&
  document.cookie.indexOf(`ICDSPREF_${policyDate}=true`) !== -1;

export const deleteDomainCookies = () => {
  if (typeof window !== "undefined") {
    document.cookie.split("; ").forEach((cookie) => {
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

export const deleteLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};

export const setLocalStorageConsent = (consent: boolean) => {
  if (!consent) {
    deleteLocalStorage();
  }
};

export const setCookieConsent = (consent: boolean) => {
  if (!consent) {
    deleteDomainCookies();
  }
  setCookie(`ICDSPREF_${policyDate}=${consent}`);
};

export const isBotOrDoNotTrack = () => {
  const isBot = /bot|crawler|spider|crawling/i.test(navigator.userAgent);

  // Check if DoNotTrack is activated
  const dnt = navigator.doNotTrack; // || window.doNotTrack;
  const isToTrack = dnt ? dnt !== "yes" && dnt !== "1" : true;

  return isBot || !isToTrack;
};
