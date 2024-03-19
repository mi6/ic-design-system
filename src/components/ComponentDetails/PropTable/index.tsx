import React, { useMemo } from "react";
import AttributeTable from "../../AttributeTable";
import AttributeCards from "../../AttributeCards";
import AttributeName from "../AttributeName";
import PropDescription from "./PropDescription";

interface StencilProp {
  name: string;
  attr?: string | undefined;
  docs: string;
  type: string;
  default?: string;
  required: boolean;
  deprecation?: string | undefined;
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
      propData
        .map(
          ({
            name,
            attr,
            docs,
            type,
            required,
            default: defaultValue,
            deprecation,
          }) => ({
            name: (
              <AttributeName
                name={["Property", "Attribute"]}
                value={[name, attr]}
              />
            ),
            description: (
              <PropDescription
                description={docs}
                type={type}
                required={required}
                deprecation={deprecation}
              />
            ),
            default: defaultValue,
          })
        )
        .sort(
          (a, b) => b.description.props.required - a.description.props.required
        ),
    []
  );

  return (
    <>
      <ic-typography variant="h3" apply-vertical-margins>
        <h4>Props</h4>
      </ic-typography>
      <ic-typography apply-vertical-margins>
        <p>
          All components also accept native properties supported by the DOM,
          such as <code className="language-text">className</code> and{" "}
          <code className="language-text">style</code>.
        </p>
      </ic-typography>
      <AttributeTable columns={columns} data={data} />
      <AttributeCards data={data} />
    </>
  );
};

export default PropTable;
