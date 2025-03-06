const path = require("path");
const fs = require("fs");
// eslint-disable-next-line import/no-extraneous-dependencies
const prettier = require("prettier");
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require("webpack");

const componentJson = require("@ukic/docs");
const canaryComponentJson = require("@ukic/canary-docs");

const pagesConfig = require("./src/config");

const manualPageGroupsRegex = pagesConfig.manualPageGroups.join("|");
const mainQuery = `
  fragment contents on Mdx {
    id
    fileAbsolutePath
    body
    rawBody
    fields {
      slug
      navSection
    }
    frontmatter {
      path
      title
      status
      subTitle
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
`;

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

    let templateType = pageTypeConfig
      ? pageTypeConfig.templateStyle
      : "tableofcontents";

    const pageTemplateOverrideConfig = pagesConfig.templateOverrides.find(
      (pg) => filePath.endsWith(pg.pageFilepath)
    );

    if (pageTemplateOverrideConfig)
      templateType = pageTemplateOverrideConfig.templateStyle;

    createPage({
      path: pagePath,
      component: path.resolve(pagesConfig.defaultTemplateComponent),
      context: {
        id: node.id,
        navSection: node.fields.navSection,
        pageType: templateType,
      },
    });

    if (oldPath && oldPath !== pagePath) {
      createRedirect({
        redirectInBrowser: true,
        isPermanent: true,
        fromPath: `${oldPath}`,
        toPath: `${pagePath}`,
      });
    }
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

