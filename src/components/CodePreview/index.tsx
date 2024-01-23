import Highlight, { defaultProps } from "prism-react-renderer";
import React, {
  CSSProperties,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import startCase from "lodash.startcase";
import {
  mdiCheckboxMarkedCircle,
  mdiCloseCircle,
  mdiContentCopy,
  mdiMenuDown,
  mdiMenuUp,
} from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import { SlottedSVG } from "@ukic/react";
import StackblitzButton, {
  StackblitzProps,
} from "../../content/structured/patterns/components/StackblitzButton";
import PageMetadataContext from "../../context/PageMetadata";
import "./index.css";
import { useViewportWidth } from "../../utils/helpers";

interface Snippet {
  language: string;
  snippet: string;
}

interface ComponentPreviewProps extends Partial<StackblitzProps> {
  snippets?: Snippet[];
  left?: boolean;
  noPadding?: boolean;
  centered?: boolean;
  children: ReactNode;
  style: CSSProperties;
  state: "none" | "good" | "bad";
  type?: string;
}

interface CodeSnippetProps extends Partial<StackblitzProps> {
  code: string;
  type?: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  showStackblitzBtn?: boolean;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  isWebComponents,
  type,
  show,
  setShow,
  showStackblitzBtn,
  projectTitle,
  projectDescription,
}) => {
  const viewportWidth = useViewportWidth();
  const isLargeViewport: boolean = viewportWidth > 992;

  return (
    <>
      {show && (
        <Highlight
          {...defaultProps}
          code={code}
          language="jsx"
          theme={undefined}
        >
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
      )}
      <div className={clsx(type === "pattern" && type, "snippet-container")}>
        {type === "pattern" && (
          <ic-button
            variant="tertiary"
            size={isLargeViewport ? "small" : "default"}
            appearance="dark"
            onClick={() => setShow(!show)}
          >
            {!show ? "Show" : "Hide"} code
            <SlottedSVG
              slot="right-icon"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              path={!show ? mdiMenuDown : mdiMenuUp}
            />
          </ic-button>
        )}
        <div className="code-actions">
          {showStackblitzBtn && projectTitle !== undefined && (
            <StackblitzButton
              codeSnippet={code}
              isWebComponents={isWebComponents}
              projectTitle={projectTitle}
              projectDescription={projectDescription}
            />
          )}
          <ic-button
            aria-label={isLargeViewport ? "" : "Copy code"}
            variant={isLargeViewport ? "tertiary" : "icon"}
            size={isLargeViewport ? "small" : "default"}
            appearance="dark"
            onClick={() => {
              navigator.clipboard.writeText(code);
              document
                .querySelector<HTMLIcToastElement>("#copy-to-clipboard-toast")
                ?.setVisible();
            }}
          >
            <SlottedSVG
              path={mdiContentCopy}
              slot={isLargeViewport ? "left-icon" : undefined}
              viewBow="0 0 24 24"
              width="24"
              height="24"
            />
            {isLargeViewport && "Copy code"}
          </ic-button>
        </div>
      </div>
    </>
  );
};

const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  snippets,
  children = false,
  left = false,
  noPadding = false,
  centered = true,
  style,
  state = "none",
  projectTitle,
  projectDescription,
  type,
}) => {
  const [show, setShow] = useState<boolean>(type !== "pattern");

  const pageMetadata = React.useContext(PageMetadataContext);

  const getTypeOfProject = (snippet: Snippet) => {
    if (type === "pattern") {
      return " pattern";
    }
    if (snippet.language === "React") {
      return " component";
    }
    return "";
  };

  return (
    <div className="comp-preview">
      <h4 className="offscreen">Interactive example</h4>
      <div
        className={clsx(
          "comp-zone",
          centered && "centered",
          left && "left",
          noPadding && "no-padding",
          !!type && type
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
              <CodeSnippet
                type={type}
                code={snippet.snippet}
                show={show}
                setShow={setShow}
                showStackblitzBtn={
                  !!process.env.GATSBY_GA_TRACKING_ID && type === "pattern"
                }
                isWebComponents={snippet.language === "Web component"}
                projectTitle={`${
                  projectTitle || startCase(pageMetadata.pageTitle)
                } (${snippet.language}${getTypeOfProject(snippet)})`}
                projectDescription={
                  projectDescription === undefined || projectDescription === ""
                    ? undefined
                    : projectDescription
                }
              />
            </ic-tab-panel>
          ))}
        </ic-tab-context>
      )}
    </div>
  );
};

export default ComponentPreview;
