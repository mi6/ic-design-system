import kebabCase from "lodash.kebabcase";
import startCase from "lodash.startcase";
import data from "../../../../../data/canary-component-names.json";

const designSystemPackageJson = require("../../../../../../package.json");

const { canaryReactComponentNames, canaryTypes, reactComponentNames } = data;

const getCanaryReactImports = (codeSnippet: string | undefined) => {
  if (codeSnippet) {
    const imports = canaryReactComponentNames.filter((name) =>
      codeSnippet.includes(name)
    );
    return imports;
  }
  return [];
};

export const createIndexTsx = (
  componentName: string,
  isCodeSnippet?: boolean,
  codeSnippet?: string | undefined
) => {
  const component = isCodeSnippet
    ? startCase(componentName.replace(/\(.*?\)/g, "")).replace(/\s/g, "")
    : componentName;
  return `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';${
    codeSnippet && codeSnippet.includes("react-router-dom")
      ? ""
      : `\nimport { BrowserRouter } from 'react-router-dom';`
  }

import ${component} from './app';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    ${
      codeSnippet && codeSnippet.includes("react-router-dom")
        ? `<${component} />`
        : `<BrowserRouter>
      <${component} />
    </BrowserRouter>`
    }
  </StrictMode>
);`;
};

export const createReactIndexHTML = (ext: string) => `<html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Intelligence Community Design System (ICDS)</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/src/index.${ext}"></script>
      </body>
    </html>`;

export const packageJson = (
  projectTitle: string,
  isWebComponents: boolean,
  codeSnippet: string | undefined
) => {
  const dependenciesArray = isWebComponents
    ? []
    : [
        ["@mdi/js", "^7.4.47"],
        [
          "@ukic/fonts",
          `${designSystemPackageJson.dependencies["@ukic/fonts"]}`,
        ],
        [
          "@ukic/react",
          `${designSystemPackageJson.dependencies["@ukic/react"]}`.slice(1),
        ],
        [
          "@ukic/web-components",
          `${designSystemPackageJson.dependencies["@ukic/web-components"]}`.slice(
            1
          ),
        ],
        ["react", "^18.2.0"],
        ["react-dom", "^18.2.0"],
        ["react-jss", "^10.10.0"],
        ["react-router-dom", "^6.22.0"],
      ];
  if (getCanaryReactImports(codeSnippet).length > 0) {
    dependenciesArray.splice(1, 0, [
      "@ukic/canary-react",
      `${designSystemPackageJson.dependencies["@ukic/canary-react"]}`.slice(1),
    ]);
  }

  const dependencies = Object.fromEntries(dependenciesArray);

  const reactDevDependencies = {
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
  };
  const devDependencies = { vite: "^5.0.12" };

  return {
    name: `icds-${kebabCase(projectTitle)}`,
    version: "0.0.0",
    private: true,
    scripts: {
      dev: "vite",
      build: "vite build",
      preview: "vite preview",
      prettier: "prettier --write .",
    },
    dependencies,
    devDependencies: isWebComponents
      ? { ...devDependencies }
      : { ...devDependencies, ...reactDevDependencies },
    stackblitz: {
      startCommand:
        "npm i --save-dev prettier && npm run prettier && npm run dev",
    },
  };
};

export const tsConfig = `{
    "compilerOptions": {
      "jsx": "react-jsx",
      "lib": ["DOM", "ES2022"],
      "moduleResolution": "node",
      "target": "ES2022"
    }
  }`;

