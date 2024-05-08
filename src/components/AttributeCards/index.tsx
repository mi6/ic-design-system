import React from "react";

import "./index.css";

interface AttributeCardsProps {
  data: any[];
}

const AttributeCards: React.FC<AttributeCardsProps> = ({ data }) => (
  <table className="attribute-cards">
    <tbody>
      {data.map((cell) => (
        <tr key={cell.key || cell.name.key} className="attribute-cards-row">
          <td className="attribute-cards-cell">
            {cell.name}
            {cell.description}
            {cell.default !== undefined ? (
              <ic-typography variant="body">
                Default: {cell.default}
              </ic-typography>
            ) : (
              ""
            )}
            {cell.signature !== undefined ? (
              <ic-typography variant="body">{cell.signature}</ic-typography>
            ) : (
              ""
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default AttributeCards;
