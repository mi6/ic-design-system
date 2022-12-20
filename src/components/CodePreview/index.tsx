import Highlight, { defaultProps } from "prism-react-renderer";
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
      <ic-button
        variant="tertiary"
        appearance="dark"
        onClick={() => navigator.clipboard.writeText(code)}
      >
        Copy code
        <SlottedSVG path={mdiContentCopy} slot="icon" />
      </ic-button>
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
      <ic-tab-context>
        <div className="link-zone">
          <ic-tab-group inline label="Framework code snippets">
            {snippets.map((snippet, index) => (
              <ic-tab tab-position={index}>{snippet.language}</ic-tab>
            ))}
          </ic-tab-group>
        </div>
        {snippets.map((snippet, index) => (
          <ic-tab-panel tab-position={index}>
            <CodeSnippet code={snippet.snippet} />
          </ic-tab-panel>
        ))}
      </ic-tab-context>
    )}
  </div>
);

export default ComponentPreview;
