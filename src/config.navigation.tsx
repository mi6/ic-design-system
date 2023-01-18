import { mdiGithub } from "@mdi/js";

import { Link as GatsbyLink } from "gatsby";

import React from "react";
import { SlottedSVG } from "@ukic/react";

export const textLinks = [
  {
    to: "/get-started",
    text: "Get started",
    key: "get-started",
    component: GatsbyLink,
    props: {
      to: "/get-started",
      activeClassName: "active",
      partiallyActive: true,
    },
  },
  {
    to: "/accessibility",
    text: "Accessibility",
    key: "accessibility",
    component: GatsbyLink,
    props: {
      to: "/accessibility",
      activeClassName: "active",
      partiallyActive: true,
    },
  },
  {
    to: "/styles",
    text: "Styles",
    key: "styles",
    component: GatsbyLink,
    props: {
      to: "/styles",
      activeClassName: "active",
      partiallyActive: true,
    },
  },
  {
    to: "/components",
    text: "Components",
    key: "components",
    component: GatsbyLink,
    props: {
      to: "/components",
      activeClassName: "active",
      partiallyActive: true,
    },
  },
  {
    to: "/patterns",
    text: "Patterns",
    key: "patterns",
    component: GatsbyLink,
    props: {
      to: "/patterns",
      activeClassName: "active",
      partiallyActive: true,
    },
  },
  {
    to: "/community",
    text: "Community",
    key: "community",
    component: GatsbyLink,
    props: {
      to: "/community",
      activeClassName: "active",
      partiallyActive: true,
    },
  },
];

export const iconLinks = [
  {
    to: process.env.GATSBY_SOURCE_REPO_LINK
      ? process.env.GATSBY_SOURCE_REPO_LINK
      : "https://github.com/mi6",
    text: "View IC Design System source code on GitHub (opens in new window)",
    key: "code",
    icon: (props: any) => <SlottedSVG path={mdiGithub} {...props} />,
    target: "_blank",
  },
];
