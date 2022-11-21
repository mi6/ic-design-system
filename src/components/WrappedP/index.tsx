import React from "react";

import { IcTypography } from "@ukic/react";

const WrappedP: React.FC<{ children: string }> = ({ children }) => (
  <IcTypography variant="body" applyVerticalMargins>
    <p>{children}</p>
  </IcTypography>
);

export default WrappedP;
