const SITE_URL = process.env.GATSBY_ICDS_WEBSITE_BASE
  ? process.env.GATSBY_ICDS_WEBSITE_BASE
  : "https://design.sis.gov.uk/";

module.exports = {
  author: `ICDS`,

  siteUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/"
      : SITE_URL,

  SOURCE_REPO_LINK: process.env.GATSBY_SOURCE_REPO_LINK,

  TITLE: "Intelligence Community Design System",
  META_DESCRIPTION:
    "Use the UK Intelligence Community's Design System to create accessible, usable, and consistent capabilities for complex and specialised needs",

  VERSION: "V2.0.7",
  STATUS: "BETA",

  FOOTER_PROPS: {
    footerLinks: [
      {
        link: "/icds",
        text: "Accessibility Statement",
        key: "a11y-statement",
      },
      {
        link: "/icds/privacy-policy",
        text: "Privacy Policy",
        key: "privacy-policy",
      },
      {
        link: "/icds/cookies-policy",
        text: "Cookie Policy",
        key: "cookies-policy",
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
          icon: "AccessibilityIcon",
          description:
            "Design, build and test apps and services that work equitably for everyone.",
        },
        {
          path: "/styles",
          title: "Styles",
          icon: "StyleOutlinedIcon",
          description:
            "Create experiences that empower time after time, across diverse touchpoints.",
        },
        {
          path: "/components",
          title: "Components",
          icon: "ExtensionOutlinedIcon",
          description:
            "Rapidly build apps that work robustly across tech stacks and platforms.",
        },
        {
          path: "/patterns",
          title: "Patterns",
          icon: "DashboardOutlinedIcon",
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
      linkText: "Read the story of our Design System",
    },
    contribute: {
      title: "Contribute",
      content: [
        "The Design System is primarily built for the large numbers of apps and services we have.",
        "While most of the work is undertaken by our Engineering teams, we've open sourced our Design System for the world to see, use and contribute to (which we think is very cool).",
      ],
      link: "/community",
      linkText: "Learn how to contribute",
    },
    resources: {
      title: "Resources",
      content: [],
      cards: [
        {
          path: "/get-started/install-components",
          title: "Install the UI Kit components",
          description:
            "Install and use the UI Kit component library. Use React or web components to quickly build accessible interfaces.",
        },
        {
          path: "/get-started/figma",
          title: "Figma UI kit",
          description:
            "Reusable and flexible Figma components used to design, prototype and hand-off designs for apps and digital products.",
        },
      ],
    },
  },

  // manualPageGroups: Will prevent Gatsby creating pages and routes automatically
  // for pages in any of these folders. These are probably the same as the groups below.
  manualPageGroups: ["articles", "structured", "static"],

  // These page groups will be iterated over manually and created using the gatsby API
  pageGroups: [
    {
      folder: "/content/structured/",
      templateComponent: "src/templates/Standard/index.tsx",
      templateStyle: "sectionnav",
    },
    {
      folder: "/content/static/",
      templateComponent: "src/templates/Standard/index.tsx",
      templateStyle: "tableofcontents",
    },
  ],

  templateOverrides: [
    {
      // For this specific file...
      pageFilepath: "/content/static/accessibility-statement.md",
      // Use this template component...
      templateComponent: "src/templates/Standard/index.tsx",
      // With this configuration.
      templateStyle: "tableofcontents",
    },
  ],
};
