import "@ukic/fonts/dist/fonts.css";
import "@ukic/web-components/dist/core/core.css";
import "@ukic/web-components/dist/core/normalize.css";
import "./src/styles/gatsby-override.css";
import "./src/styles/gatsby-reset.css";

import React from "react";
import Layout from "./src/components/Layout";
import paths from "./src/utils/paths";

const { defineCustomElements } = require("@ukic/web-components/loader");

defineCustomElements();

// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = ({ element, props }) =>
  paths.some((el) => props.path === el) ? (
    element
  ) : (
    <Layout {...props}>{element}</Layout>
  );
