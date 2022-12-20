import React, { useMemo } from "react";
import { JsonDocsSlot } from "@ukic/docs";
import AttributeTable from "../../AttributeTable";
import AttributeCards from "../../AttributeCards";

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
        name: slot.name,
        description: slot.docs,
      })),
    []
  );

  return (
    <>
      <ic-typography variant="h3" apply-vertical-margins>
        <h3>Slots</h3>
      </ic-typography>
      <AttributeTable columns={columns} data={data} />
      <AttributeCards data={data} />
    </>
  );
};

export default PropTable;
