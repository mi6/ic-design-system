import React, {
  ReactElement,
  cloneElement,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link as GatsbyLink } from "gatsby";

import { Helmet } from "react-helmet";

import { GCHQLogo, MI5Logo, SISLogo } from "../../assets/svg";
import CookieBanner from "../CookieBanner";
import TopNavWrapper from "../TopNavWrapper";
import "./index.css";

import CookieConsentContext from "../../context/CookieConsentContext";
import { ThemeProvider, Theme } from "../../context/ThemeContext";
import { consentCookieApproved } from "../CookieBanner/cookies.helper";

import { Heading, MdxFields, MdxFrontMatter } from "../../sharedTypes";

const {
  STATUS,
  TITLE,
  SHORT_TITLE,
  VERSION,
  FOOTER_PROPS,
  META_DESCRIPTION,
  siteUrl,
} = require("../../config");

interface LayoutProps {
  children: ReactElement;
  imageUrl?: string;
  imageAltText?: string;
  data: {
    mdx: {
      body: string;
      fields: MdxFields;
      frontmatter: MdxFrontMatter;
      headings: Heading[];
    };
  };
  location: {
    pathname: string;
  };
}

interface FooterLinks {
  text: string;
  key: string;
  link: string;
}

const ClientOnly: React.FC<any> = ({ children, ...delegated }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted ? <div {...delegated}>{children}</div> : null;
};

// Destructuring GATSBY_ env variables client side returns an empty value. Full reference required.
// eslint-disable-next-line prefer-destructuring
const GATSBY_MTM_SITE_ID = process.env.GATSBY_MTM_SITE_ID;
// eslint-disable-next-line prefer-destructuring
const GATSBY_MTM_DOMAIN = process.env.GATSBY_MTM_DOMAIN;

