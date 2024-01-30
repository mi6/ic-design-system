import kebabCase from "lodash.kebabcase";
import startCase from "lodash.startcase";

const designSystemPackageJson = require("../../../../../../package.json");

export const createIndexTsx = (
  componentName: string,
  isCodeSnippet?: boolean
) => {
  const component = isCodeSnippet
    ? startCase(componentName.replace(/\(.*?\)/g, "")).replace(/\s/g, "")
    : componentName;
  return `import { StrictMode } from 'react';
        import { createRoot } from 'react-dom/client';
        import { BrowserRouter } from 'react-router-dom';
  
        import ${component} from './app';
  
        const root = createRoot(document.getElementById('root'));
  
        root.render(
        <StrictMode>
            <BrowserRouter>
              <${component} />
            </BrowserRouter>
        </StrictMode>
      );`;
};

export const createReactIndexHTML = (ext: string) => `<html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React + TS</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/src/index.${ext}"></script>
      </body>
    </html>`;

export const packageJson = (
  projectTitle: string,
  isWebComponents: boolean,
  fileExtension: "jsx" | "tsx"
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
          `${designSystemPackageJson.dependencies["@ukic/react"]}`,
        ],
        ["react", "^18.2.0"],
        ["react-dom", "^18.2.0"],
        ["react-jss", "^10.10.0"],
        ["react-router-dom", "^6.22.0"],
      ];

  if (fileExtension === "tsx") {
    dependenciesArray.splice(3, 0, [
      "@ukic/web-components",
      `${designSystemPackageJson.dependencies["@ukic/web-components"]}`,
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
  codeSnippet: string
) => `<html lang="en">
  <head>
    <title>Home</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="stylesheet" href="index.css" />
  </head>
  <style>
    @import url("https://unpkg.com/@ukic/fonts/dist/fonts.css");
    @import url("https://unpkg.com/@ukic/web-components/dist/core/core.css");
    @import url("https://unpkg.com/@ukic/web-components/dist/core/normalize.css");
  </style>
  <body>
    ${codeSnippet}
    <script defer>
      import('https://unpkg.com/@ukic/web-components/loader').then((module) => {
        module.defineCustomElements();
      });
      // The ICDS has types available if your JavaScript framework allows for use with Typescript
      // Below is an example of how to import an ICDS type
      // import type { IcAlignment } from 'https://unpkg.com/@ukic/web-components/';
    </script>
  </body>
</html>
  `;

export const createReactAppTsx = (
  codeSnippet: string,
  componentName: string,
  fileExtension: "jsx" | "tsx",
  isPattern: boolean = false
): string => {
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
      regex = /(?!(<|<\/|\.))\bIc[A-Za-z]+/g;
    } else {
      regex = new RegExp(`<${tag}[^>]*>`, "g");
    }

    return isPatternInternal
      ? codeSnippet.match(regex) || []
      : (codeSnippet.match(regex) || []).map((match) =>
          match
            .slice(isPatternInternal ? 0 : 1, match.indexOf(isMDI ? "}" : " "))
            .trim()
        );
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
  const component = startCase(componentName.replace(/\(.*?\)/g, "")).replace(
    /\s/g,
    ""
  );
  let getIcTypes: string[] = [];
  if (isPattern) {
    const allIcMatches = getImports(undefined, false, true);
    const allIcComponents = getImports("Ic");
    getIcTypes = allIcMatches
      .filter((item: string) => !allIcComponents.includes(item))
      .concat(
        allIcComponents.filter((item: string) => !allIcMatches.includes(item))
      )
      .sort();
  }

  // Check if codeSnippet contains "return(" or "return ("
  const containsReturn = /return\s*\(/g.test(codeSnippet);

  // Check if codeSnippet contains "createUseStyles" from 'react-jss'
  const containsCreateUseStyles = /createUseStyles\(\{/.test(codeSnippet);

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

  // Conditionally render "return(" in the returned output string
  const returnStatement = containsReturn ? "" : "return(";

  let importedICDSComponents;
  if (sortedICDSComponents.length > 3) {
    importedICDSComponents = `
  ${sortedICDSComponents.join(",\n  ")}\n`;
  } else {
    importedICDSComponents = `${sortedICDSComponents.join(", ")} `;
  }

  return `${reactImportStatement}
import { ${importedICDSComponents}} from '@ukic/react';
${
  fileExtension === "tsx" && isPattern && getIcTypes.length > 0
    ? `import type { ${getIcTypes.join(", ")} } from '@ukic/web-components';`
    : ""
}
${
  sortedMDIcons.length > 0
    ? `import { ${sortedMDIcons.join(", ")} } from '@mdi/js';`
    : ""
}
${
  containsCreateUseStyles
    ? `import { createUseStyles } from 'react-jss';
`
    : ""
}
import "@ukic/fonts/dist/fonts.css";
import "@ukic/react/dist/core/core.css";
import "@ukic/react/dist/core/normalize.css";

const ${component}${fileExtension === "tsx" ? `: FC` : ""} = () => {
    ${returnStatement}
      ${codeSnippet}
    ${containsReturn ? "" : ")"}};
export default ${component};`;
};
