import { IcTypography } from "@ukic/react";
import React from "react";

import "./index.css";

interface AttributeCardsProps {
  data: any[];
}

const AttributeCards: React.FC<AttributeCardsProps> = ({ data }) => (
  <table className="attribute-cards">
    <tbody>
      {data.map((cell) => (
        <tr className="attribute-cards-row">
          <td className="attribute-cards-cell">
            <IcTypography variant="subtitle-large" className="cards-cell-name">
              {cell.name}
            </IcTypography>
            <IcTypography variant="body" className="cards-cell-description">
              {cell.description}
            </IcTypography>
            {cell.default !== undefined ? (
              <IcTypography variant="body" className="cards-cell-default">
                Default: {cell.default}
              </IcTypography>
            ) : (
              ""
            )}
            {cell.signature !== undefined ? (
              <IcTypography variant="body" className="cards-cell-signature">
                {cell.signature}
              </IcTypography>
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
