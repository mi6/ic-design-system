import React from "react";
import CodeAttribute from "../../../CodeAttribute";

const PropDescription: React.FC<{ description: string; type: string }> = ({
  description,
  type,
}) => (
  <div>
    <ic-typography>{description}</ic-typography>
    <CodeAttribute label={`type: ${type}`} />
  </div>
);

export default PropDescription;
