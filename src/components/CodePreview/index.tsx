import Highlight, { defaultProps } from "prism-react-renderer";
import React, { useState, useRef, useEffect, RefObject } from "react";
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
import {
  IcButton,
  IcTab,
  IcTabContext,
  IcTabGroup,
  IcTabPanel,
  IcToggleButton,
  IcToggleButtonGroup,
  SlottedSVG,
} from "@ukic/react";
import { IcToggleButtonCustomEvent } from "@ukic/web-components";
import StackblitzButton from "../../content/structured/patterns/components/StackblitzButton";
import { useViewportWidth } from "../../utils/helpers";
import PageMetadataContext from "../../context/PageMetadata";
import "./index.css";
import {
  createReactAppTsx,
  createWebComponentsIndexHTML,
} from "../../content/structured/patterns/components/StackblitzButton/stackblitz-helpers";
import {
  Snippet,
  ComponentPreviewProps,
  CodeSnippetProps,
  CodeWindowProps,
  ToggleShowProps,
  FrameworkTabProps,
} from "./types";
import { useTheme } from "../../context/ThemeContext";

export interface ToggleLanguageProps {
  handleToggle: (
    // eslint-disable-next-line
    ev: IcToggleButtonCustomEvent<{ checked: boolean }>,
    // eslint-disable-next-line
    intendedLanguage: "Typescript" | "Javascript"
  ) => void;
  selectedLanguage: "Typescript" | "Javascript";
  typescriptToggleBtnRef: RefObject<HTMLIcToggleButtonElement>;
  javascriptToggleBtnRef: RefObject<HTMLIcToggleButtonElement>;
  isLargeViewport: boolean;
}

const ActionButtons: React.FC<CodeSnippetProps> = ({
  code,
  longCode,
  isWebComponents,
  showStackblitzBtn,
  projectTitle,
  projectDescription,
  selectedLanguage,
  isLargeViewport,
}) => {
  const { oppositeTheme } = useTheme();
  return (
    <div className="button-container">
      {showStackblitzBtn && projectTitle !== undefined && (
        <StackblitzButton
          codeSnippet={longCode}
          isWebComponents={isWebComponents}
          projectTitle={projectTitle}
          projectDescription={projectDescription}
          isJSX={selectedLanguage === "Javascript"}
        />
      )}
      <IcButton
        aria-label={isLargeViewport ? "" : "Copy code"}
        variant={isLargeViewport ? "tertiary" : "icon"}
        size={isLargeViewport ? "small" : "medium"}
        theme={oppositeTheme}
        monochrome
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
  type,
  show,
  setShow,
  showMore,
  setShowMore,
}) => {
  const { oppositeTheme } = useTheme();
  return (
    <div className="button-container">
      {type === "pattern" && (
        <IcButton
          variant="tertiary"
          size="small"
          onClick={() => setShow(!show)}
          theme={oppositeTheme}
          monochrome
        >
          {!show ? "Show" : "Hide"} code
          <SlottedSVG
            slot="right-icon"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            path={!show ? mdiMenuDown : mdiMenuUp}
          />
        </IcButton>
      )}
      {type !== "pattern" && (
        <IcButton
          variant="tertiary"
          size="small"
          onClick={() => setShowMore(!showMore)}
          theme={oppositeTheme}
          monochrome
        >
          Show {showMore ? "less" : "full "} code
          <SlottedSVG
            slot="right-icon"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            path={showMore ? mdiMenuUp : mdiMenuDown}
          />
        </IcButton>
      )}
    </div>
  );
};

