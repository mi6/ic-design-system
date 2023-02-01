import "@ukic/fonts/dist/fonts.css";
import "@ukic/web-components/dist/core/core.css";
import "@ukic/web-components/dist/core/normalize.css";
import "./src/styles/gatsby-reset.css";
import "./src/styles/gatsby-override.css";

import React from "react";
import Layout from "./src/components/Layout";

const { defineCustomElements } = require("@ukic/web-components/loader");

defineCustomElements();

// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);
