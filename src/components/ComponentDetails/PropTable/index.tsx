import React, { useMemo } from "react";
import { JsonDocsProp } from "@ukic/docs";
import { IcTypography } from "@ukic/react";
import AttributeTable from "../../AttributeTable";
import AttributeCards from "../../AttributeCards";
import AttributeName from "../AttributeName";
import PropDescription from "./PropDescription";

interface PropTableProps {
  propData: JsonDocsProp[];
  typeLibrary: any;
}

const resolveTypeEntry = (
  typeLibrary: any,
  typeName: string | undefined,
  resolved: string | undefined
) => {
  if (!typeName || typeName !== resolved) return resolved;

  const icIndex = typeName.indexOf("Ic");
  let cleanedTypeName = icIndex !== -1 ? typeName.slice(icIndex) : typeName;
  if (cleanedTypeName.endsWith("[]"))
    cleanedTypeName = cleanedTypeName.slice(0, -2);

  let typeEntry = typeLibrary[cleanedTypeName];
  if (!typeEntry) {
    const foundKey = Object.keys(typeLibrary).find((key) =>
      key.endsWith(`::${cleanedTypeName}`)
    );
    typeEntry = foundKey ? typeLibrary[foundKey] : undefined;
  }

  if (
    typeEntry &&
    typeof typeEntry === "object" &&
    "declaration" in typeEntry
  ) {
    return (typeEntry as { declaration: string }).declaration;
  }
  if (typeof typeEntry === "string") {
    return typeEntry;
  }
  return resolved;
};

const PropTable: React.FC<PropTableProps> = ({ propData, typeLibrary }) => {
  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Description", accessor: "description" },
      { Header: "Default", accessor: "default" },
    ],
    []
  );

  const typeOfDefaultValue = (
    value: any,
    startCharacter: string,
    endCharacter: string
  ) =>
    typeof value === "string" &&
    value.trim().startsWith(startCharacter) &&
    value.trim().endsWith(endCharacter);

  const hasObjectDefaultValue = useMemo(
    () =>
      propData.some(({ default: defaultValue }) =>
        typeOfDefaultValue(defaultValue, "{", "}")
      ),
    [propData]
  );

  const data = useMemo(
    () =>
      propData
        .map(
          ({
            name,
            attr,
            docs,
            complexType,
            required,
            default: defaultValue,
            deprecation,
          }) => {
            const typeName = complexType?.original;
            const resolved = complexType?.resolved;
            const type = resolveTypeEntry(typeLibrary, typeName, resolved);
            return {
              name: (
                <AttributeName
                  name={["Property", "Attribute"]}
                  value={[name, attr]}
                />
              ),
              description: (
                <PropDescription
                  description={docs}
                  typeName={typeName}
                  type={type}
                  required={required}
                  deprecation={deprecation}
                  compact={hasObjectDefaultValue}
                />
              ),
              default: (() => {
                if (typeOfDefaultValue(defaultValue, "{", "}")) {
                  return (
                    <IcTypography
                      style={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        fontSize: "0.82em",
                        margin: 0,
                      }}
                    >
                      {defaultValue}
                    </IcTypography>
                  );
                }
                if (typeOfDefaultValue(defaultValue, "`", "`")) {
                  return (
                    <code className="language-text">
                      {defaultValue ? defaultValue.trim().slice(1, -1) : ""}
                    </code>
                  );
                }
                return defaultValue;
              })(),
              key: name,
            };
          }
        )
        .sort(
          (a, b) => b.description.props.required - a.description.props.required
        ),
    [propData, typeLibrary, hasObjectDefaultValue]
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
