import React, { useMemo } from "react";
import { JsonDocsMethod } from "@ukic/docs";
import AttributeTable from "../../AttributeTable";
import CodeAttribute from "../../CodeAttribute";
import AttributeCards from "../../AttributeCards";
import AttributeName from "../AttributeName";
import TableDescription from "../TableDescription";

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
        name: <AttributeName name={["Method"]} value={[method.name]} />,
        description: (
          <TableDescription
            description={method.docs}
            deprecation={method.deprecation}
          />
        ),
        signature: <CodeAttribute label={method.signature} />,
        key: method.name,
      })),
    []
  );

  return (
    <>
      <ic-typography variant="h3" apply-vertical-margins>
        <h4>Methods</h4>
      </ic-typography>
      <AttributeTable columns={columns} data={data} />
      <AttributeCards data={data} />
    </>
  );
};

export default EventTable;
