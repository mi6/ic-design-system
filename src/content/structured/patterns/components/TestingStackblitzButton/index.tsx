import React, { FC } from "react";
import sdk from "@stackblitz/sdk";
import {
  createAppTsx,
  createIndexTsx,
  createReactIndexHTML,
  createAppCss,
  packageJson,
  tsConfig,
  viteConfig,
  createIndexCss,
  jestConfig,
  babelConfig,
  lintConfig,
} from "./testing-stackblitz-helpers";
import { StackBlitzLogo } from "../../../../../assets/svg";
import { useViewportWidth } from "../../../../../utils/helpers";

export interface Snippet {
  fileName: string;
  disableMoreButton: boolean;
  snippets: {
    short?: string;
    long: string;
  };
}

export type TestingStackblitzProps = {
  snippetArray: Snippet[];

};

const TestingStackblitzButton: FC<TestingStackblitzProps> = ({
  snippetArray
}) => {
  const viewportWidth = useViewportWidth();
  const isLargeViewport: boolean = viewportWidth > 992;
  const projectTitle = "jest-testing";

  const createStackblitzProject = () => {
    const files: { [key: string]: string } = {};
    const ext = "tsx";

    files[`src/App.${ext}`] = createAppTsx()
    files[`src/App.css`] = createAppCss()
    files[`src/index.${ext}`] = createIndexTsx();
    files[`src/index.css`] = createIndexCss(true);
    files[`index.html`] = createReactIndexHTML();
    files["vite.config.js"] = viteConfig;
    files["jest.config.ts"] = jestConfig;
    files["babel.config.cjs"] = babelConfig;
    files["tsconfig.json"] = tsConfig;
    files[".eslintrc.cjs"] = lintConfig;
    files[`src/components/Subscription/constants.ts`] = snippetArray[3].snippets.long;
    files[`src/components/Subscription/index.css`] = createIndexCss(false);
    files[`src/components/Subscription/methods.tsx`] = snippetArray[4].snippets.long;
    files[`src/components/Subscription/Subscription.tsx`] = snippetArray[1].snippets.long;
    files[`src/components/Subscription/types.ts`] = snippetArray[2].snippets.long;
    files[`src/components/Subscription/__tests__/Subscription.test.tsx`] = snippetArray[0].snippets.long;
    files["package.json"] = JSON.stringify(
      packageJson(),
      null,
      2
    );
    
    const description = `This is an example of testing ICDS components with Jest and React Testing Library.`;

    sdk.openProject(
      {
        title: `ICDS-${projectTitle}`,
        description,
        files,
        template: "node",
      },
      {
        openFile: `src/components/Subscription/__tests__/Subscription.test.tsx`,
        hideExplorer: true,
      }
    );
  };

  return (
    <ic-button
      aria-label="Open code example in StackBlitz"
      size={isLargeViewport ? "small" : "default"}
      variant={isLargeViewport ? "tertiary" : "icon"}
      appearance="dark"
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

export default TestingStackblitzButton;
