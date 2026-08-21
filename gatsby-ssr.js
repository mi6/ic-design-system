import "@ukic/fonts/dist/fonts.css";
import "@ukic/web-components/dist/core/normalize.css";
import "./src/styles/gatsby-override.css";
import "./src/styles/gatsby-reset.css";

import React from "react";
import Layout from "./src/components/Layout";
import paths from "./src/utils/paths";
import { withPrefix } from "gatsby";

const { defineCustomElements } = require("@ukic/web-components/loader");

defineCustomElements();

// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = ({ element, props }) =>
  paths.some((el) => props.path === el) ? (
    element
  ) : (
    <Layout {...props}>{element}</Layout>
  );

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents([
    <link key="tokens" rel="stylesheet" href={withPrefix("/tokens.css")} />,
  ]);
  setPreBodyComponents([
    <noscript key="no-js-notice">
      <div className="no-js-notice" role="status">
        <strong>JavaScript is disabled.</strong> Please enable JavaScript in your
        browser for the best experience and to use all features of this site.
      </div>
    </noscript>,
  ]);
};
