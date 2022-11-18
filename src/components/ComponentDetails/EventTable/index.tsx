import React, { useMemo } from "react";

import { IcTypography } from "@ukic/react";
import { JsonDocsEvent } from "@ukic/docs";
import AttributeTable from "../../AttributeTable";
import CodeAttribute from "../../CodeAttribute";

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
      <IcTypography variant="h3">
        <h3>Events</h3>
      </IcTypography>
      <AttributeTable columns={columns} data={data} />
    </>
  );
};

export default EventTable;
