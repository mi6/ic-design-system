import React from "react";

import "./index.css";

const WrappedAlert: React.FC = (props: any) => (
  <ic-alert data-class="alert" announced={false} {...props} />
);

export default WrappedAlert;
