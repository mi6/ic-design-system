import Highlight, { defaultProps } from "prism-react-renderer";
import React, {
  useState,
  useRef,
  useEffect,
  RefObject,
  useContext,
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
import CookieConsentContext from "../../context/CookieConsentContext";

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
  const { theme } = useTheme();
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
        theme={theme}
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
  const { theme } = useTheme();
  return (
    <div className="button-container">
      {type === "pattern" && (
        <IcButton
          variant="tertiary"
          size="small"
          onClick={() => setShow(!show)}
          theme={theme}
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
          monochrome
          theme={theme}
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
  <div>
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
  const webComponentTabPanelRef = useRef<HTMLIcTabPanelElement | null>(null);
  const reactTabPanelRef = useRef<HTMLIcTabPanelElement | null>(null);
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
  const [codeHeight, setCodeHeight] = useState<string>("auto");

  const tabSelectCallback = (ev: CustomEvent) => {
    setSelectedTab(ev.detail.tabLabel);
    if (isLocalStorageEnabled()) {
      localStorage.setItem("selectedTab", ev.detail.tabLabel);
    }

    const event = new CustomEvent("tabSelectionChanged", {
      detail: { selectedTab: ev.detail.tabLabel },
    });
    window.dispatchEvent(event);
  };

  const updateCodeWindowHeight = (delay: number) =>
    // Make web component and React code examples same height
    // to prevent page movement while switching
    setTimeout(() => {
      if (webComponentTabPanelRef.current && reactTabPanelRef.current) {
        setCodeHeight("auto"); // Reset height for measurement
        setCodeHeight(
          `${Math.min(
            webComponentTabPanelRef.current?.offsetHeight,
            reactTabPanelRef.current?.offsetHeight
          )}px`
        );
      }
    }, delay);

  useEffect(() => {
    const codeHeightTimeout = updateCodeWindowHeight(0);
    return () => clearTimeout(codeHeightTimeout);
  }, [selectedTab, selectedLanguage, show, showMore]);

  useEffect(() => {
    if (isLocalStorageEnabled()) {
      const storedTab = localStorage.getItem("selectedTab");
      if (storedTab) {
        setSelectedTab(storedTab as "Web component" | "React");
      }
    }

    const handleTabSelectionChange = (event: CustomEvent) => {
      setSelectedTab(event.detail.selectedTab);
    };

    window.addEventListener("tabSelectionChanged", handleTabSelectionChange);

    // Wait on first load to ensure tab panels are rendered before updating their height
    const codeHeightTimeout = updateCodeWindowHeight(300);

    return () => {
      window.removeEventListener(
        "tabSelectionChanged",
        handleTabSelectionChange
      );
      clearTimeout(codeHeightTimeout);
    };
  }, []);

  useEffect(() => {
    if (isLocalStorageEnabled()) {
      const storedLanguage = localStorage.getItem("selectedLanguage");
      if (storedLanguage) {
        setSelectedLanguage(storedLanguage as "Typescript" | "Javascript");
      }
    }

    const handleLanguageSelectionChange = (event: CustomEvent) => {
      setSelectedLanguage(event.detail.selectedLanguage);
    };

    window.addEventListener(
      "languageSelectionChanged",
      handleLanguageSelectionChange
    );

    return () => {
      window.removeEventListener(
        "languageSelectionChanged",
        handleLanguageSelectionChange
      );
    };
  }, []);

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
    lineSeparatedCode?: string[],
    reactWhitespace = "",
    longCode = false
  ) => {
    const newLines = lineSeparatedCode ? [...lineSeparatedCode] : [];
    const openingScriptTagIndex = newLines.findIndex((line) =>
      line.trim().startsWith("<script>")
    );

    if (newLines.length > 0) {
      for (let i = longCode ? 0 : 1; i < newLines.length; i += 1) {
        newLines[i] = `${
          selectedTab === "Web component" ? "" : reactWhitespace
        }${newLines[i]}`;
      }
    }
    // Add extra whitespace for web components
    if (openingScriptTagIndex !== -1) {
      for (
        let i = openingScriptTagIndex;
        i <
        newLines.findIndex((line) => line.trim().startsWith("</script>")) + 1;
        i += 1
      ) {
        newLines[i] = ` ${newLines[i]}`;
      }
    }
    return newLines.join("\n");
  };

  const getCodeSnippetForWebComponent = (
    snippet: Snippet,
    shortCodeSnippet?: string
  ) => {
    let longCode = "";
    if (
      !Array.isArray(snippet.snippets.long) &&
      typeof snippet.snippets.long === "string"
    ) {
      const code = snippet.snippets.long.replace(
        "{shortCode}",
        `${addNewLines(shortCodeSnippet?.split("\n"))}`
      );
      longCode =
        type === "pattern"
          ? code
          : addNewLines(code.split("\n"), undefined, true);
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
    const longCodeIndex = selectedLanguage === "Typescript" ? 0 : 1;
    let shortCodeSnippet = type !== "pattern" ? snippet.snippets.short : "";

    if (snippet.technology !== "React")
      return getCodeSnippetForWebComponent(snippet, shortCodeSnippet);

    // For React code snippets
    if (!Array.isArray(snippet.snippets.long))
      return {
        longCode: "error",
        codeSnippet: "error",
      };

    let longCode = "";
    const longCodeSnippet = snippet.snippets.long[longCodeIndex].snippet;
    if (
      !Array.isArray(longCodeSnippet) &&
      typeof longCodeSnippet === "string"
    ) {
      longCode = longCodeSnippet;
      if (longCode !== "{shortCode}" && !!shortCodeSnippet) {
        shortCodeSnippet = addNewLines(
          shortCodeSnippet.split("\n"),
          longCode.includes("return") ? "    " : "  "
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
      codeSnippet:
        showMore || type === "pattern" ? longCode : snippet.snippets.short,
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

    if (isLocalStorageEnabled()) {
      localStorage.setItem("selectedLanguage", intendedLanguage);
    }
    const event = new CustomEvent("languageSelectionChanged", {
      detail: { selectedLanguage: intendedLanguage },
    });
    window.dispatchEvent(event);
  };

  const { localStorageConsent } = useContext(CookieConsentContext);

  const isLocalStorageEnabled = () => localStorageConsent;

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
            <IcTabPanel
              ref={
                snippet.technology === "Web component"
                  ? webComponentTabPanelRef
                  : reactTabPanelRef
              }
              className={clsx(
                "code-tab-panel",
                snippet.technology !== selectedTab && tabCount === 2 && "hidden"
              )}
              key={snippet.technology}
              tab-position={index}
              style={{ height: codeHeight }}
            >
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
