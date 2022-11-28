import React, { useMemo } from "react";

import { IcTypography } from "@ukic/react";
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
      <IcTypography variant="h3" applyVerticalMargins>
        <h3>Events</h3>
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
