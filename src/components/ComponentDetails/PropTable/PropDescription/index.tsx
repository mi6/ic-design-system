import { IcTypography } from "@ukic/react";
import React from "react";
import CodeAttribute from "../../../CodeAttribute";

const PropDescription: React.FC<{ description: string; type: string }> = ({
  description,
  type,
}) => (
  <div>
    <IcTypography>{description}</IcTypography>
    <CodeAttribute label={`type: ${type}`} />
  </div>
);

export default PropDescription;
