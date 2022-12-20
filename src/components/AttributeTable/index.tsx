import React from "react";
import { useTable } from "react-table";

import "./index.css";

interface Column {
  Header: string;
  accessor: string;
}

interface AttributeTableProps {
  columns: Column[];
  data: any[];
}
const AttributeTable: React.FC<AttributeTableProps> = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} className="attribute-table" cellSpacing="0">
      <thead className="header">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="cell">
                <ic-typography variant="subtitle-small">
                  {column.render("Header")}
                </ic-typography>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr className="row" {...row.getRowProps()}>
              {row.cells.map((cell, index) => (
                <td {...cell.getCellProps()} className="cell">
                  <ic-typography
                    variant={index === 0 ? "subtitle-large" : "body"}
                  >
                    {cell.render("Cell")}
                  </ic-typography>
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AttributeTable;
