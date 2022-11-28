import React, { useMemo } from "react";

import { IcTypography } from "@ukic/react";
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
        name: <CodeAttribute label={style.name} />,
        description: style.docs,
      })),
    []
  );

  return (
    <>
      <IcTypography variant="h3" applyVerticalMargins>
        <h3>CSS Custom Properties</h3>
      </IcTypography>
      {window.screen.width > 576 ? (
        <AttributeTable columns={columns} data={data} />
      ) : (
        <AttributeCards data={data} />
      )}
    </>
  );
};

export default StyleTable;