const Layout: React.FC<LayoutProps> = ({
  imageUrl = "https://user-images.githubusercontent.com/113986285/206001840-854f0997-ab9d-4c33-a39f-05c2327b02f7.png",
  imageAltText = "Intelligence Community Design System",
  children,
  data,
  location,
}) => {
  let canonicalUrl = "";
  let homepage = false;
  if (typeof window !== "undefined") {
    const { pathname } = window.location;
    canonicalUrl = siteUrl + pathname;
    homepage = pathname === "/";
  }

  let pageTitle = homepage ? "Home" : "";
  let description;
  if (data !== undefined) {
    const { subTitle, title } = data.mdx.frontmatter;
    pageTitle = title;
    description = subTitle;
  }

  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const scrollPosition = window.innerHeight + window.scrollY;
        const threshold = document.body.offsetHeight - 300;
        setIsNearBottom(scrollPosition >= threshold);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // meta info for Open Graph & Twitter
  const metas = [
    {
      property: "og:title",
      content: `${pageTitle || TITLE} - Intelligence Community Design System`,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "description",
      property: "og:description",
      content: `${description || META_DESCRIPTION}`,
    },
    {
      property: "og:url",
      content: `${canonicalUrl}`,
    },
    {
      property: "og:image",
      content: `${imageUrl}`,
    },
    {
      property: "og:image:alt",
      content: `${imageAltText}`,
    },
    {
      property: "og:image:type",
      content: "image/png",
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "630",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:domain",
      content: `${siteUrl}`,
    },
    {
      name: "twitter:url",
      content: `${canonicalUrl}`,
    },
    {
      name: "twitter:title",
      content: `${pageTitle || TITLE} - Intelligence Community Design System`,
    },
    {
      name: "twitter:description",
      content: `${description || META_DESCRIPTION}`,
    },
    {
      name: "twitter:image",
      content: `${imageUrl}`,
    },
    {
      name: "twitter:image:alt",
      content: `${imageAltText}`,
    },
  ];

  // document object is not available during SSR so a check is in place.
  // document.cookie is required for consentCookieApproved method
  const defaultCookieConsentValue =
    typeof document !== "undefined" ? consentCookieApproved() : false;

  const [cookieConsent, setCookieConsent] = useState(defaultCookieConsentValue);
  const [localStorageConsent, setLocalStorageConsent] = useState(() => {
    if (typeof window !== "undefined") {
      const storedConsent = localStorage.getItem("localStorageConsent");
      return storedConsent === "true";
    }
    return false;
  });

  const handleCookieConsent = (consent: boolean) => {
    setCookieConsent(consent);
  };

  const handleLocalStorageConsent = (consent: boolean) => {
    setLocalStorageConsent(consent);
    if (consent) {
      localStorage.setItem("localStorageConsent", "true");
    } else {
      localStorage.removeItem("localStorageConsent");
    }
  };

  const value = useMemo(
    () => ({
      cookieConsent,
      localStorageConsent,
      handleCookieConsent,
      handleLocalStorageConsent,
    }),
    [
      cookieConsent,
      localStorageConsent,
      handleCookieConsent,
      handleLocalStorageConsent,
    ]
  );

  // Only show banner and Matomo if env vars are set
  const matomoEnabled = !!GATSBY_MTM_SITE_ID && !!GATSBY_MTM_DOMAIN;

  function loadMatomoScript() {
    const matomoBaseUrl = "//www.sis.gov.uk/matomo/";
    const matomoScriptUrl = `${matomoBaseUrl}matomo.js`;
    const matomoTrackerUrl = `${matomoBaseUrl}matomo.php`;
    if (typeof window !== "undefined" && !window._paq) {
      window._paq = [];
    }
    window._paq!.push(["setTrackerUrl", matomoTrackerUrl]);
    window._paq!.push(["setSiteId", GATSBY_MTM_SITE_ID]);
    if (!document.querySelector(`script[src='${matomoScriptUrl}']`)) {
      const matomoScriptElement = document.createElement("script");
      matomoScriptElement.async = true;
      matomoScriptElement.src = matomoScriptUrl;
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(
          matomoScriptElement,
          firstScriptTag
        );
      } else {
        document.head.appendChild(matomoScriptElement);
      }
    }
  }
  useEffect(() => {
    if (typeof window !== "undefined" && cookieConsent && matomoEnabled) {
      if (!window._paq) window._paq = [];
      window._paq.push([
        "setDocumentTitle",
        `${document.domain}/${document.title}`,
      ]);
      window._paq.push(["setCookieDomain", `*.${GATSBY_MTM_DOMAIN}`]);
      window._paq.push(["setDomains", [`*.${GATSBY_MTM_DOMAIN}`]]);
      window._paq.push(["setDoNotTrack", true]);
      window._paq.push([
        "setExcludedQueryParams",
        [
          "account",
          "accountnum",
          "address",
          "address1",
          "address2",
          "address3",
          "addressline1",
          "addressline2",
          "adres",
          "adresse",
          "age",
          "alter",
          "auth",
          "authpw",
          "bic",
          "billingaddress",
          "billingaddress1",
          "billingaddress2",
          "calle",
          "cardnumber",
          "cc",
          "ccc",
          "cccsc",
          "cccvc",
          "cccvv",
          "ccexpiry",
          "ccexpmonth",
          "ccexpyear",
          "ccname",
          "ccnumber",
          "cctype",
          "cell",
          "cellphone",
          "city",
          "clientid",
          "clientsecret",
          "company",
          "consumerkey",
          "consumersecret",
          "contrasenya",
          "contrase\u00f1a",
          "creditcard",
          "creditcardnumber",
          "cvc",
          "cvv",
          "dateofbirth",
          "debitcard",
          "direcci\u00f3n",
          "dob",
          "domain",
          "ebost",
          "email",
          "emailaddress",
          "emailadresse",
          "epos",
          "epost",
          "eposta",
          "exp",
          "familyname",
          "firma",
          "firstname",
          "formlogin",
          "fullname",
          "gender",
          "geschlecht",
          "gst",
          "gstnumber",
          "handynummer",
          "has\u0142o",
          "heslo",
          "iban",
          "ibanaccountnum",
          "ibanaccountnumber",
          "id",
          "identifier",
          "indirizzo",
          "kartakredytowa",
          "kennwort",
          "keyconsumerkey",
          "keyconsumersecret",
          "konto",
          "kontonr",
          "kontonummer",
          "kredietkaart",
          "kreditkarte",
          "kreditkort",
          "lastname",
          "login",
          "mail",
          "mobiili",
          "mobile",
          "mobilne",
          "nachname",
          "name",
          "nickname",
          "osoite",
          "parole",
          "pass",
          "passord",
          "password",
          "passwort",
          "pasword",
          "paswort",
          "paword",
          "phone",
          "pin",
          "plz",
          "postalcode",
          "postcode",
          "postleitzahl",
          "privatekey",
          "publickey",
          "pw",
          "pwd",
          "pword",
          "pwrd",
          "rue",
          "secret",
          "secretq",
          "secretquestion",
          "shippingaddress",
          "shippingaddress1",
          "shippingaddress2",
          "socialsec",
          "socialsecuritynumber",
          "socsec",
          "sokak",
          "ssn",
          "steuernummer",
          "strasse",
          "street",
          "surname",
          "swift",
          "tax",
          "taxnumber",
          "tel",
          "telefon",
          "telefonnr",
          "telefonnummer",
          "telefono",
          "telephone",
          "token",
          "token_auth",
          "tokenauth",
          "t\u00e9l\u00e9phone",
          "ulica",
          "user",
          "username",
          "vat",
          "vatnumber",
          "via",
          "vorname",
          "wachtwoord",
          "wagwoord",
          "webhooksecret",
          "website",
          "zip",
          "zipcode",
        ],
      ]);
      window._paq.push(["trackPageView"]);
      window._paq.push(["enableLinkTracking"]);
      loadMatomoScript();
    }
  }, [cookieConsent, matomoEnabled]);

  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      if (isLocalStorageEnabled()) {
        localStorage.setItem("theme", newTheme);
      }
      return newTheme;
    });
  };

  const systemThemeListener = (e: MediaQueryListEvent) => {
    setTheme(e.matches ? "dark" : "light");
  };

  useEffect(() => {
    const systemTheme =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : undefined;
    const systemColorScheme = systemTheme?.matches ? "dark" : "light";

    const storedTheme = isLocalStorageEnabled()
      ? localStorage.getItem("theme")
      : null;
    setTheme(storedTheme ? (storedTheme as Theme) : systemColorScheme);

    systemTheme?.addEventListener("change", systemThemeListener);
    return () =>
      systemTheme?.removeEventListener("change", systemThemeListener);
  }, []);

  const isLocalStorageEnabled = () => localStorageConsent;

  const getBackToTopStyle = () =>
    !homepage && isNearBottom
      ? ({
          "--footer-offset": "6.75rem",
        } as React.CSSProperties)
      : undefined;

  const defaultBackToTop = () => (
    <ic-back-to-top target="main" style={getBackToTopStyle()} />
  );

  const iconBackToTop = () => (
    <ic-back-to-top target="main" variant="icon" style={getBackToTopStyle()} />
  );

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>
          {pageTitle || TITLE} - Intelligence Community Design System
        </title>
        <link rel="canonical" href={`${canonicalUrl}`} />
        {metas.map(({ name, property, content }) => (
          <meta
            key={name || property}
            name={name && name}
            property={property && property}
            content={content}
          />
        ))}
        {cookieConsent && matomoEnabled && (
          <noscript>{`<p><img referrerPolicy="no-referrer-when-downgrade" src="//www.sis.gov.uk/matomo/matomo.php?idsite=${GATSBY_MTM_SITE_ID}&rec=1" style="border:0;" alt="" /></p>`}</noscript>
        )}
        <meta
          name="google-site-verification"
          content={process.env.GATSBY_GOOGLE_SEARCH_TOKEN}
        />
      </Helmet>
      <ThemeProvider theme={theme} toggleTheme={toggleTheme}>
        <ic-theme id="theme-wrapper" theme={theme}>
          {!matomoEnabled && (
            <ic-classification-banner
              id="site-banner"
              classification="official"
            />
          )}
          <CookieConsentContext.Provider value={value}>
            <ClientOnly>
              {pageTitle !== "Cookies and Storage Policy" && matomoEnabled && (
                <CookieBanner />
              )}
            </ClientOnly>
            <div className="main-page-container">
              <ic-skip-link
                label="Skip to main content"
                target="main-content"
              />
              <TopNavWrapper
                appTitle={TITLE}
                status={STATUS}
                version={VERSION}
                shortTitle={SHORT_TITLE}
              />
              <main id="main" className="homepage-wrapper">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a id="main-content" tabIndex={-1}>
                  {" "}
                </a>
                {cloneElement(children, { location: location.pathname })}
                <div className="ic-back-to-top default">
                  {defaultBackToTop()}
                </div>
                <div className="ic-back-to-top icon">{iconBackToTop()}</div>
              </main>
            </div>
            <div className="footer">
              <ic-footer
                description={FOOTER_PROPS.content}
                caption={FOOTER_PROPS.caption}
              >
                {FOOTER_PROPS.footerLinks
                  .filter(
                    (footerLink: FooterLinks) => footerLink.key !== undefined
                  )
                  .map((footerLink: FooterLinks) => (
                    <ic-footer-link slot="link" key={footerLink.key}>
                      <GatsbyLink
                        to={footerLink.link}
                        style={{ color: "white" }}
                      >
                        {footerLink.text}
                      </GatsbyLink>
                    </ic-footer-link>
                  ))}
                <div slot="logo" className="logo-wrapper" role="list">
                  <ic-footer-link href="https://sis.gov.uk">
                    <SISLogo aria-hidden="true" />
                    <span className="link-text">Go to S.I.S. website</span>
                  </ic-footer-link>
                  <ic-footer-link href="https://www.mi5.gov.uk">
                    <MI5Logo aria-hidden="true" />
                    <span className="link-text">Go to MI5 website</span>
                  </ic-footer-link>
                  <ic-footer-link href="https://gchq.gov.uk">
                    <GCHQLogo aria-hidden="true" />
                    <span className="link-text">Go to GCHQ website</span>
                  </ic-footer-link>
                </div>
              </ic-footer>
            </div>
          </CookieConsentContext.Provider>
        </ic-theme>
      </ThemeProvider>
      <div
        className="route-announcer"
        role="status"
        aria-live="assertive"
        aria-atomic="true"
      >{`Navigated to ${pageTitle || ""} - ${TITLE}`}</div>
    </>
  );
};

export default Layout;
