import React from "react";

import "./index.css";

const WrappedH4: React.FC = (props: any) => (
  <ic-typography variant="h4" apply-vertical-margins data-class="h4">
    {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
    <h6 {...props} />
  </ic-typography>
);

export default WrappedH4;
