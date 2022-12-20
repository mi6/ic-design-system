import React, { useMemo } from "react";
import { JsonDocsEvent } from "@ukic/docs";
import AttributeTable from "../../AttributeTable";
import CodeAttribute from "../../CodeAttribute";
import AttributeCards from "../../AttributeCards";

interface EventTableProps {
  eventData: JsonDocsEvent[];
}

const EventTable: React.FC<EventTableProps> = ({ eventData }) => {
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
      eventData.map((event) => ({
        name: event.event,
        description: event.docs,
        signature: <CodeAttribute label={event.detail} />,
      })),
    []
  );

  return (
    <>
      <ic-typography variant="h3" apply-vertical-margins>
        <h3>Events</h3>
      </ic-typography>
      <AttributeTable columns={columns} data={data} />
      <AttributeCards data={data} />
    </>
  );
};

export default EventTable;