// eslint-disable-next-line consistent-return
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { data, errors } = await graphql(mainQuery);

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
      // eslint-disable-next-line no-console
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
          const nodes = context.nodeModel.findAll({
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
          const nodes = context.nodeModel.findAll({
            type: "Mdx",
          });
          const articles = nodes.filter(
            (cont) =>
              cont.frontmatter.path &&
              !Number.isNaN(Date.parse(cont.frontmatter.date)) &&
              /\/content\/articles\//i.test(cont.fileAbsolutePath) &&
              !cont.frontmatter.hidden
          );
          return articles;
        },
      },

      // actually is allContent?
      allContent: {
        type: [`Mdx`],
        resolve: async (source, args, context) => {
          const { entries } = await context.nodeModel.findAll({
            type: "Mdx",
          });
          const structured = entries.filter(
            (cont) =>
              cont.frontmatter.path &&
              !Number.isNaN(Date.parse(cont.frontmatter.date)) &&
              /\/content\//i.test(cont.fileAbsolutePath) &&
              !cont.frontmatter.hidden
          );
          return structured;
        },
      },
    },
  };
  createResolvers(resolvers);
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false,
      },
    },
    plugins: [
      /**
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

exports.sourceNodes = () => {
  // Find the name of the components in the @ukic* folders
  const canaryReact = path.resolve(
    __dirname,
    "node_modules/@ukic/canary-react/dist/components.d.ts"
  );
  const canaryWebComponents = path.resolve(
    __dirname,
    "node_modules/@ukic/canary-web-components/dist/types/components"
  );
  const react = path.resolve(
    __dirname,
    "node_modules/@ukic/react/dist/components.d.ts"
  );

  // Get the names of components in the canary-web-components package
  const canaryWebComponentsNames = fs
    .readdirSync(canaryWebComponents, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const getComponentNames = (filePath, regex) => {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const componentNames = [];
    let match = regex.exec(fileContent);
    while (match !== null) {
      componentNames.push(match[1]);
      match = regex.exec(fileContent);
    }
    return componentNames;
  };

  const regex = /export declare const (\w+):/g;
  // Read the contents of the canaryReact and react file
  const canaryReactComponentNames = getComponentNames(canaryReact, regex);
  const reactComponentNames = getComponentNames(react, regex);

  // Get the types of the components in the canary-web-components package
  const getCanaryWebComponentTypes = (directory, componentNames) => {
    const typesRegex = /export\s+type\s+(\w+)\s+=/g;
    let canaryTypes = [];

    if (!directory || typeof directory !== "string") {
      throw new Error("Invalid directory");
    }

    if (!Array.isArray(componentNames)) {
      throw new Error("Invalid componentNames");
    }

    componentNames.forEach((componentName) => {
      const componentDirectory = path.join(directory, componentName);

      const filesInDirectory = fs.readdirSync(componentDirectory);

      filesInDirectory.forEach((fileName) => {
        if (fileName.endsWith(".types.d.ts")) {
          const fileContent = fs.readFileSync(
            path.join(componentDirectory, fileName),
            "utf8"
          );

          let typesMatch = typesRegex.exec(fileContent);
          while (typesMatch !== null) {
            const exports = typesMatch[1]
              .trim()
              .split(",")
              .map((item) => item.trim());
            canaryTypes = [...canaryTypes, ...exports];
            typesMatch = typesRegex.exec(fileContent);
          }
        }
      });
    });
    return [...new Set(canaryTypes)];
  };

  const data = {
    canaryReactComponentNames,
    canaryWebComponentsNames,
    canaryTypes: getCanaryWebComponentTypes(
      canaryWebComponents,
      canaryWebComponentsNames
    ),
    reactComponentNames,
  };
  const outputFilePath = path.resolve(
    __dirname,
    "./src/data/canary-component-names.json"
  );
  if (!outputFilePath.startsWith(__dirname)) {
    throw new Error("Invalid file path");
  }

  fs.writeFileSync(
    outputFilePath,
    prettier.format(JSON.stringify(data), { parser: "json" })
  );
};

// See https://llmstxt.org/
const createLlmsTxt = async ({ edges, reporter }) => {
  let textString = `# ${pagesConfig.TITLE}

> ${pagesConfig.META_DESCRIPTION}

# Docs

`;

  edges.forEach(({ node }) => {
    const pagePath = node.fields.slug;
    if (!pagePath) {
      return;
    }

    let nodeString = `- [${node.frontmatter.title}](${pagesConfig.siteUrl.slice(
      0,
      -1
    )}${pagePath})`;
    if (node.frontmatter.subTitle) {
      nodeString += `: ${node.frontmatter.subTitle}`;
    }

    textString += `${nodeString}\n`;
  });

  const outputPath = path.join("public", "llms.txt");
  fs.writeFileSync(outputPath, textString, "utf8");
  reporter.info(`Wrote llms.txt`);
};

const createLlmsTxtFull = async ({ edges, reporter }) => {
  let textString = "";

  edges.forEach(({ node }) => {
    const pagePath = node.fields.slug;
    if (!pagePath) {
      return;
    }
    let nodeMd = node.rawBody;

    // Remove raw frontmatter
    if (nodeMd.startsWith("---\n")) {
      // eslint-disable-next-line prefer-destructuring
      nodeMd = nodeMd.slice(2).split("---")[1];
    }

    let nodeString = `# ${node.frontmatter.title}

URL: ${pagesConfig.siteUrl.slice(0, -1)}${pagePath}
`;

    if (node.frontmatter.status) {
      nodeString += `Status: ${node.frontmatter.status}\n`;
    }
    if (node.frontmatter.subTitle) {
      nodeString += `Subtitle: ${node.frontmatter.subTitle}\n`;
    }

    nodeString += nodeMd;

    // Embed the component details data
    nodeString = nodeString.replaceAll(
      /<ComponentDetails component="([\w-]+)" (canary )?\/>/g,
      (match, component, canary) => {
        const componentDetailsJson = canary
          ? canaryComponentJson
          : componentJson;
        const componentDetails = componentDetailsJson.components.find(
          ({ tag }) => tag === component
        );
        if (!componentDetails) return;
        const { props, slots, events, methods, styles, listeners } =
          componentDetails;
        const jsonText = JSON.stringify(
          {
            props,
            slots,
            styles,
            events,
            methods,
            listeners,
          },
          null,
          2
        );
        // eslint-disable-next-line consistent-return
        return `${jsonText}\n`;
      }
    );
    textString += `${nodeString}\n---\n\n`;
  });

  const outputPath = path.join("public", "llms-full.txt");
  fs.writeFileSync(outputPath, textString, "utf8");
  reporter.info(`Wrote llms-full.txt`);
};

// eslint-disable-next-line consistent-return
exports.onPostBuild = async ({ graphql, reporter }) => {
  const { data, errors } = await graphql(mainQuery);

  // Handle errors
  if (errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return Promise.reject(errors);
  }

  const { allMarkdown } = data;

  if (!allMarkdown.edges.length) {
    throw new Error("There are no articles");
  }
  const { edges } = allMarkdown;

  await createLlmsTxt({ edges, reporter });
  await createLlmsTxtFull({ edges, reporter });
};
