import React from "react";

import Permalink from "../Permalink";

import "./index.css";

const { slug } = require("github-slugger");

interface WrappedH3Props {
  children: string;
}

const WrappedH3: React.FC<WrappedH3Props> = ({ children }) => (
  <ic-typography variant="h3" apply-vertical-margins data-class="h3">
    {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
    <h5 id={slug(children)}>
      {children}
      <Permalink title={children?.toString()} sluggedTitle={slug(children)} />
    </h5>
  </ic-typography>
);

export default WrappedH3;
