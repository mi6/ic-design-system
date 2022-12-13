import React from "react";

import { IcTypography } from "@ukic/react";
import Permalink from "../Permalink";

import "./index.css";

const { slug } = require("github-slugger");

interface WrappedH3Props {
  children: string;
}

const WrappedH3: React.FC<WrappedH3Props> = ({ children }) => (
  <IcTypography variant="h3" applyVerticalMargins className="h3">
    {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
    <h5 id={slug(children)}>
      {children}
      <Permalink title={children?.toString()} sluggedTitle={slug(children)} />
    </h5>
  </IcTypography>
);

export default WrappedH3;
