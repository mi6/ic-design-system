import React from "react";
import CodeAttribute from "../../../CodeAttribute";
import "./index.css";

const PropDescription: React.FC<{
  description: string;
  type: string;
  required: boolean;
}> = ({ description, type, required }) => (
  <div className="prop-description">
    <ic-typography>{description}</ic-typography>
    {required && (
      <ic-typography variant="subtitle-small">Required</ic-typography>
    )}
    <CodeAttribute label={`type: ${type}`} />
  </div>
);

export default PropDescription;
