import React, { useMemo } from "react";

import { IcTypography } from "@ukic/react";
import { JsonDocsMethod } from "@ukic/docs";
import AttributeTable from "../../AttributeTable";
import CodeAttribute from "../../CodeAttribute";
import AttributeCards from "../../AttributeCards";

interface MethodTableProps {
  methodData: JsonDocsMethod[];
}

const EventTable: React.FC<MethodTableProps> = ({ methodData }) => {
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
      {
        Header: "Signature",
        accessor: "signature",
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      methodData.map((method) => ({
        name: method.name,
        description: method.docs,
        signature: <CodeAttribute label={method.signature} />,
      })),
    []
  );

  return (
    <>
      <IcTypography variant="h3" applyVerticalMargins>
        <h3>Methods</h3>
      </IcTypography>
      {window.screen.width > 576 ? (
        <AttributeTable columns={columns} data={data} />
      ) : (
        <AttributeCards data={data} />
      )}
    </>
  );
};

export default EventTable;