export const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
`;

export const createWebComponentsIndexHTML = (
  codeSnippet: string,
  isPattern: boolean = false
) => {
  if (codeSnippet.includes('<html lang="en">')) {
    return codeSnippet;
  }

  const { canaryWebComponentsNames } = data;
  const getCanaryWebComponentsImports = () => {
    const imports = canaryWebComponentsNames.filter((name) =>
      codeSnippet.includes(name)
    );
    return imports.length > 0;
  };

  const addStyling = (snippet: string) => {
    const styling: string[] = [];
    if (/<main/.test(snippet)) {
      styling.push("main {", "\tdisplay: flex;", "\tmin-height: 100vh;", "}");
    }
    if (/class="content-div-container"/.test(snippet)) {
      styling.push(
        ".content-div-container {",
        "\tdisplay: flex;",
        "\tflex-direction: column;",
        "\tflex-grow: 1;",
        "}"
      );
    }
    if (/class="main-section-container"/.test(snippet)) {
      styling.push(
        ".main-section-container {",
        "\tdisplay: flex;",
        "\tflex: 1;",
        "}"
      );
    }
    if (/class="main-content-div"/.test(snippet)) {
      styling.push(
        ".main-content-div {",
        "\tborder: var(--ic-border-width) dashed var(--ic-architectural-400);",
        "\tpadding: var(--ic-space-md);",
        "\tflex: 1;",
        "}"
      );
    }
    if (/class="parent-div"/.test(snippet)) {
      styling.push(".parent-div {", "\tdisplay: flex;", "\theight: 100%", "}");
    }

    if (/class="input-area"/.test(snippet)) {
      styling.push(
        ".input-area {",
        "\tdisplay: flex;",
        "\tflex-wrap: wrap;",
        "\tgap: var(--ic-space-md);",
        "}",
        "ic-text-field {",
        "\t--input-width: 21.5rem;",
        "}",
        "@media screen and (max-width: 768px) {",
        "\tic-text-field {",
        "\t\t--input-width: 100%;",
        "\t\tflex: 1 1 0;",
        "\t}",
        "}",
        "@media screen and (max-width: 320px) {",
        "\t.input-area {",
        "\t\tgap: var(--ic-space-xs);",
        "\t}",
        "}"
      );
    }
    if (styling.length > 1) styling[0] = `\t${styling[0]}`;
    if (styling.length === 0) return "";
    return `\n${styling.join("\n\t")}`;
  };

  let styling = "<body>";
  const addedStyling = addStyling(codeSnippet);

  if (addedStyling !== "" && isPattern) {
    styling = `<style>\t${addedStyling}\n</style>\n<body>`;
  } else if (codeSnippet.includes("</style>")) {
    styling = "<style>";
  }

  const formatLines = (snippet: string = codeSnippet) => {
    const lines = String(snippet).split("\n");
    const newLines = lines ? [...lines] : [];
    if (newLines.length > 0) {
      for (let i = 1; i < newLines.length; i += 1) {
        newLines[i] = `  ${newLines[i]}`;
      }
    }
    return newLines.join("\n");
  };

  const formattedCodeSnippet = formatLines();

  const fontsPackage =
    `${designSystemPackageJson.dependencies["@ukic/fonts"]}`.slice(1);
  const webCompsPackage =
    `${designSystemPackageJson.dependencies["@ukic/web-components"]}`.slice(1);
  const canaryWebCompsPackage =
    `${designSystemPackageJson.dependencies["@ukic/canary-web-components"]}`.slice(
      1
    );

  return `<html lang="en">
  <head>
    <title>Home</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://unpkg.com/@ukic/fonts@${fontsPackage}/dist/fonts.css"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://unpkg.com/@ukic/web-components@${webCompsPackage}/dist/core/core.css"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://unpkg.com/@ukic/web-components@${webCompsPackage}/dist/core/normalize.css"
      crossorigin="anonymous"
    />
  </head>
  ${styling}
    ${formattedCodeSnippet}
    <script defer>
      import('https://unpkg.com/@ukic/web-components@${webCompsPackage}/loader').then((module) => {
        module.defineCustomElements();
      });${
        getCanaryWebComponentsImports()
          ? `\n\t  import('https://unpkg.com/@ukic/canary-web-components@${canaryWebCompsPackage}/loader').then((module) => {
        module.defineCustomElements();
      });`
          : ""
      }
      // The ICDS has types available if your JavaScript framework allows for use with TypeScript
      // Below is an example of how to import an ICDS type
      // import type { IcAlignment } from 'https://unpkg.com/@ukic/web-components/';
    </script>
  </body>
