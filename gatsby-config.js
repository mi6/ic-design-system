require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const pagesConfig = require("./src/config");

module.exports = {
  pathPrefix: process.env.GATSBY_ICDS_PREFIX || "",
  siteMetadata: {
    author: pagesConfig.author,
    siteUrl: pagesConfig.siteUrl,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: "G-L8G7D6EHQB",
          cookieName: "gatsby_ga-gdpr",
          anonymize: true,
        },
      },
      environments: ["production"],
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: `gatsby-plugin-stencil`,
      options: {
        module: "@ukic/web-components",
        renderToStringOptions: {
          prettyHtml: true,
        },
      },
    },
    `gatsby-plugin-meta-redirect`,
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/src/content`,
        ignore: pagesConfig.manualPageGroups.map(
          (pageGroup) => `**/${pageGroup}/**`
        ),
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
              quality: 100,
              linkImagesToOriginal: false,
              wrapperStyle:
                "border: 1px solid #777; margin-left: 0 !important; margin-right: 0 !important;",
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `heading-link`,
              isIconAfterHeader: true,
              icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4.4 12C4.4 10.29 5.79 8.9 7.5 8.9H11.5V7H7.5C4.74 7 2.5 9.24 2.5 12C2.5 14.76 4.74 17 7.5 17H11.5V15.1H7.5C5.79 15.1 4.4 13.71 4.4 12ZM8.5 13H16.5V11H8.5V13ZM17.5 7H13.5V8.9H17.5C19.21 8.9 20.6 10.29 20.6 12C20.6 13.71 19.21 15.1 17.5 15.1H13.5V17H17.5C20.26 17 22.5 14.76 22.5 12C22.5 9.24 20.26 7 17.5 7Z" fill="#1759BC"/>
              </svg>`,
            },
          },

          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-catch-links`,
      options: {
        excludePattern: /excluded-link/,
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "all",
        engine: "flexsearch",
        query: `
          {
            allContent {
              id
              frontmatter {
                path
                title
              }
            }
          }
        `,
        ref: "id",
        index: ["title"],
        store: ["id", "path", "title"],
        normalizer: ({ data }) =>
          data.allContent.map((node) => ({
            id: node.id,
            path: node.frontmatter.path,
            title: node.frontmatter.title,
          })),
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /assets[/\\]svg/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ic-design-system`,
        short_name: `ICDS`,
        start_url: `/`,
        icon: pagesConfig.favIcon,
      },
    },
  ],
};
