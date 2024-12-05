import React, { FC } from "react";
import sdk from "@stackblitz/sdk";
import {
  createIndexTsx,
  createReactIndexHTML,
  createWebComponentsIndexHTML,
  packageJson,
  tsConfig,
  viteConfig,
} from "./stackblitz-helpers";
import { StackBlitzLogo } from "../../../../../assets/svg";
import { useViewportWidth } from "../../../../../utils/helpers";
import { useTheme } from "../../../../../context/ThemeContext";

export type StackblitzProps = {
  codeSnippet?: string;
  isWebComponents?: boolean;
  projectTitle: string;
  projectDescription?: string;
  isJSX?: boolean;
};

const StackblitzButton: FC<StackblitzProps> = ({
  codeSnippet,
  isWebComponents,
  projectTitle,
  projectDescription,
  isJSX = true,
}) => {
  const { oppositeTheme } = useTheme();
  const viewportWidth = useViewportWidth();
  const isLargeViewport: boolean = viewportWidth > 992;

  const createStackblitzProject = () => {
    const files: { [key: string]: string } = {};
    const isWebComponentsInternal: boolean =
      isWebComponents !== undefined ? isWebComponents : true;
    // Add functionality to manage whether Stackblitz project should use TypeScript or JavaScript
    const ext = isJSX ? "jsx" : "tsx";

    if (codeSnippet !== undefined && codeSnippet !== "") {
      if (isWebComponents) {
        files[`index.html`] = projectTitle.includes("pattern")
          ? codeSnippet
          : createWebComponentsIndexHTML(codeSnippet);
      } else {
        files[`src/index.${ext}`] = codeSnippet;
      }
    }

    // Define the index.tsx content for a React app
    const indexTsx = createIndexTsx(projectTitle, true, codeSnippet);

    // Change file structure for React code examples
    if (
      (isWebComponents !== undefined && !isWebComponents) ||
      !isWebComponentsInternal
    ) {
      files[`src/app.${ext}`] = files[`src/index.${ext}`];
      files[`src/index.${ext}`] = indexTsx;
      files[`index.html`] = createReactIndexHTML(ext);
      files["vite.config.js"] = viteConfig;
      if (ext === "tsx") {
        files["tsconfig.json"] = tsConfig;
      }
    }

    files["package.json"] = JSON.stringify(
      packageJson(projectTitle, isWebComponentsInternal, ext, codeSnippet),
      null,
      2
    );

    const description =
      projectDescription === undefined || projectDescription === ""
        ? ""
        : projectDescription;

    sdk.openProject(
      {
        title: `ICDS ${projectTitle}`,
        description,
        files,
        template: "node",
      },
      {
        openFile: isWebComponentsInternal ? [`index.html`] : [`src/app.${ext}`],
        hideExplorer: true,
      }
    );
  };

  return (
    <ic-button
      aria-label="Open code example in StackBlitz"
      size={isLargeViewport ? "small" : "medium"}
      variant={isLargeViewport ? "tertiary" : "icon"}
      theme={oppositeTheme}
      monochrome
      onClick={() => createStackblitzProject()}
    >
      {isLargeViewport && (
        <>
          <span slot="left-icon">
            <StackBlitzLogo />
          </span>
          StackBlitz
        </>
      )}
      {!isLargeViewport && <StackBlitzLogo />}
    </ic-button>
  );
};

export default StackblitzButton;
