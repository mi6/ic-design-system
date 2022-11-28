import React, { useMemo } from "react";

import { IcTypography } from "@ukic/react";
import AttributeTable from "../../AttributeTable";
import AttributeCards from "../../AttributeCards";
import PropDescription from "./PropDescription";

interface StencilProp {
  name: string;
  docs: string;
  type: string;
  default?: string;
}

interface PropTableProps {
  propData: StencilProp[];
}

const PropTable: React.FC<PropTableProps> = ({ propData }) => {
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
        Header: "Default",
        accessor: "default",
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      propData.map((prop) => ({
        name: prop.name,
        description: (
          <PropDescription description={prop.docs} type={prop.type} />
        ),
        default: prop.default,
      })),
    []
  );

  return (
    <>
      <IcTypography variant="h3" applyVerticalMargins>
        <h3>Props</h3>
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
