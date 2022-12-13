import React from "react";

import { IcTypography } from "@ukic/react";

import "./index.css";

const WrappedH2: React.FC = (props: any) => (
  <IcTypography variant="h2" applyVerticalMargins className="h2">
    {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
    <h4 {...props} />
  </IcTypography>
);

export default WrappedH2;