const CodeWindow: React.FC<CodeWindowProps> = ({ code, show, language }) => (
  <div className="code-window">
    {/* eslint-disable jsx-a11y/no-noninteractive-tabindex */}
    {show && (
      <Highlight
        {...defaultProps}
        code={code}
        language={language === "Javascript" ? "jsx" : "tsx"}
        theme={undefined}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={clsx(className, "snippet")}
            style={style}
            tabIndex={0}
          >
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
    {/* eslint-enable jsx-a11y/no-noninteractive-tabindex */}
  </div>
);

const ToggleLanguageButton: React.FC<ToggleLanguageProps> = ({
  handleToggle,
  selectedLanguage,
  typescriptToggleBtnRef,
  javascriptToggleBtnRef,
  isLargeViewport,
}) => (
  <IcToggleButtonGroup
    size="small"
    selectMethod="auto"
    selectType="single"
    variant={isLargeViewport ? "default" : "icon"}
  >
    <IcToggleButton
      label="TypeScript"
      accessibleLabel={isLargeViewport ? "" : "TypeScript"}
      size="small"
      variant={isLargeViewport ? "default" : "icon"}
      checked={selectedLanguage !== "Javascript"}
      onIcToggleChecked={(ev) => handleToggle(ev, "Typescript")}
      ref={typescriptToggleBtnRef}
    >
      <SlottedSVG slot="icon" viewBox="0 0 24 24" width="24" height="24">
        <path d="M3,3H21V21H3V3M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86M13,11.25H8V12.75H9.5V20H11.25V12.75H13V11.25Z" />
      </SlottedSVG>
    </IcToggleButton>
    <IcToggleButton
      size="small"
      label="JavaScript"
      accessibleLabel={isLargeViewport ? "" : "JavaScript"}
      variant={isLargeViewport ? "default" : "icon"}
      checked={selectedLanguage !== "Typescript"}
      onIcToggleChecked={(ev) => handleToggle(ev, "Javascript")}
      ref={javascriptToggleBtnRef}
    >
      <SlottedSVG slot="icon" viewBox="0 0 24 24" width="24" height="24">
        <path d="M3,3H21V21H3V3M7.73,18.04C8.13,18.89 8.92,19.59 10.27,19.59C11.77,19.59 12.8,18.79 12.8,17.04V11.26H11.1V17C11.1,17.86 10.75,18.08 10.2,18.08C9.62,18.08 9.38,17.68 9.11,17.21L7.73,18.04M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86Z" />
      </SlottedSVG>
    </IcToggleButton>
  </IcToggleButtonGroup>
);

const FrameworkTab: React.FC<FrameworkTabProps> = ({ snippets }) => (
  <IcTabGroup inline label="Framework code snippets">
    {snippets.map((snippet, index) => (
      <IcTab key={snippet.technology} tab-position={index}>
        {snippet.technology}
      </IcTab>
    ))}
  </IcTabGroup>
);

const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  snippets,
  children = false,
  left = false,
  noPadding = false,
  centered = true,
  style,
  state = "none",
  showStackblitzBtn = true,
  projectTitle,
  projectDescription,
  type,
}) => {
  const viewportWidth = useViewportWidth();
  const isLargeViewport: boolean = viewportWidth > 992;

  const [tabCount, setTabCount] = useState<number>(2);
  const tabContextRef = useRef<HTMLIcTabContextElement | null>(null);
  const typescriptToggleBtnRef = useRef<HTMLIcToggleButtonElement>(null);
  const javascriptToggleBtnRef = useRef<HTMLIcToggleButtonElement>(null);

  useEffect(() => {
    if (tabContextRef.current) {
      const tabs = tabContextRef.current.querySelectorAll("ic-tab");
      setTabCount(tabs.length);
    }
  }, []);

  // Show/hide functionality for pattern code previews
  const [show, setShow] = useState<boolean>(type !== "pattern");
  // Show more/less functionality for component code previews
  const [showMore, setShowMore] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<"Web component" | "React">(
    tabCount === 1 ? "React" : "Web component"
  );

  const [selectedLanguage, setSelectedLanguage] = useState<
    "Typescript" | "Javascript"
  >("Typescript");

  const tabSelectCallback = (ev: CustomEvent) => {
    setSelectedTab(ev.detail.tabLabel);
  };

  const pageMetadata = React.useContext(PageMetadataContext);

  const getTypeOfProject = (snippet: Snippet) => {
    if (type === "pattern") {
      return " pattern";
    }
    if (snippet.technology === "React") {
      return " component";
    }
    return "";
  };

  const addNewLines = (
    lineSeparatedCode: string[] | undefined,
    reactWhitespace: string | undefined = "",
    longCode: boolean = false
  ) => {
    const newLines = lineSeparatedCode ? [...lineSeparatedCode] : [];
    const findOpeningScriptTagIndex = (lines: string[]) =>
      lines.findIndex((line) => line.trim().startsWith("<script>"));
    const findClosingScriptTagIndex = (lines: string[]) =>
      lines.findIndex((line) => line.trim().startsWith("</script>"));
    // const findBodyIndex = (lines: string[]) =>
    //   lines.findIndex((line) => line.trim().startsWith("<body>")) + 3;
    // const findStyleIndex = (lines: string[]) =>
    //   lines.findIndex((line) => line.trim().startsWith("</style>"));
    const openingScriptTagIndex = findOpeningScriptTagIndex(newLines);
    const closingScriptTagIndex = findClosingScriptTagIndex(newLines);
    // const bodyIndex = findBodyIndex(newLines);
    // const styleIndex = findStyleIndex(newLines);
    // const extraWhitespace = openingScriptTagIndex === -1 && bodyIndex === -1 ? "  " : "";

    let webComponentsWhitespace: string;
    // if (selectedTab === "Web component" && !longCode){
    //   webComponentsWhitespace = webComponentsWhitespace + "  "
    // }
    if (lineSeparatedCode?.includes("</style>")) {
      webComponentsWhitespace = "";
    } else {
      webComponentsWhitespace = "";
    }

    const index = longCode ? 0 : 1;
    if (newLines.length > 0) {
      for (let i = index; i < newLines.length; i += 1) {
        newLines[i] = `${
          selectedTab === "Web component"
            ? `${webComponentsWhitespace}`
            : reactWhitespace
        }${newLines[i]}`;
      }
    }
    // Add extra whitespace for web components
    if (openingScriptTagIndex !== -1) {
      for (
        let i = openingScriptTagIndex;
        i < closingScriptTagIndex + 1;
        i += 1
      ) {
        newLines[i] = ` ${newLines[i]}`;
      }
    }
    // if (openingScriptTagIndex !== -1) {
    //   for (let i = bodyIndex; i < openingScriptTagIndex - 1; i += 1) {
    //     newLines[i] = `   ${newLines[i]}`;
    //   }
    // }
    // need to account for if the code starts with styling as opposed to a tag

    // else if (scriptIndex === -1 && bodyIndex === -1) {
    // }
    return newLines.join("\n");
  };

  const getCodeSnippetForWebComponent = (
    snippet: Snippet,
    shortCodeSnippet: string | undefined
  ) => {
    let longCode = "";
    if (
      !Array.isArray(snippet.snippets.long) &&
      typeof snippet.snippets.long === "string" &&
      !!shortCodeSnippet
    ) {
      const code = snippet.snippets.long.replace(
        "{shortCode}",
        `${addNewLines(shortCodeSnippet?.split("\n"))}`
      );
      if (type === "pattern") {
        longCode = code;
      } else {
        longCode = addNewLines(code.split("\n"), undefined, true);
      }
    }

    let codeSnippet;
    if (showMore) {
      codeSnippet = createWebComponentsIndexHTML(longCode);
    } else if (type === "pattern") {
      if (typeof snippet.snippets.long === "string")
        codeSnippet = createWebComponentsIndexHTML(snippet.snippets.long, true);
    } else {
      codeSnippet = snippet.snippets.short;
    }

    return {
      longCode: createWebComponentsIndexHTML(longCode),
      codeSnippet: codeSnippet || "",
    };
  };

  const getCodeSnippet = (snippet: Snippet) => {
    const isLongCode = showMore || type === "pattern";
    const longCodeIndex = selectedLanguage === "Typescript" ? 0 : 1;
    let shortCodeSnippet: string | undefined = "";
    if (type !== "pattern") shortCodeSnippet = snippet.snippets.short;

    if (selectedTab === "Web component" && snippet.technology !== "React") {
      return getCodeSnippetForWebComponent(snippet, shortCodeSnippet);
    }
    // For React code snippets
    if (Array.isArray(snippet.snippets.long)) {
      let longCode = "";
      if (
        !Array.isArray(snippet.snippets.long[longCodeIndex].snippet) &&
        typeof snippet.snippets.long[longCodeIndex].snippet === "string"
      ) {
        longCode = snippet.snippets.long[longCodeIndex].snippet;
        if (longCode !== "{shortCode}" && !!shortCodeSnippet) {
          const reactShortCodeWhitespace = longCode.includes("return")
            ? "    "
            : "  ";
          shortCodeSnippet = addNewLines(
            shortCodeSnippet.split("\n"),
            reactShortCodeWhitespace
          );
        }
        // Replace {shortCode} variable with the short code snippet
        longCode = longCode.replace("{shortCode}", `${shortCodeSnippet}`);
        if (longCode.includes("return")) {
          longCode = addNewLines(longCode.split("\n"), "  ", true);
        }
        longCode = createReactAppTsx(
          longCode,
          pageMetadata.pageTitle,
          longCodeIndex === 0 ? "tsx" : "jsx"
        );
      }
      return {
        longCode,
        codeSnippet: isLongCode ? longCode : snippet.snippets.short,
      };
    }
    return {
      longCode: "error",
      codeSnippet: "error",
    };
  };

  const handleToggle = (
    ev: IcToggleButtonCustomEvent<{ checked: boolean }>,
    intendedLanguage: "Typescript" | "Javascript"
  ) => {
    const oppositeToggleBtnRef =
      intendedLanguage === "Typescript"
        ? javascriptToggleBtnRef
        : typescriptToggleBtnRef;
    const currentToggleBtnRef =
      intendedLanguage === "Typescript"
        ? typescriptToggleBtnRef
        : javascriptToggleBtnRef;
    if (ev.detail.checked) setSelectedLanguage(intendedLanguage);
    else if (
      !ev.detail.checked &&
      oppositeToggleBtnRef.current &&
      !oppositeToggleBtnRef.current.checked
    ) {
      setSelectedLanguage(intendedLanguage);
      if (!!currentToggleBtnRef && !!currentToggleBtnRef.current) {
        currentToggleBtnRef.current.checked = true;
      }
    }
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
        <IcTabContext
          onIcTabSelect={tabSelectCallback}
          selectedTabIndex={
            selectedTab === "Web component" || tabCount === 1 ? 0 : 1
          }
          ref={tabContextRef}
        >
          <div className="link-zone">
            <FrameworkTab snippets={snippets} />
            <div className="toggle-container">
              {(selectedTab === "React" || tabCount === 1) && (
                <ToggleLanguageButton
                  handleToggle={handleToggle}
                  selectedLanguage={selectedLanguage}
                  typescriptToggleBtnRef={typescriptToggleBtnRef}
                  javascriptToggleBtnRef={javascriptToggleBtnRef}
                  isLargeViewport={isLargeViewport}
                />
              )}
            </div>
          </div>
          <div className="link-zone snippet-container">
            <ActionButtons
              type={type}
              code={
                getCodeSnippet(
                  selectedTab === "Web component"
                    ? snippets[0]
                    : snippets[1] ?? snippets[0]
                )?.codeSnippet || ""
              }
              longCode={
                getCodeSnippet(
                  selectedTab === "Web component"
                    ? snippets[0]
                    : snippets[1] ?? snippets[0]
                )?.longCode || ""
              }
              show={show}
              setShow={setShow}
              showMore={showMore}
              setShowMore={setShowMore}
              showStackblitzBtn={showStackblitzBtn}
              isWebComponents={
                (selectedTab === "Web component"
                  ? snippets[0].technology
                  : (snippets[1] ?? snippets[0]).technology) === "Web component"
              }
              projectTitle={`${
                projectTitle || startCase(pageMetadata.pageTitle)
              } (${
                selectedTab === "Web component"
                  ? snippets[0].technology
                  : (snippets[1] ?? snippets[0]).technology
              }${getTypeOfProject(
                selectedTab === "Web component"
                  ? snippets[0]
                  : snippets[1] ?? snippets[0]
              )})`}
              projectDescription={
                projectDescription === undefined || projectDescription === ""
                  ? undefined
                  : projectDescription
              }
              selectedLanguage={selectedLanguage}
              isLargeViewport={isLargeViewport}
            />
            <ToggleShowButton
              type={type}
              show={show}
              setShow={setShow}
              showMore={showMore}
              setShowMore={setShowMore}
              isLargeViewport={isLargeViewport}
            />
          </div>
          {snippets.map((snippet, index) => (
            <IcTabPanel key={snippet.technology} tab-position={index}>
              <CodeWindow
                code={getCodeSnippet(snippet)?.codeSnippet || ""}
                show={show}
                language={selectedLanguage}
              />
            </IcTabPanel>
          ))}
        </IcTabContext>
      )}
    </div>
  );
};

export default ComponentPreview;
