import React from "react";

import { IcTypography } from "@ukic/react";
import Permalink from "../Permalink";

const { slug } = require("github-slugger");

import "./index.css";

const WrappedH3: React.FC = (props: any) => (
  <IcTypography variant="h3" applyVerticalMargins className="h3">
    {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
    <h5 id={slug(props.children)}>
      {props.children}
      <Permalink title={props.children} sluggedTitle={slug(props.children)} />
    </h5>
  </IcTypography>
);

export default WrappedH3;
