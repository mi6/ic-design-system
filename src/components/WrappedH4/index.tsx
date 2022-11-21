import React from "react";

import { IcTypography } from "@ukic/react";

import "./index.css";

const WrappedH4: React.FC = (props: any) => (
  <IcTypography variant="h4" applyVerticalMargins className="h4">
    {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
    <h6 {...props} />
  </IcTypography>
);

export default WrappedH4;
