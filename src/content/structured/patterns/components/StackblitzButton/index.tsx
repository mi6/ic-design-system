import React, { useEffect, useState } from "react";
import sdk from "@stackblitz/sdk";
import kebabCase from "lodash.kebabcase";
import { graphql, useStaticQuery } from "gatsby";
import {
  createIndexTsx,
  createReactAppTsx,
  createReactHTML,
  createWebComponentsIndexHTML,
  packageJson,
  reactCodeSnippetCSS,
  tsConfig,
  viteConfig,
  webComponentsCodeSnippetCSS,
} from "./stackblitz-helpers";
import { StackblitzLogo } from "../../../../../assets/svg";
import { debounce } from "../../../../../utils/helpers";

export type StackblitzProps = {
  codeSnippet?: string;
  isWebComponents?: boolean;
  projectTitle: string;
  projectDescription?: string;
};

const StackblitzButton: React.FC<StackblitzProps> = ({
  codeSnippet,
  isWebComponents,
  projectTitle,
  projectDescription,
}) => {
  let defaultViewportWidth = 0;

  if (typeof window !== "undefined") {
    defaultViewportWidth = window.innerWidth;
  }

  const [viewportWidth, setViewportWidth] =
    useState<number>(defaultViewportWidth);

  const isLargeViewport: boolean = viewportWidth > 992;

  useEffect(() => {
    const handleResize = debounce(() => setViewportWidth(window.innerWidth));

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const data = useStaticQuery(graphql`
    query {
      allPatternsTemplates {
        nodes {
          internal {
            content
            contentFilePath
          }
        }
      }
    }
  `);

  const createStackblitzProject = () => {
    const files: { [key: string]: string } = {};
    const isPattern: boolean = projectTitle.includes(" pattern)");
    const isWebComponentsInternal: boolean =
      isWebComponents !== undefined ? isWebComponents : true;
    const isJSX: boolean = true;
    // Add functionality to manage whether Stackblitz project should use TypeScript or JavaScript
    const ext = isJSX ? "jsx" : "tsx";

    if (codeSnippet !== undefined && codeSnippet !== "") {
      if (isPattern) {
        const match = projectTitle.match(/(?:with)|\(/);
        const cssFileName = kebabCase(
          !match ? projectTitle : projectTitle.slice(0, match.index)
        );

        data.allPatternsTemplates.nodes
          .filter(
            (node: { internal: { contentFilePath: string } }) =>
              node.internal.contentFilePath.includes(cssFileName) &&
              node.internal.contentFilePath.includes(
                isWebComponents ? "web-components" : "react"
              )
          )
          .forEach(
            (node: {
              internal: { contentFilePath: string; content: string };
            }) => {
              if (node.internal.contentFilePath.endsWith(".css")) {
                files[`${!isWebComponents ? "src/" : ""}index.css`] =
                  node.internal.content;
              }
            }
          );
      }
      if (isWebComponents) {
        files[`index.html`] = createWebComponentsIndexHTML(codeSnippet);
        if (!isPattern) {
          files[`index.css`] = webComponentsCodeSnippetCSS;
        }
      } else {
        files[`src/index.${ext}`] = createReactAppTsx(
          codeSnippet,
          projectTitle,
          ext,
          isPattern
        );
        if (!isPattern) {
          files[`src/index.css`] = reactCodeSnippetCSS;
        }
      }
    }

    // Define the index.tsx content for a React app
    const indexTsx = createIndexTsx(projectTitle, true);

    // Change file structure for React code examples
    if (
      (isWebComponents !== undefined && !isWebComponents) ||
      !isWebComponentsInternal
    ) {
      files[`src/app.${ext}`] = files[`src/index.${ext}`];
      files[`src/index.${ext}`] = indexTsx;
      files[`index.html`] = createReactHTML(ext);
      files["vite.config.js"] = viteConfig;
      if (ext === "tsx") {
        files["tsconfig.json"] = tsConfig;
      }
    }

    files["package.json"] = JSON.stringify(
      packageJson(projectTitle, isWebComponentsInternal, ext),
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
      }
    );
  };

  return (
    <ic-button
      aria-label="Open code example in Stackblitz"
      size={isLargeViewport ? "small" : "default"}
      variant={isLargeViewport ? "tertiary" : "icon"}
      appearance="dark"
      onClick={() => createStackblitzProject()}
    >
      {isLargeViewport && (
        <>
          <span slot="left-icon">
            <StackblitzLogo />
          </span>
          Stackblitz
        </>
      )}
      {!isLargeViewport && <StackblitzLogo />}
    </ic-button>
  );
};

export default StackblitzButton;
