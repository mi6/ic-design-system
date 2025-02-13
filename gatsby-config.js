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
                subTitle
                tags
              }
              body
            }
          }
        `,
        ref: "id",
        index: ["title", "subTitle", "body", "tags"],
        store: ["id", "path", "title", "subTitle", "body", "tags"],
        normalizer: ({ data }) =>
          data.allContent.map((node) => ({
            id: node.id,
            path: node.frontmatter.path,
            title: node.frontmatter.title,
            subTitle: node.frontmatter.subTitle,
            body: node.body,
            tags: node.frontmatter.tags,
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
    {
      resolve: `gatsby-plugin-postbuild`,
      options: {
        processing: {
          strategy: "parallel",
          concurrency: 15,
        },
        reporting: true,
        enabled: true,
      },
    },
    `gatsby-plugin-no-sourcemaps`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: pagesConfig.siteUrl,
        sitemap: `${pagesConfig.siteUrl}sitemap-index.xml`,
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        output: "/",
        query: `
        {
          allSitePage {
            edges {
              node {
                path
              }
            }
          }
        }`,
        resolveSiteUrl: () => pagesConfig.siteUrl,
        resolvePages: (data) => data.allSitePage.edges.map((edge) => edge.node),
      },
    },
    `gatsby-plugin-fix-fouc`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
        ignore: [`.(tsx|ts|jsx|js|css|md|mdx)$`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `static`,
        path: `${__dirname}/static/`,
        ignore: [`.(doc|doc|html)$`],
      },
    },
    `gatsby-plugin-minify`,
  ],
};
