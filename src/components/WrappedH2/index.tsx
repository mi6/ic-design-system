import React from "react";

import { IcTypography } from "@ukic/react";
import Permalink from "../Permalink";

import "./index.css";

const { slug } = require("github-slugger");

interface WrappedH2Props {
  children: string;
}

const WrappedH2: React.FC<WrappedH2Props> = ({ children }) => (
  <IcTypography variant="h2" applyVerticalMargins className="h2">
    {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
    <h4 id={slug(children)}>
      {children}
      <Permalink title={children} sluggedTitle={slug(children)} />
    </h4>
  </IcTypography>
);

export default WrappedH2;
