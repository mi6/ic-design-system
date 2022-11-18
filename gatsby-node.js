const path = require(`path`);
const webpack = require("webpack");
const pagesConfig = require("./src/config");

const createPosts = ({ createPage, createRedirect, edges }) => {
  edges.forEach(({ node }) => {
    const pagePath = node.fields.slug;
    const oldPath = node.frontmatter.path;
    const filePath = node.fileAbsolutePath;
    if (!pagePath) {
      return;
    }

    const pageTypeConfig = pagesConfig.pageGroups.find(
      (grp) => filePath.indexOf(grp.folder) > -1
    );

    let template = pageTypeConfig
      ? pageTypeConfig.templateComponent
      : pagesConfig.defaultTemplateComponent;

    let templateType = pageTypeConfig
      ? pageTypeConfig.templateStyle
      : "tableofcontents";

    const pageTemplateOverrideConfig = pagesConfig.templateOverrides.find(
      (pg) => filePath.endsWith(pg.pageFilepath)
    );

    if (pageTemplateOverrideConfig) {
      template = pageTemplateOverrideConfig.templateComponent;
      templateType = pageTemplateOverrideConfig.templateStyle
        ? pageTemplateOverrideConfig.templateStyle
        : "tableofcontents";
    }

    createPage({
      path: pagePath,
      component: path.resolve(template),
      context: {
        id: node.id,
        pageType: templateType,
      },
    });

    if (!oldPath || oldPath === pagePath) {
      return;
    }

    createRedirect({
      redirectInBrowser: true,
      isPermanent: true,
      fromPath: `${oldPath}`,
      toPath: `${pagePath}`,
    });
  });
};

const createArticles = ({ data, actions }) => {
  if (!data.edges.length) {
    throw new Error("There are no articles");
  }
  const { edges } = data;
  const { createPage, createRedirect } = actions;

  createPosts({ createPage, createRedirect, edges });
  return null;
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const manualPageGroupsRegex = pagesConfig.manualPageGroups.join("|");

  const { data, errors } = await graphql(`
    fragment contents on Mdx {
      id
      fileAbsolutePath
      body
      fields {
        slug
      }
      frontmatter {
        path
      }
    }
    query {
      allMarkdown: allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }

        filter: { fileAbsolutePath: { regex: "//content/(${manualPageGroupsRegex})//" } }
      ) {
        edges {
          node {
            ...contents
          }
        }
      }
    }
  `);

  // Handle errors
  if (errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return Promise.reject(errors);
  }

  const { allMarkdown } = data;

  createArticles({
    data: allMarkdown,
    actions,
  });
};

exports.onCreateNode = (...args) => {
  if (args[0].node.internal.type === "Mdx") {
    if (!args[0].node) {
      console.log(args[0].node);
    }
    onCreateMarkdownNode(...args);
  }
};

// based on config we'll change the slugs/route per page if needed.
const onCreateMarkdownNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  let slug = node.frontmatter.path;
  const filePath = node.fileAbsolutePath;

  const pageConfig = pagesConfig.pageGroups.find(
    (grp) => filePath.indexOf(grp.folder) > -1
  );

  if (
    pageConfig &&
    pageConfig.pathPrefix &&
    node.fileAbsolutePath.includes(pageConfig.folder) &&
    node.frontmatter.path
  ) {
    slug = pageConfig.pathPrefix + node.frontmatter.path;
  }

  createNodeField({
    name: "slug",
    node,
    value: slug,
  });

  if (filePath.indexOf("/content/structured/") !== -1) {
    const pathParts = node.frontmatter.path
      .replace(/^\/+|\/+$/g, "")
      .split("/");

    const section = pathParts[0];
    pathParts.pop();

    createNodeField({
      name: "navSection",
      node,
      value: section,
    });

    createNodeField({
      name: "navParent",
      node,
      value: pathParts.length !== 0 ? `/${pathParts.join("/")}` : "NONE",
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const type = `
    type Page {
      about: Mdx
    }
  `;
  createTypes(type);
};

// these are used for the search queries
exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Query: {
      allStructuredNav: {
        type: [`Mdx`],
        resolve: (source, args, context) => {
          const nodes = context.nodeModel.getAllNodes({
            type: "Mdx",
          });

          const withNav = nodes.filter(
            (cont) =>
              cont.fields &&
              cont.fields.navSection != null &&
              cont.fields.navSection !== "null"
          );

          return withNav;
        },
      },

      // allows a restricted search
      allArticles: {
        type: [`Mdx`],
        resolve: (source, args, context) => {
          const nodes = context.nodeModel.getAllNodes({
            type: "Mdx",
          });
          const articles = nodes.filter(
            (cont) =>
              cont.frontmatter.path &&
              !isNaN(Date.parse(cont.frontmatter.date)) &&
              RegExp("/content/articles/", "i").test(cont.fileAbsolutePath) &&
              !cont.frontmatter.hidden
          );
          return articles;
        },
      },

      // actually is allContent?
      allContent: {
        type: [`Mdx`],
        resolve: (source, args, context) => {
          const nodes = context.nodeModel.getAllNodes({
            type: "Mdx",
          });
          const structured = nodes.filter(
            (cont) =>
              cont.frontmatter.path &&
              !isNaN(Date.parse(cont.frontmatter.date)) &&
              RegExp("/content/", "i").test(cont.fileAbsolutePath) &&
              !cont.frontmatter.hidden
          );
          return structured;
        },
      },
    },
  };
  createResolvers(resolvers);
};

exports.onCreateWebpackConfig = ({ actions, plugins }) => {
  actions.setWebpackConfig({
    plugins: [
      /**
       * - @dan80901
       *
       * See line 203 of:
       *
       * gatsby source: gatsby/cache-dir/navigation.js
       *
       * and how it uses 'h1' to generate the page name to announce to screen readers.
       *
       * Gatsby uses client-side loading and not 'full page' load navigation
       * that you normally get in static sites. This is used to speed page loads and other
       * caching behaviour. It cannot be disabled.
       *
       * Because the @ukic/[experimental-]components AppBar uses 'h1' as the app title,
       * Gatsby was reading the page title as whatever was in the app bar. So each page in
       * it's RouteAnnouncer was 'Intelligence Community Design System'. Thus, by
       * the nature of 'aria-live', no page navigation was announced by the
       * aria-live="assertive" element that this above code controls.
       *
       * Here we webpack-replace a file used by that code which effectively renders the Gatsby RouteAnnouncer
       * inert.
       *
       * In ./src/components/Layout/index.jsx, we add our own aria-live="assertive" region
       * which correctly announces routes.
       *
       * Two alternatives to this problem:
       * 1. Raise a PR on gatsby proper with an improvement.
       * 2. Change the @ukic/[experimental-]components AppBar to not use 'h1' as a title,
       * though there is no best practice for this.
       *
       * This 'issue' only affects Gatsby-derived sites that use @ukic/[experimental-]components.
       *
       * It is known that this is a likely regression in future gatsby updates, though it will easily
       * be spotted with the regular screen reader testing we'll be doing.
       */
      new webpack.NormalModuleReplacementPlugin(
        /route-announcer-props/,
        path.resolve(__dirname, "./gatsby-overrides.js")
      ),
    ],
  });
};
