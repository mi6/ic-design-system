import React from "react";

import { IcTypography } from "@ukic/react";

import "./index.css";

const WrappedH1: React.FC = (props: any) => (
  <IcTypography
    variant="h1"
    applyVerticalMargins
    className="heading-extra-large"
  >
    {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
    <h3 {...props} />
  </IcTypography>
);

export default WrappedH1;
