import React from "react";

import { IcTypography } from "@ukic/react";
import Permalink from "../Permalink";

const { slug } = require("github-slugger");

import "./index.css";

const WrappedH2: React.FC = (props: any) => (
  <IcTypography variant="h2" applyVerticalMargins className="h2">
    {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
    <h4 id={slug(props.children)}>
      {props.children}
      <Permalink title={props.children} sluggedTitle={slug(props.children)} />
    </h4>
  </IcTypography>
);

export default WrappedH2;
