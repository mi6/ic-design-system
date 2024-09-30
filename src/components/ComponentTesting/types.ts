import { CSSProperties, ReactNode, Dispatch, SetStateAction } from "react";
import { StackblitzProps } from "../../content/structured/patterns/components/StackblitzButton";
import "./index.css";

export interface LongCodeSnippet {
  language: "jsx" | "tsx";
  snippet: string;
}

export interface Snippet {
  fileName: string;
  disableMoreButton: boolean;
  snippets: {
    short?: string;
    long: string;
  };
}

export interface ComponentTestingProps extends Partial<StackblitzProps> {
  snippetArray: Snippet[];
  left?: boolean;
  noPadding?: boolean;
  centered?: boolean;
  children: ReactNode;
  style: CSSProperties;
  showStackblitzBtn: boolean;
  stackblitzButtonTestAppProps?: StackblitzButtonTestAppProps;
  type?: string;
}

export interface StackblitzButtonTestAppProps {
  test?: string;
  title?: string;
  branch?: string;
}

export interface ActionProps extends Partial<StackblitzProps> {
  longCode: string;
  type?: string;
  showMore: boolean;
  setShowMore: Dispatch<SetStateAction<boolean>>;
  showStackblitzBtn?: boolean;
  stackblitzButtonTestAppProps?: StackblitzButtonTestAppProps;
  isLargeViewport: boolean;
}

export interface ToggleShowProps {
  disableMoreButton: boolean;
  showMore: boolean;
  setShowMore: Dispatch<SetStateAction<boolean>>;
  isLargeViewport: boolean;
}

export interface CodeWindowProps {
  code: string;
}

export interface FileSelectionTabProps {
  snippetArray: Snippet[];
}
