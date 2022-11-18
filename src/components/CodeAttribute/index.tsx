import { IcTypography } from "@ukic/react";
import React from "react";

import "./index.css";

const CodeAttribute: React.FC<{ label: string }> = ({ label }) => (
  <IcTypography variant="caption" className="type-container">
    {label}
  </IcTypography>
);

export default CodeAttribute;
