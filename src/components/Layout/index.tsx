import React, { ReactNode, useState } from "react";
import { withPrefix } from "gatsby";

import { Helmet } from "react-helmet";

import "./index.css";
import TopNavWrapper from "../TopNavWrapper";
import { GCHQLogo, MI5Logo, SISLogo } from "../../assets/svg";
import CookieBanner from "../CookieBanner";

import CookieConsentContext from "../../context/CookieConsentContext";
import { consentCookieApproved } from "../CookieBanner/cookies.helper";

import { Heading, MdxFrontMatter, MdxFields } from "../../sharedTypes";

const {
  STATUS,
  TITLE,
  VERSION,
  FOOTER_PROPS,
  META_DESCRIPTION,
  siteUrl,
} = require("../../config");

interface RouteAnnouncerProps {
  page: string;
}

interface LayoutProps {
  children: ReactNode;
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
}

interface FooterLinks {
  text: string;
  key: string;
  link: string;
}

const RouteAnnouncer: React.FC<RouteAnnouncerProps> = ({ page }) => (
  <div
    className="route-announcer"
    role="status"
    aria-live="assertive"
    aria-atomic="true"
  >{`Navigated to ${page}`}</div>
);

const ClientOnly: React.FC<any> = ({ children, ...delegated }) => {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <div {...delegated}>{children}</div>;
};

const Layout: React.FC<LayoutProps> = ({
  imageUrl = "https://user-images.githubusercontent.com/113986285/206001840-854f0997-ab9d-4c33-a39f-05c2327b02f7.png",
  imageAltText = "Intelligence Community Design System",
  children,
  data,
}) => {
  let canonicalUrl: string = "";
  if (typeof window !== "undefined") {
    canonicalUrl = siteUrl + window.location.pathname;
  }

  let homepage = false;
  if (typeof window !== "undefined") {
    homepage = window.location.pathname === "/";
  }

  let title = homepage ? "Home" : "";
  let description;
  if (data !== undefined) {
    title = data?.mdx?.frontmatter.title;
    description = data?.mdx?.frontmatter.subTitle;
  }

  // meta info for Open Graph & Twitter
  const metas = [
    {
      property: "og:title",
      content: `${title || TITLE} - Intelligence Community Design System`,
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
      content: `${title || TITLE} - Intelligence Community Design System`,
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

  let defaultCookieConsentValue;

  // document object is not available during SSR so a check is in place.
  // document.cookie is required for consentCookieApproved method
  if (typeof document !== "undefined") {
    defaultCookieConsentValue = consentCookieApproved();
  } else {
    defaultCookieConsentValue = false;
  }

  const [cookieConsent, setCookieConsent] = useState<boolean>(
    defaultCookieConsentValue
  );

  const handleCookieConsent = (consent: boolean) => {
    setCookieConsent(true);
    updateConsent(consent);
  };

  const value = React.useMemo(
    () => ({
      cookieConsent,
      handleCookieConsent,
    }),
    [cookieConsent, handleCookieConsent]
  );

  const updateConsent = (consent: boolean) => {
    if (typeof window !== "undefined") {
      window.gtag("consent", "update", {
        ad_storage: consent ? "granted" : "denied",
        analytics_storage: consent ? "granted" : "denied",
      });
    }
  };

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{title || TITLE} - Intelligence Community Design System</title>
        <link rel="canonical" href={`${canonicalUrl}`} />
        {metas.map((meta) => (
          <meta
            key={meta.name || meta.property}
            name={meta.name && meta.name}
            property={meta.property && meta.property}
            content={meta.content}
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
              'ad_storage': '${cookieConsent ? "granted" : "denied"}',
              'analytics_storage': '${cookieConsent ? "granted" : "denied"}',
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
      <CookieConsentContext.Provider value={value}>
        <ClientOnly>
          {title !== "Cookies Policy" && GATSBY_GA_TRACKING_ID && (
            <CookieBanner />
          )}
        </ClientOnly>
        <div className="main-page-container">
          <ic-link href="#main" id="skip-content-link">
            Skip to main content
          </ic-link>
          <TopNavWrapper appTitle={TITLE} status={STATUS} version={VERSION} />
          <main id="main" className="homepage-wrapper">
            {children}
            <ic-back-to-top target="main" />
          </main>
        </div>
        <div className="footer">
          <ic-footer
            description={FOOTER_PROPS.content}
            caption={FOOTER_PROPS.caption}
          >
            {FOOTER_PROPS.footerLinks.map((footerLinks: FooterLinks) => (
              <ic-footer-link
                slot="link"
                href={withPrefix(footerLinks.link)}
                key={footerLinks.key}
              >
                {footerLinks.text}
              </ic-footer-link>
            ))}
            <div slot="logo" className="logo-wrapper">
              <ic-footer-link href="https://sis.gov.uk">
                <SISLogo aria-labelledby="SIS Logo" />
                <span className="link-text">Go to SIS website</span>
              </ic-footer-link>
              <ic-footer-link href="https://www.mi5.gov.uk">
                <MI5Logo aria-labelledby="MI5 Logo" />
                <span className="link-text">Go to MI5 website</span>
              </ic-footer-link>
              <ic-footer-link href="https://gchq.gov.uk">
                <GCHQLogo aria-labelledby="GCHQ Logo" />
                <span className="link-text">Go to GCHQ website</span>
              </ic-footer-link>
            </div>
          </ic-footer>
        </div>
      </CookieConsentContext.Provider>
      <RouteAnnouncer page={`${title || ""} - ${TITLE}`} />
    </>
  );
};

export default Layout;
