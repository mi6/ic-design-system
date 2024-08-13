/* eslint-disable  */
// This is a workaround to include type-safe stencil web components
// with TSX https://github.com/ionic-team/stencil/issues/1636
import { JSX as LocalJSX } from "@ukic/web-components";
import { JSX as LocalCanaryJSX } from "@ukic/canary-web-components";
import { DetailedHTMLProps, HTMLAttributes } from "react";

type StencilProps<T> = {
  [P in keyof T]?: Omit<T[P], "ref"> | HTMLAttributes<T>;
};

type ReactProps<T> = {
  [P in keyof T]?: DetailedHTMLProps<HTMLAttributes<T[P]>, T[P]>;
};

type StencilToReact<
  T = LocalJSX.IntrinsicElements,
  U = HTMLElementTagNameMap,
  V = LocalCanaryJSX.IntrinsicElements
> = StencilProps<T> & ReactProps<U> & StencilProps<V>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace JSX {
    interface IntrinsicElements extends StencilToReact {}
  }
}
