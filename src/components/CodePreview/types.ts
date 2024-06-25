import React, {
  CSSProperties,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { IcToggleButtonCustomEvent } from "@ukic/web-components";
import { StackblitzProps } from "../../content/structured/patterns/components/StackblitzButton";
import "./index.css";

export interface LongCodeSnippet {
  language: "jsx" | "tsx";
  snippet: string;
}

export interface Snippet {
  technology: string;
  snippets: {
    short?: string | undefined;
    long: string | LongCodeSnippet[];
  };
}

export interface ComponentPreviewProps extends Partial<StackblitzProps> {
  snippets?: Snippet[];
  left?: boolean;
  noPadding?: boolean;
  centered?: boolean;
  children: ReactNode;
  style: CSSProperties;
  state: "none" | "good" | "bad";
  showStackblitzBtn: boolean;
  type?: string;
}

export interface CodeSnippetProps extends Partial<StackblitzProps> {
  code: string;
  longCode: string;
  type?: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  showMore: boolean;
  setShowMore: Dispatch<SetStateAction<boolean>>;
  showStackblitzBtn?: boolean;
  selectedLanguage: "Typescript" | "Javascript";
  isLargeViewport: boolean;
}

export interface ToggleShowProps {
  type?: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  showMore: boolean;
  setShowMore: Dispatch<SetStateAction<boolean>>;
  isLargeViewport: boolean;
}

export interface CodeWindowProps {
  code: string;
  show: boolean;
}

// Needed to stop lint errors
interface HTMLIcToggleButtonElement extends HTMLElement {
  checked: boolean;
}

export interface ToggleLanguageProps {
  handleToggle: (
    // eslint-disable-next-line
    ev: IcToggleButtonCustomEvent<{ checked: boolean }>,
    // eslint-disable-next-line
    intendedLanguage: "Typescript" | "Javascript"
  ) => void;
  selectedLanguage: "Typescript" | "Javascript";
  typescriptToggleBtnRef: React.RefObject<HTMLIcToggleButtonElement>;
  javascriptToggleBtnRef: React.RefObject<HTMLIcToggleButtonElement>;
  isLargeViewport: boolean;
}

export interface FrameworkTabProps {
  snippets: Snippet[];
}
