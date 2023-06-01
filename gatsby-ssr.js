import "@ukic/fonts/dist/fonts.css";
import "@ukic/web-components/dist/core/core.css";
import "@ukic/web-components/dist/core/normalize.css";
import "./src/styles/gatsby-reset.css";
import "./src/styles/gatsby-override.css";

import paths from "./src/utils/paths";
import React from "react";
import Layout from "./src/components/Layout";

const { defineCustomElements } = require("@ukic/web-components/loader");

defineCustomElements();

// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = ({ element, props }) => {
  if (
    paths.some((el) => {
      return props.path === el;
    })
  ) {
    return <>{element}</>;
  } else {
    return <Layout {...props}>{element}</Layout>;
  }
};
