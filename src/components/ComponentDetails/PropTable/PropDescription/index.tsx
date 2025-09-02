import React from "react";
import CodeAttribute from "../../../CodeAttribute";
import "./index.css";
import { backtickToCodeBlock } from "../../../../utils/helpers";

interface PropDescriptionProps {
  description: string;
  typeName?: string;
  type?: string;
  required: boolean;
  deprecation?: string;
  compact?: boolean;
}

const PropDescription: React.FC<PropDescriptionProps> = ({
  description,
  type,
  typeName,
  required,
  deprecation,
  compact,
}) => {
  let displayedType: string | null = null;
  if (type) {
    displayedType =
      typeName && typeName !== type ? `${typeName} - ${type}` : type;
  }
  return (
    <div
      className="prop-description"
      style={compact ? { maxWidth: 240 } : undefined}
    >
      {!!description && (
        <ic-typography>{backtickToCodeBlock(description)}</ic-typography>
      )}
      {required && (
        <ic-typography variant="subtitle-small">Required</ic-typography>
      )}
      {!deprecation && displayedType && (
        <CodeAttribute label={`type: ${displayedType}`} />
      )}
      {deprecation && (
        <>
          <ic-typography>{deprecation}</ic-typography>
          <div className="deprecation-tag">
            <ic-status-tag label="Deprecated" status="warning" size="small" />
          </div>
        </>
      )}
    </div>
  );
};

export default PropDescription;
