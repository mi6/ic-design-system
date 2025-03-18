import { IcTypographyVariants } from "@ukic/web-components";

export type TypographyVariant = IcTypographyVariants | "link";

export interface TypographyConfig {
  variant: TypographyVariant;
  title: string;
  fontFamily: "Nunito sans" | "Open sans" | "Source Code Pro";
  fontWeight: "ExtraBold" | "Bold" | "Regular" | "SemiBold";

  /** Value expected in `rem` units */
  fontSize: number;

  /** Value expected in `rem` units */
  lineHeight: number;
  letterSpacing: string;
}

export const TypographyHeadings: TypographyConfig[] = [
  {
    variant: "h1",
    title: "Heading extra large",
    fontFamily: "Nunito sans",
    fontWeight: "ExtraBold",
    fontSize: 2.625,
    lineHeight: 3.5,
    letterSpacing: "normal",
  },
  {
    variant: "h2",
    title: "Heading large",
    fontFamily: "Nunito sans",
    fontWeight: "Bold",
    fontSize: 2.125,
    lineHeight: 3.5,
    letterSpacing: "0.0025rem",
  },
  {
    variant: "h3",
    title: "Heading medium",
    fontFamily: "Open sans",
    fontWeight: "Regular",
    fontSize: 1.5,
    lineHeight: 2.5,
    letterSpacing: "normal",
  },
  {
    variant: "h4",
    title: "Heading small",
    fontFamily: "Open sans",
    fontWeight: "SemiBold",
    fontSize: 1.25,
    lineHeight: 2,
    letterSpacing: "0.0015rem",
  },
];

export const TypographySubtitles: TypographyConfig[] = [
  {
    variant: "subtitle-large",
    title: "Subtitle large",
    fontFamily: "Open sans",
    fontWeight: "Bold",
    fontSize: 1,
    lineHeight: 1.5,
    letterSpacing: "0.0015rem",
  },
  {
    variant: "subtitle-small",
    title: "Subtitle small and table headings",
    fontFamily: "Open sans",
    fontWeight: "SemiBold",
    fontSize: 0.875,
    lineHeight: 1.5,
    letterSpacing: "0.0015rem",
  },
];

export const TypographyText: TypographyConfig[] = [
  {
    variant: "body",
    title: "Body",
    fontFamily: "Open sans",
    fontWeight: "Regular",
    fontSize: 1,
    lineHeight: 1.5,
    letterSpacing: "0.005rem",
  },
  {
    variant: "caption",
    title: "Helper text on input fields and other captions",
    fontFamily: "Open sans",
    fontWeight: "SemiBold",
    fontSize: 0.75,
    lineHeight: 1.25,
    letterSpacing: "0.0025rem",
  },
  {
    variant: "caption-uppercase",
    title: "Helper text on input fields and other captions",
    fontFamily: "Open sans",
    fontWeight: "SemiBold",
    fontSize: 0.75,
    lineHeight: 1.25,
    letterSpacing: "0.0025rem",
  },
  {
    variant: "code-large",
    title: "Code large",
    fontFamily: "Source Code Pro",
    fontWeight: "Regular",
    fontSize: 1,
    lineHeight: 1.5,
    letterSpacing: "0.025rem",
  },
  {
    variant: "code-small",
    title: "Code small",
    fontFamily: "Source Code Pro",
    fontWeight: "SemiBold",
    fontSize: 0.875,
    lineHeight: 1.5,
    letterSpacing: "0.005rem",
  },
  {
    variant: "code-extra-small",
    title: "Code extra-small",
    fontFamily: "Source Code Pro",
    fontWeight: "Regular",
    fontSize: 0.75,
    lineHeight: 1.5,
    letterSpacing: "0.025rem",
  },
];

export const TypographyLabels: TypographyConfig[] = [
  {
    variant: "label",
    title: "Secondary button",
    fontFamily: "Open sans",
    fontWeight: "SemiBold",
    fontSize: 0.875,
    lineHeight: 1.5,
    letterSpacing: "0.025rem",
  },
  {
    variant: "label-uppercase",
    title: "Destructive button",
    fontFamily: "Open sans",
    fontWeight: "SemiBold",
    fontSize: 0.875,
    lineHeight: 1.5,
    letterSpacing: "0.025rem",
  },
];

export const TypographyLinks: TypographyConfig[] = [
  {
    variant: "link",
    title: "Link style",
    fontFamily: "Open sans",
    fontWeight: "Regular",
    fontSize: 1,
    lineHeight: 1.5,
    letterSpacing: "0.005rem",
  },
];
