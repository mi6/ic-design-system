import React, { useMemo } from "react";

import { IcTypography } from "@ukic/react";
import { JsonDocsSlot } from "@ukic/docs";
import AttributeTable from "../../AttributeTable";

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
      <IcTypography variant="h3">
        <h3>Slots</h3>
      </IcTypography>
      <AttributeTable columns={columns} data={data} />
    </>
  );
};

export default PropTable;
