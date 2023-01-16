import React, { useMemo } from "react";
import AttributeTable from "../../AttributeTable";
import AttributeCards from "../../AttributeCards";
import PropDescription from "./PropDescription";

interface StencilProp {
  name: string;
  docs: string;
  type: string;
  default?: string;
  required: boolean;
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
      propData.map(({ name, docs, type, required, default: defaultValue }) => ({
        name,
        description: (
          <PropDescription description={docs} type={type} required={required} />
        ),
        default: defaultValue,
      })),
    []
  );

  return (
    <>
      <ic-typography variant="h3" apply-vertical-margins>
        <h3>Props</h3>
      </ic-typography>
      <AttributeTable columns={columns} data={data} />
      <AttributeCards data={data} />
    </>
  );
};

export default PropTable;
