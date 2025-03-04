import { withPrefix } from "gatsby";
import React, {
  ReactElement,
  cloneElement,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Helmet } from "react-helmet";

import { GCHQLogo, MI5Logo, SISLogo } from "../../assets/svg";
import CookieBanner from "../CookieBanner";
import TopNavWrapper from "../TopNavWrapper";
import "./index.css";

import CookieConsentContext from "../../context/CookieConsentContext";
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
  target?: string;
}

const ClientOnly: React.FC<any> = ({ children, ...delegated }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted ? <div {...delegated}>{children}</div> : null;
};

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

  // Destructing GATSBY_ env variables client side returns an empty value. Full reference required.
  // eslint-disable-next-line prefer-destructuring
  const GATSBY_GA_TRACKING_ID = process.env.GATSBY_GA_TRACKING_ID;

  // document object is not available during SSR so a check is in place.
  // document.cookie is required for consentCookieApproved method
  const defaultCookieConsentValue =
    typeof document !== "undefined" ? consentCookieApproved() : false;

  const [cookieConsent, setCookieConsent] = useState(defaultCookieConsentValue);
  const defaultConsent = cookieConsent ? "granted" : "denied";

  const handleCookieConsent = (consent: boolean) => {
    setCookieConsent(true);
    updateConsent(consent);
  };

  const value = useMemo(
    () => ({
      cookieConsent,
      handleCookieConsent,
    }),
    [cookieConsent, handleCookieConsent]
  );

  const updateConsent = (consentGranted: boolean) => {
    const consent = consentGranted ? "granted" : "denied";
    if (typeof window !== "undefined") {
      window.gtag("consent", "update", {
        ad_storage: consent,
        analytics_storage: consent,
      });
    }
  };

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
        <script
          async
          src={
            GATSBY_GA_TRACKING_ID
              ? `https://www.googletagmanager.com/gtag/js?id=${GATSBY_GA_TRACKING_ID}`
              : undefined
          }
        />
        <script>
          {GATSBY_GA_TRACKING_ID &&
            `
            window.dataLayer = window.dataLayer || [  ];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': '${defaultConsent}',
              'analytics_storage': '${defaultConsent}',
            });
            gtag('js', new Date());
            gtag('config', '${GATSBY_GA_TRACKING_ID}');
          `}
        </script>
        <meta
          name="google-site-verification"
          content={process.env.GATSBY_GOOGLE_SEARCH_TOKEN}
        />
      </Helmet>
      {!GATSBY_GA_TRACKING_ID && (
        <ic-classification-banner id="site-banner" classification="official" />
      )}
      <CookieConsentContext.Provider value={value}>
        <ClientOnly>
          {pageTitle !== "Cookies Policy" && GATSBY_GA_TRACKING_ID && (
            <CookieBanner />
          )}
        </ClientOnly>
        <div className="main-page-container">
          <ic-link href="#main-content" id="skip-main-content-link">
            Skip to main content
          </ic-link>
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
            <ic-back-to-top target="main" />
          </main>
        </div>
        <div className="footer">
          <ic-footer
            description={FOOTER_PROPS.content}
            caption={FOOTER_PROPS.caption}
          >
            {FOOTER_PROPS.footerLinks
              .filter((footerLink: FooterLinks) => footerLink.key !== undefined)
              .map((footerLink: FooterLinks) => (
                <ic-footer-link
                  slot="link"
                  href={withPrefix(footerLink.link)}
                  key={footerLink.key}
                  target={footerLink.target}
                >
                  {footerLink.text}
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
