import Highlight, { defaultProps } from "prism-react-renderer";
import React, { useState, useRef } from "react";
import { mdiContentCopy, mdiMenuDown, mdiMenuUp } from "@mdi/js";
import clsx from "clsx";
import {
  IcButton,
  SlottedSVG,
  IcTabContext,
  IcTabGroup,
  IcTabPanel,
  IcTab,
} from "@ukic/react";
import TestingStackblitzButton from "../../content/structured/patterns/components/StackBlitzButtonTestApp";
import { useViewportWidth } from "../../utils/helpers";
import "./index.css";
import {
  ComponentTestingProps,
  ActionProps,
  CodeWindowProps,
  ToggleShowProps,
  FileSelectionTabProps,
} from "./types";
import { useTheme } from "../../context/ThemeContext";

const ActionButtons: React.FC<ActionProps> = ({
  longCode,
  showStackblitzBtn,
  stackblitzButtonTestAppProps,
  isLargeViewport,
}) => {
  const { theme } = useTheme();
  return (
    <div className="button-container">
      {showStackblitzBtn && stackblitzButtonTestAppProps && (
        <TestingStackblitzButton
          test={stackblitzButtonTestAppProps.test}
          title={stackblitzButtonTestAppProps.title}
          branch={stackblitzButtonTestAppProps.branch}
        />
      )}
      <IcButton
        aria-label={isLargeViewport ? "" : "Copy code"}
        variant={isLargeViewport ? "tertiary" : "icon"}
        size={isLargeViewport ? "small" : "medium"}
        theme={theme}
        monochrome
        onClick={() => {
          navigator.clipboard.writeText(longCode);
          document
            // eslint-disable-next-line no-undef
            .querySelector<HTMLIcToastElement>("#copy-to-clipboard-toast")
            ?.setVisible();
        }}
      >
        <SlottedSVG
          path={mdiContentCopy}
          slot={isLargeViewport ? "left-icon" : undefined}
          viewBox="0 0 24 24"
          width="24"
          height="24"
        />
        {isLargeViewport && "Copy code"}
      </IcButton>
    </div>
  );
};

const ToggleShowButton: React.FC<ToggleShowProps> = ({
  disableMoreButton,
  showMore,
  setShowMore,
}) => {
  const { theme } = useTheme();
  return (
    <div className="button-container">
      <IcButton
        variant="tertiary"
        size="small"
        onClick={() => setShowMore(!showMore)}
        theme={theme}
        monochrome
        disabled={disableMoreButton}
      >
        Show {showMore && !disableMoreButton ? "less" : "full "} code
        <SlottedSVG
          slot="right-icon"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          path={showMore && !disableMoreButton ? mdiMenuUp : mdiMenuDown}
        />
      </IcButton>
    </div>
  );
};

const CodeWindow: React.FC<CodeWindowProps> = ({ code }) => (
  <div>
    <Highlight {...defaultProps} code={code} language="jsx" theme={undefined}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={clsx(className, "snippet")} style={style}>
          <code>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  </div>
);

const FileSelectionTab: React.FC<FileSelectionTabProps> = ({
  snippetArray,
}) => (
  <IcTabGroup inline label="File code snippets">
    {snippetArray.map((snippet, index) => (
      <IcTab key={snippet.fileName} tab-position={index}>
        {snippet.fileName}
      </IcTab>
    ))}
  </IcTabGroup>
);

const ComponentTesting: React.FC<ComponentTestingProps> = ({
  showStackblitzBtn,
  type,
  snippetArray,
  stackblitzButtonTestAppProps,
}) => {
  const viewportWidth = useViewportWidth();
  const isLargeViewport: boolean = viewportWidth > 992;
  // eslint-disable-next-line no-undef
  const tabContextRef = useRef<HTMLIcTabContextElement | null>(null);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const tabSelectCallback = (ev: CustomEvent) => {
    setSelectedTab(ev.detail.tabIndex);
    if (snippetArray[`${selectedTab}`].disableMoreButton) {
      setShowMore(false);
    }
  };

  return (
    <div className="wrapper">
      <IcTabContext
        onIcTabSelect={tabSelectCallback}
        selectedTabIndex={selectedTab}
        ref={tabContextRef}
      >
        <FileSelectionTab snippetArray={snippetArray} />
        <div className="link-zone snippet-container">
          <ActionButtons
            stackblitzButtonTestAppProps={stackblitzButtonTestAppProps}
            type={type}
            longCode={snippetArray[`${selectedTab}`].snippets.long}
            showMore={showMore}
            setShowMore={setShowMore}
            showStackblitzBtn={showStackblitzBtn}
            isLargeViewport={isLargeViewport}
          />
          <ToggleShowButton
            disableMoreButton={snippetArray[selectedTab].disableMoreButton}
            showMore={showMore}
            setShowMore={setShowMore}
            isLargeViewport={isLargeViewport}
          />
        </div>
        {snippetArray.map((snippet, index) => (
          <IcTabPanel
            className="component-testing-panel"
            key={snippet.fileName}
            tab-position={index}
          >
            <CodeWindow
              code={
                showMore
                  ? snippet.snippets.long || ""
                  : snippet.snippets.short || ""
              }
            />
          </IcTabPanel>
        ))}
      </IcTabContext>
    </div>
  );
};

export default ComponentTesting;
