import React from "react";

import { IcTypography } from "@ukic/react";

import "./index.css";

const WrappedH3: React.FC = (props: any) => (
  <IcTypography variant="h3" applyVerticalMargins className="h3">
    {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
    <h5 {...props} />
  </IcTypography>
);

export default WrappedH3;
