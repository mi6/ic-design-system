import React from "react";

import "./index.css";

const WrappedH1: React.FC = (props: any) => (
  <ic-typography
    variant="h1"
    apply-vertical-margins
    data-class="heading-extra-large"
  >
    {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
    <h2 {...props} />
  </ic-typography>
);

export default WrappedH1;
