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
        {headerGroups.map((headerGroup) => {
          const { key, ...otherHeaderGroupProps } =
            headerGroup.getHeaderGroupProps();
          return (
            <tr {...otherHeaderGroupProps} key={key}>
              {headerGroup.headers.map((column) => {
                const { key: columnKey, ...otherColumnProps } =
                  column.getHeaderProps();
                return (
                  <th {...otherColumnProps} className="cell" key={columnKey}>
                    <ic-typography variant="subtitle-small">
                      {column.render("Header")}
                    </ic-typography>
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const { key: rowKey, ...otherRowProps } = row.getRowProps();
          return (
            <tr className="row" {...otherRowProps} key={rowKey}>
              {row.cells.map((cell, index) => {
                const { key: cellKey, ...otherCellProps } = cell.getCellProps();
                return (
                  <td {...otherCellProps} className="cell" key={cellKey}>
                    <ic-typography
                      variant={index === 0 ? "subtitle-large" : "body"}
                    >
                      {cell.render("Cell")}
                    </ic-typography>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AttributeTable;
