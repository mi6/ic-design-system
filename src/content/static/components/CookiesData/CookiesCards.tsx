import { IcTypography } from "@ukic/react";
import React from "react";
import { CookiesDataProps } from "./index";

import "./cookies.css";

const CookiesCards = ({ headers, data, caption }: CookiesDataProps) => (
  <table className="cookies-card">
    <caption>{caption}</caption>
    <tbody>
      {data.map((cookieData: any) => (
        <tr>
          <td>
            <span>
              <IcTypography variant="subtitle-large">{headers[0]}</IcTypography>
              <IcTypography applyVerticalMargins>
                {cookieData.provider}
              </IcTypography>
            </span>
            <span>
              <IcTypography variant="subtitle-large">{headers[1]}</IcTypography>
              <IcTypography applyVerticalMargins>
                {cookieData.domain}
              </IcTypography>
            </span>
            <span>
              <IcTypography variant="subtitle-large">{headers[2]}</IcTypography>
              <IcTypography applyVerticalMargins>
                {cookieData.desc}
              </IcTypography>
            </span>
            <span>
              <IcTypography variant="subtitle-large">{headers[3]}</IcTypography>
              <IcTypography applyVerticalMargins>
                {cookieData.cookies}
              </IcTypography>
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default CookiesCards;
