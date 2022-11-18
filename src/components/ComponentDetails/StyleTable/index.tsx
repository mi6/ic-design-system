import React, { useMemo } from "react";

import { IcTypography } from "@ukic/react";
import { JsonDocsStyle } from "@ukic/docs";
import AttributeTable from "../../AttributeTable";
import CodeAttribute from "../../CodeAttribute";

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
        name: <CodeAttribute label={style.name} />,
        description: style.docs,
      })),
    []
  );

  return (
    <>
      <IcTypography variant="h3">
        <h3>CSS Custom Properties</h3>
      </IcTypography>
      <AttributeTable columns={columns} data={data} />
    </>
  );
};

export default StyleTable;
