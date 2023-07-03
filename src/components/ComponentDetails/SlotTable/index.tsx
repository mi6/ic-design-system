import React, { useMemo } from "react";
import { JsonDocsSlot } from "@ukic/docs";
import AttributeTable from "../../AttributeTable";
import AttributeCards from "../../AttributeCards";
import AttributeName from "../AttributeName";

interface PropTableProps {
  slotData: JsonDocsSlot[];
}

const PropTable: React.FC<PropTableProps> = ({ slotData }) => {
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
      slotData.map((slot) => ({
        name: <AttributeName name={["Slot"]} value={[slot.name]} />,
        description: slot.docs,
      })),
    []
  );

  return (
    <>
      <ic-typography variant="h3" apply-vertical-margins>
        <h3>Slots</h3>
      </ic-typography>
      <ic-typography apply-vertical-margins>
        <p>
          A slot allows for any type of element or markup to be passed into and
          rendered within a web component. This creates more flexibility than
          using a prop which must take a specific type of data.
        </p>
      </ic-typography>
      <ic-typography apply-vertical-margins>
        <p>
          Content can be slotted into a component by adding it as a top-level
          child of the component.
        </p>
      </ic-typography>
      <ic-typography apply-vertical-margins>
        <p>
          Slots can have a name to identify them. These specify which slot the
          content will be inserted into, and therefore where it will be rendered
          and how it will be used within the component. The name of the slot to
          be used can be specified by passing it via a{" "}
          <code className="language-text">slot</code> attribute on the slotted
          content.
        </p>
      </ic-typography>
      <ic-typography apply-vertical-margins>
        <p>
          <ic-link href="https://javascript.info/slots-composition">
            Read more about slots
          </ic-link>
          .
        </p>
      </ic-typography>
      <br />
      <AttributeTable columns={columns} data={data} />
      <AttributeCards data={data} />
    </>
  );
};

export default PropTable;
