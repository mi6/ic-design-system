import React from "react";
import CodeAttribute from "../../../CodeAttribute";
import "./index.css";
import { backtickToCodeBlock } from "../../../../utils/helpers";

const PropDescription: React.FC<{
  description: string;
  type: string;
  required: boolean;
  deprecation: string | undefined;
}> = ({ description, type, required, deprecation }) => (
  <div className="prop-description">
    {!!description && (
      <ic-typography>{backtickToCodeBlock(description)}</ic-typography>
    )}
    {required && (
      <ic-typography variant="subtitle-small">Required</ic-typography>
    )}
    {!deprecation && <CodeAttribute label={`type: ${type}`} />}
    {deprecation && (
      <>
        <ic-typography>{deprecation}</ic-typography>
        <div className="deprecation-tag">
          <ic-status-tag label="Deprecated" status="warning" small />
        </div>
      </>
    )}
  </div>
);

export default PropDescription;
