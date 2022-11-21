import Highlight, { defaultProps } from "prism-react-renderer";
import {
  IcButton,
  IcTab,
  IcTabContext,
  IcTabGroup,
  IcTabPanel,
} from "@ukic/react";
import React, { CSSProperties, ReactNode } from "react";

import {
  mdiCheckboxMarkedCircle,
  mdiCloseCircle,
  mdiContentCopy,
} from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import SlottedSVG from "../SlottedSVG";

import "./index.css";

interface Snippet {
  language: string;
  snippet: string;
}

interface ComponentPreviewProps {
  snippets?: Snippet[];
  left?: boolean;
  noPadding?: boolean;
  centered?: boolean;
  children: ReactNode;
  style: CSSProperties;
  state: "none" | "good" | "bad";
}

const CodeSnippet: React.FC<{ code: string }> = ({ code }) => (
  <>
    <Highlight {...defaultProps} code={code} language="tsx" theme={undefined}>
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
    <div className="snippet-container">
      <IcButton
        variant="tertiary"
        appearance="dark"
        onClick={() => navigator.clipboard.writeText(code)}
        className="copy-button"
      >
        Copy code
        <SlottedSVG path={mdiContentCopy} slot="icon" />
      </IcButton>
    </div>
  </>
);

const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  snippets,
  children = false,
  left = false,
  noPadding = false,
  centered = true,
  style,
  state = "none",
}) => (
  <div className="comp-preview">
    <h3 className="offscreen">Interactive example</h3>
    <div
      className={clsx(
        "comp-zone",
        centered && "centered",
        left && "left",
        noPadding && "no-padding"
      )}
      style={style}
    >
      {(state === "good" && (
        <Icon
          path={mdiCheckboxMarkedCircle}
          size="36px"
          className={clsx("comp-icon", "comp-do-icon")}
          aria-hidden="true"
        />
      )) ||
        (state === "bad" && (
          <Icon
            path={mdiCloseCircle}
            size="36px"
            className={clsx("comp-icon", "comp-dont-icon")}
            aria-hidden="true"
          />
        ))}
      {children}
    </div>
    {snippets && (
      <IcTabContext className="tab-context">
        <div className="link-zone">
          <IcTabGroup inline label="Framework code snippets">
            {snippets.map((snippet) => (
              <IcTab>{snippet.language}</IcTab>
            ))}
          </IcTabGroup>
        </div>
        {snippets.map((snippet) => (
          <IcTabPanel className="tab-panel">
            <CodeSnippet code={snippet.snippet} />
          </IcTabPanel>
        ))}
      </IcTabContext>
    )}
  </div>
);

export default ComponentPreview;