</html>`;
};

export const createReactAppTsx = (
  codeSnippet: string,
  componentName: string,
  fileExtension: "jsx" | "tsx"
): string => {
  if (codeSnippet.includes("@ukic/react")) {
    return codeSnippet;
  }

  const formatLines = (snippet: string = codeSnippet) => {
    const lines = String(snippet).split("\n");
    const newLines = lines ? [...lines] : [];
    if (newLines.length > 0) {
      for (let i = 1; i < newLines.length; i += 1) {
        newLines[i] = `${codeSnippet.includes("return") ? `` : `\t`}${
          newLines[i]
        }`;
      }
    }
    return newLines.join("\n");
  };

  const formattedCodeSnippet = formatLines();
  // Helper function to find uses of ICDS components and MDI in code snippet
  const getImports = (
    tag: string | undefined,
    isMDI: boolean = false,
    isPatternInternal: boolean = false
  ) => {
    let regex: RegExp;
    if (isMDI) {
      regex = new RegExp(`{${tag}[^}]*}`, "g");
    } else if (isPatternInternal) {
      regex = /(?!(<|<\/|\.))\bIc[A-Za-z]+\b/g;
    } else {
      regex = new RegExp(`<${tag}[^>]*>`, "g");
    }

    let matches = isPatternInternal
      ? codeSnippet.match(regex) || []
      : (codeSnippet.match(regex) || []).map((match) =>
          match.slice(1, match.indexOf(isMDI ? "}" : " ")).trim()
        );

    if (tag === "Ic") {
      matches = matches.filter((match) => reactComponentNames.includes(match));
    }

    const canaryReactComponents = getCanaryReactImports(codeSnippet);
    if (canaryReactComponents.length > 0 && tag === "Ic") {
      matches = matches.filter(
        (match) => !canaryReactComponents.includes(match)
      );
    }

    return matches;
  };

  // Helper function to sort and remove duplicates
  const sortAndRemoveDuplicates = (matches: string[]) =>
    Array.from(new Set(matches)).sort();

  // Get matches for "Ic", "SlottedSVG", and "mdi".
  // Sort and remove duplicates
  const sortedICDSComponents = sortAndRemoveDuplicates([
    ...getImports("Ic"),
    ...getImports("SlottedSVG"),
  ]);
  const sortedMDIcons = sortAndRemoveDuplicates(getImports("mdi", true));
  if (sortedMDIcons.length > 3) sortedMDIcons[0] = `  ${sortedMDIcons[0]}`;
  const component = startCase(componentName.replace(/\(.*?\)/g, "")).replace(
    /\s/g,
    ""
  );
  let getIcTypes: string[] = [];
  const allIcMatches = getImports(undefined, false, true);
  const allIcComponents = getImports("Ic");

  // Check if codeSnippet contains any Canary-specific types
  const getCanaryTypes = (code: string | undefined = codeSnippet) => {
    if (code) {
      const types = canaryTypes.filter((type) => code.includes(type));
      return types.sort();
    }
    return [];
  };

  getIcTypes = sortAndRemoveDuplicates(
    allIcMatches
      .filter((item: string) => !allIcComponents.includes(item))
      .filter(
        (item: string) => !getCanaryReactImports(codeSnippet).includes(item)
      )
      .filter((item: string) => !getCanaryTypes().includes(item))
      .filter((item: string) => item !== "Icon")
      .concat(
        allIcComponents.filter((item: string) => !allIcMatches.includes(item))
      )
      .map((type) => type.replace(/\W+$/, ""))
  );

  const formatImports = (array: string[]) => {
    if (array.length > 3) {
      return `\n  ${array.join(",\n  ")}\n`;
    }
    if (array.length === 0) {
      return "";
    }
    return `${array.join(", ")} `;
  };
  const importedICDSComponents = formatImports(sortedICDSComponents);
  const importedCanaryComponents = formatImports(
    getCanaryReactImports(codeSnippet).length > 0
      ? getCanaryReactImports(codeSnippet).sort()
      : []
  );
  const importedIcTypes = formatImports(getIcTypes);
  const importedCanaryTypes = formatImports(getCanaryTypes());

  // Check if codeSnippet contains any React Router imports
  const getReactRouterImports = (code: string) => {
    const imports = [
      "MemoryRouter",
      "Route",
      "Routes",
      "NavLink",
      "useLocation",
    ];
    const foundImports = imports.filter((importName) =>
      code.includes(importName)
    );
    return foundImports;
  };

  const reactRouterImports = getReactRouterImports(codeSnippet);

  // Check if codeSnippet contains any React hooks
  const getReactHooks = (code: string) => {
    const hooks = ["useState", "useRef", "useEffect"];
    const foundHooks = hooks.filter((hook) => code.includes(hook));
    return foundHooks;
  };

  const reactHookImports = getReactHooks(codeSnippet);

  // Create React import statement
  let reactImportStatement = "import React";
  const reactImports = [];
  if (fileExtension === "tsx") {
    reactImports.push("FC");
  }
  if (reactHookImports.length > 0) {
    reactImports.push(...reactHookImports);
  }
  if (reactImports.length > 0) {
    reactImportStatement += `, { ${reactImports.join(", ")} }`;
  }
  reactImportStatement += " from 'react';";

  // Check if codeSnippet contains "return(" or "return ("
  const containsReturn = /return\s*\(/g.test(codeSnippet);

  // Check if codeSnippet contains "createUseStyles" from 'react-jss'
  const containsCreateUseStyles = /createUseStyles\(\{/.test(codeSnippet);
  // Conditionally render "return(" in the returned output string
  const returnStatement = containsReturn ? "" : "return (";

  return `${reactImportStatement}${
    reactRouterImports.length > 0
      ? `\nimport { ${reactRouterImports.join(", ")} } from 'react-router-dom';`
      : ""
  }${
    importedICDSComponents.length > 0
      ? `\nimport { ${importedICDSComponents}} from '@ukic/react';`
      : ""
  }${
    importedCanaryComponents.length > 0
      ? `\nimport { ${importedCanaryComponents}} from '@ukic/canary-react';`
      : ""
  }${
    importedCanaryTypes.length > 0
      ? `\nimport type { ${importedCanaryTypes}} from '@ukic/canary-web-components';`
      : ""
  }${
    fileExtension === "tsx" && importedIcTypes.length > 0
      ? `import type { ${importedIcTypes}} from '@ukic/web-components';`
      : ""
  }${
    sortedMDIcons.length > 0
      ? `\nimport { ${
          sortedMDIcons.length > 3
            ? `\n${sortedMDIcons.join(",\n  ")}\n`
            : `${sortedMDIcons.join(", ")} `
        }} from '@mdi/js';`
      : ""
  }
  ${
    containsCreateUseStyles
      ? `\nimport { createUseStyles } from 'react-jss';
`
      : ""
  }
import "@ukic/fonts/dist/fonts.css";
import "@ukic/react/dist/core/core.css";
import "@ukic/react/dist/core/normalize.css";

const ${component}${fileExtension === "tsx" ? `: FC` : ""} = () => {
  ${returnStatement}
${containsReturn ? "" : `\t`}${formattedCodeSnippet}${
    containsReturn ? "" : `\n  );`
  }\n};
export default ${component};`;
};
