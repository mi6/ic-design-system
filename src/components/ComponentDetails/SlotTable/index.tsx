import React, { useMemo } from "react";

import { IcTypography } from "@ukic/react";
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
      <IcTypography variant="h3" applyVerticalMargins>
        <h3>Slots</h3>
      </IcTypography>
      {window.screen.width > 576 ? (
        <AttributeTable columns={columns} data={data} />
      ) : (
        <AttributeCards data={data} />
      )}
    </>
  );
};

export default PropTable;
