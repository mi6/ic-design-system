import React, { useMemo } from "react";
import { JsonDocsStyle } from "@ukic/docs";
import AttributeTable from "../../AttributeTable";
import CodeAttribute from "../../CodeAttribute";
import AttributeCards from "../../AttributeCards";

interface StyleTableProps {
  styleData: JsonDocsStyle[];
}

const StyleTable: React.FC<StyleTableProps> = ({ styleData }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      styleData.map((style) => ({
        name: <CodeAttribute label={style.name} key={style.name} />,
        description: style.docs,
      })),
    []
  );

  return (
    <>
      <ic-typography variant="h3" apply-vertical-margins>
        <h4>CSS Custom Properties</h4>
      </ic-typography>
      <AttributeTable columns={columns} data={data} />
      <AttributeCards data={data} />
    </>
  );
};

export default StyleTable;
