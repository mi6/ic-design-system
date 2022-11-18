import React, { ReactNode } from "react";

import { IcTypography } from "@ukic/react";

const WrappedLi: React.FC<{ children: ReactNode }> = ({ children }) => (
  <li>
    <IcTypography variant="body">
      <p>{children}</p>
    </IcTypography>
  </li>
);

export default WrappedLi;
