import React from "react";

import Permalink from "../Permalink";

import "./index.css";

const { slug } = require("github-slugger");

interface WrappedH2Props {
  children: string;
  preview?: boolean;
}

const WrappedH2: React.FC<WrappedH2Props> = ({ children, preview }) =>
  preview ? (
    <h2>{children}</h2>
  ) : (
    <ic-typography variant="h2" apply-vertical-margins data-class="h2">
      <h3 id={slug(children)}>
        {children}
        <Permalink title={children} sluggedTitle={slug(children)} />
      </h3>
    </ic-typography>
  );

export default WrappedH2;
