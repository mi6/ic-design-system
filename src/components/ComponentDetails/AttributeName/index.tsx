import React from "react";
import "./index.css";

const AttributeName: React.FC<{
  name: string[];
  value: (string | undefined)[];
}> = ({ name, value }) => (
  <div className="attribute-name">
    {name.map(
      (attributeName, i) =>
        value[i] && (
          <div key={`attribute-${attributeName.toLowerCase().split(" ")[0]}`}>
            <ic-typography variant="subtitle-small">
              {attributeName}
            </ic-typography>
            <ic-typography variant="subtitle-large">{value[i]}</ic-typography>
          </div>
        )
    )}
  </div>
);

export default AttributeName;
