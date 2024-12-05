import React, { FC } from "react";
import { StackBlitzLogo } from "../../../../../assets/svg";
import { useViewportWidth } from "../../../../../utils/helpers";
import { useTheme } from "../../../../../context/ThemeContext";

export interface Snippet {
  fileName: string;
  disableMoreButton: boolean;
  snippets: {
    short?: string;
    long: string;
  };
}

export type StackblitzButtonTestAppProps = {
  test?: string;
  title?: string;
  branch?: string;
};

const StackblitzButtonTestApp: FC<StackblitzButtonTestAppProps> = ({
  test,
  title,
  branch,
}) => {
  const { oppositeTheme } = useTheme();
  const viewportWidth = useViewportWidth();
  const isLargeViewport: boolean = viewportWidth > 992;

  const createStackblitzProject = () => {
    const url = "https://stackblitz.com/github/mi6/ui-kit-test-app";
    const branchName = `${branch}`;
    const projectTitle = `?title='${title}'`;
    const startScript = `&startScript=${test}`;
    window.open(url + branchName + projectTitle + startScript);
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

export default StackblitzButtonTestApp;
