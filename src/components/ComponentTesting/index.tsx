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
import TestingStackblitzButton from "../../content/structured/patterns/components/TestingStackblitzButton";
import { useViewportWidth } from "../../utils/helpers";
import "./index.css";
import {
  ComponentTestingProps,
  ActionProps,
  CodeWindowProps,
  ToggleShowProps,
  FileSelectionTabProps,
} from "./types";

const ActionButtons: React.FC<ActionProps> = ({
  longCode,
  showStackblitzBtn,
  isLargeViewport,
  snippetArray
}) => (
  <div className="button-container">
    {showStackblitzBtn && (
      <TestingStackblitzButton codeSnippet={longCode} snippetArray={snippetArray} />
    )}
    <IcButton
      aria-label={isLargeViewport ? "" : "Copy code"}
      variant={isLargeViewport ? "tertiary" : "icon"}
      size={isLargeViewport ? "small" : "default"}
      appearance="dark"
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

const ToggleShowButton: React.FC<ToggleShowProps> = ({
  disableMoreButton,
  showMore,
  setShowMore,
}) => (
  <div className="button-container">
    <IcButton
      variant="tertiary"
      size="small"
      onClick={() => setShowMore(!showMore)}
      appearance="dark"
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
}) => {
  const viewportWidth = useViewportWidth();
  const isLargeViewport: boolean = viewportWidth > 992;
  // eslint-disable-next-line no-undef
  const tabContextRef = useRef<HTMLIcTabContextElement | null>(null);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const tabSelectCallback = (ev: CustomEvent) => {
    setSelectedTab(ev.detail.tabIndex);
    console.log(snippetArray[`${selectedTab}`].disableMoreButton);
    snippetArray[`${selectedTab}`].disableMoreButton && setShowMore(false);
  };

  console.log('STACKBLITZ', showStackblitzBtn)
  return (
    <div className="container">
      <IcTabContext
        onIcTabSelect={tabSelectCallback}
        selectedTabIndex={selectedTab}
        ref={tabContextRef}
      >
        <FileSelectionTab snippetArray={snippetArray} />
        <div className="link-zone snippet-container">
          <ActionButtons
            snippetArray={snippetArray}
            type={type}
            longCode={snippetArray[`${selectedTab}`].snippets.long}
            showMore={showMore}
            setShowMore={setShowMore}
            showStackblitzBtn={showStackblitzBtn}
            isLargeViewport={isLargeViewport}
          />
          <ToggleShowButton
            disableMoreButton={snippetArray[`${selectedTab}`].disableMoreButton}
            showMore={showMore}
            setShowMore={setShowMore}
            isLargeViewport={isLargeViewport}
          />
        </div>
        {snippetArray.map((snippet, index) => (
          <IcTabPanel key={snippet.fileName} tab-position={index}>
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
