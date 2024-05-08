import React, { useMemo } from "react";
import { JsonDocsEvent } from "@ukic/docs";
import AttributeTable from "../../AttributeTable";
import CodeAttribute from "../../CodeAttribute";
import AttributeCards from "../../AttributeCards";
import TableDescription from "../TableDescription";
import AttributeName from "../AttributeName";

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

  const changetoReactEvent = (event: string) =>
    `on${event[0].toUpperCase() + event.slice(1)}`;

  const data = useMemo(
    () =>
      eventData.map(({ event, docs, detail, deprecation }) => ({
        name: (
          <AttributeName
            name={["Web component", "React"]}
            value={[event, changetoReactEvent(event)]}
          />
        ),
        description: (
          <TableDescription description={docs} deprecation={deprecation} />
        ),
        signature: <CodeAttribute label={detail} />,
        key: event,
      })),
    []
  );

  return (
    <>
      <ic-typography variant="h3" apply-vertical-margins>
        <h4>Events</h4>
      </ic-typography>
      <ic-typography apply-vertical-margins>
        <p>
          All components also accept native events supported by the DOM, such as{" "}
          <code className="language-text">onClick</code> and{" "}
          <code className="language-text">onKeyDown</code>.
        </p>
      </ic-typography>
      <AttributeTable columns={columns} data={data} />
      <AttributeCards data={data} />
    </>
  );
};

export default EventTable;
