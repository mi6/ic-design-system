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
              <ic-typography variant="subtitle-large">
                {headers[0]}
              </ic-typography>
              <ic-typography apply-vertical-margins>
                {cookieData.provider}
              </ic-typography>
            </span>
            <span>
              <ic-typography variant="subtitle-large">
                {headers[1]}
              </ic-typography>
              <ic-typography apply-vertical-margins>
                {cookieData.domain}
              </ic-typography>
            </span>
            <span>
              <ic-typography variant="subtitle-large">
                {headers[2]}
              </ic-typography>
              <ic-typography apply-vertical-margins>
                {cookieData.desc}
              </ic-typography>
            </span>
            <span>
              <ic-typography variant="subtitle-large">
                {headers[3]}
              </ic-typography>
              <ic-typography apply-vertical-margins>
                {cookieData.cookies}
              </ic-typography>
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default CookiesCards;
