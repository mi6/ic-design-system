import React from "react";

import Permalink from "../Permalink";

import "./index.css";

const { slug } = require("github-slugger");

interface WrappedH3Props {
  children: string;
  preview?: boolean;
}

const WrappedH3: React.FC<WrappedH3Props> = ({ children, preview }) =>
  preview ? (
    <h3>{children}</h3>
  ) : (
    <ic-typography variant="h3" apply-vertical-margins data-class="h3">
      <h4 id={slug(children)}>
        {children}
        <Permalink title={children?.toString()} sluggedTitle={slug(children)} />
      </h4>
    </ic-typography>
  );

export default WrappedH3;
