import "@ukic/fonts/dist/fonts.css";
import "@ukic/web-components/dist/core/core.css";
import "@ukic/web-components/dist/core/normalize.css";
import "./src/styles/gatsby-override.css";
import "./src/styles/gatsby-reset.css";
import "./src/styles/color-mode.css";

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

// eslint-disable-next-line import/prefer-default-export
export const onInitialClientRender = () => {
  /**
   *
   * To prevent an erroneous 'form control' in the VoiceOver rotor menu,
   * and to prevent erroneous auto-reading on page loads that make
   * little sense. Because the tabIndex="-1" is needed by @reach/router to
   * reset focus to the top of the page on client-side page load,
   * VoiceOver reads the <div> as a 'form control'. This means it reads out
   * child contents when focus is received (I think only in situations where
   * there hasn't been an aria-live=assertive 'Navigated to' announcement, but still).
   *
   * There is no way to achieve this using gatsby (it doesn't expose the init of @reach/router)
   *
   * Due to the conditional, it should fail safely if there's a change to gatsby.
   */
  const wrapper = document.getElementById("gatsby-focus-wrapper");
  if (!wrapper) {
    return;
  }
  wrapper.setAttribute("role", "group");
};
