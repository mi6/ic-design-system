import React from "react";

import Permalink from "../Permalink";

import "./index.css";

const { slug } = require("github-slugger");

interface WrappedH2Props {
  children: string;
}

const WrappedH2: React.FC<WrappedH2Props> = ({ children }) => (
  <ic-typography variant="h2" apply-vertical-margins data-class="h2">
    {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
    <h3 id={slug(children)}>
      {children}
      <Permalink title={children} sluggedTitle={slug(children)} />
    </h3>
  </ic-typography>
);

export default WrappedH2;
