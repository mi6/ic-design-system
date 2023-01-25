import React from "react";
import "./index.css";

const PropName: React.FC<{
  name: string;
  attribute: string;
}> = ({ name, attribute }) => (
  <div className="prop-name">
    <div className="prop-name-property">
      <ic-typography variant="subtitle-small">Property</ic-typography>
      <ic-typography variant="subtitle-large">{name}</ic-typography>
    </div>
    <div className="prop-name-attribute">
      <ic-typography variant="subtitle-small">Attribute</ic-typography>
      <ic-typography variant="subtitle-large">{attribute}</ic-typography>
    </div>
  </div>
);

export default PropName;
