import React from "react";
import { CookiesDataProps } from "./index";

const CookiesTable = ({ headers, data, caption }: CookiesDataProps) => (
  <table className="cookies-table">
    <caption>{caption}</caption>
    <thead>
      <tr>
        {headers.map((header: string) => (
          <th>
            <ic-typography variant="subtitle-small">{header}</ic-typography>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((cookieData: any) => (
        <tr>
          <td>{cookieData.provider}</td>
          <td>{cookieData.domain}</td>
          <td>{cookieData.desc}</td>
          <td>{cookieData.cookies}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default CookiesTable;
