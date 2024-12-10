const SITE_URL = process.env.GATSBY_ICDS_WEBSITE_BASE
  ? process.env.GATSBY_ICDS_WEBSITE_BASE
  : "https://design.sis.gov.uk/";

const pkg = require("../package.json");

module.exports = {
  author: `ICDS`,

  siteUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/"
      : SITE_URL,

  SOURCE_REPO_LINK: process.env.GATSBY_SOURCE_REPO_LINK,

  TITLE: "Intelligence Community Design System",
  SHORT_TITLE: "ICDS",
  META_DESCRIPTION:
    "Use the UK Intelligence Community's Design System to create accessible, usable, and consistent capabilities for complex and specialised needs",

  VERSION: pkg.dependencies["@ukic/web-components"].replace("^", ""),
  STATUS: "BETA",

  FOOTER_PROPS: {
    footerLinks: [
      {
        link: "/icds/accessibility-statement",
        text: "Accessibility Statement",
        key: "a11y-statement",
      },
      {
        link: "/icds/privacy-policy",
        text: "Privacy Policy",
        key: "privacy-policy",
      },
      process.env.GATSBY_GA_TRACKING_ID
        ? {
            link: "/icds/cookies-policy",
            text: "Cookies Policy",
            key: "cookies-policy",
          }
        : {},
      {
        link: "/get-started/releases-versions",
        text: "Versions",
        key: "versions",
      },
    ],
    content:
      "The UK Intelligence Community Design System (ICDS) is a joint project by MI6, MI5, GCHQ, and partners.",
    caption:
      "All content is available under the Open Government Licence v3.0, except source code and code examples which are available under the MIT Licence.",
  },

  favIcon: `src/assets/svg/favicon.svg`,

  defaultTemplateComponent: "src/templates/Standard/index.tsx",

  homepage: {
    hero: {
      title: "Create powerful apps and services that work for everyone.",
      text: "Use and contribute to MI6, MI5, and GCHQ's Design System to create accessible, usable and consistent capabilities like those used across the UK's Intelligence Community.",
      secondaryHeading: null,
      secondarySubHeading: null,
      button: {
        text: "Get started",
        link: "/get-started",
      },
    },
    cards: {
      content: [
        {
          path: "/accessibility/",
          title: "Accessibility",
          description:
            "Design, build and test apps and services that work equitably for everyone.",
        },
        {
          path: "/styles",
          title: "Styles",
          description:
            "Create experiences that empower time after time, across diverse touchpoints.",
        },
        {
          path: "/components",
          title: "Components",
          description:
            "Rapidly build apps that work robustly across tech stacks and platforms.",
        },
        {
          path: "/patterns",
          title: "Patterns",
          description:
            "Lower learning curves and create super users with intuitive, extendable patterns.",
        },
      ],
    },
    about: {
      title: "The UK Intelligence Community's Design System",
      content: [
        "This Design System helps you to design and build complex, specialised apps and services. It's used by MI6, MI5, GCHQ and our partners to construct tools that keep the UK safe and prosperous.",
        "The Design System empowers through accessibility-by-design, a diverse and inclusive community, and flexible tech and implementation options.",
        "To find out more, delve into our story on how we support people and organisations develop valuable apps and services accessible for everyone.",
      ],
      link: "/get-started/a-design-system",
      buttonText: "Read our story",
    },
    design: {
      title: "For designers",
      content: [
        "Whether you're building a new interface or refining an existing one, our Figma UI Kit, principles and documentation enable you to create intuitive, consistent and accessible designs with ease.",
      ],
      button: [
        {
          href: "/get-started/design",
          text: "Explore design",
          variant: "primary",
        },
        {
          href: "/get-started/design/design-principles",
          text: "Read our design principles",
          variant: "secondary",
        },
      ],
    },
    develop: {
      title: "For developers",
      content: [
        "Our development UI Kit is built with Stencil.js to ensure seamless integration across React, Vue, Angular and other frameworks.",
        "With a focus on accessibility and ease of use, these components equip developers to create responsive and inclusive experiences.",
      ],
      button: [
        {
          href: "/get-started/development",
          text: "Explore development",
          variant: "primary",
        },
        {
          href: "/get-started/development/test-components",
          text: "Learn how we test components",
          variant: "secondary",
        },
      ],
    },
    contribute: {
      title: "Contribute to our community",
      content: [
        "The Design System is primarily built for the large numbers of apps and services we have.",
        "While most of the work is undertaken by our Engineering teams, we've open sourced our Design System for the world to see, use and contribute to (which we think is very cool).",
      ],
      link: "/community",
      buttonText: "Find out more",
    },
  },

  // manualPageGroups: Will prevent Gatsby creating pages and routes automatically
  // for pages in any of these folders. These are probably the same as the groups below.
  manualPageGroups: ["articles", "structured", "static"],

  // These page groups will be iterated over manually and created using the gatsby API
  pageGroups: [
    {
      folder: "/content/structured/",
      templateStyle: "sectionnav",
    },
    {
      folder: "/content/static/",
      templateStyle: "tableofcontents",
    },
  ],

  templateOverrides: [
    {
      // For this specific file...
      pageFilepath: "/content/static/accessibility-statement.md",
      // With this configuration.
      templateStyle: "tableofcontents",
    },
  ],
};
