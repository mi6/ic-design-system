import React, { useMemo } from "react";

import { IcTypography } from "@ukic/react";
import { JsonDocsMethod } from "@ukic/docs";
import AttributeTable from "../../AttributeTable";
import CodeAttribute from "../../CodeAttribute";

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
      <IcTypography variant="h3">
        <h3>Methods</h3>
      </IcTypography>
      <AttributeTable columns={columns} data={data} />
    </>
  );
};

export default EventTable;
