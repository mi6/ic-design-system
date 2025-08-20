import React from "react";
import componentJson from "@ukic/docs";
import canaryComponentJson from "@ukic/canary-docs";

const getTypeName = (key: string) => {
  const parts = key.split("::");
  return parts.length > 1 ? parts[parts.length - 1] : key;
};

const getCleanDeclaration = (raw: string) => {
  let declaration = raw.replace(/export (type|interface)\s+(?=Ic)/, "");
  const eqMatch = declaration.match(/=\s*"/);
  const braceIndex = declaration.indexOf("{");
  if (eqMatch && typeof eqMatch.index === "number") {
    declaration = declaration
      .slice(eqMatch.index + eqMatch[0].length - 1)
      .trim();
  } else if (braceIndex !== -1) {
    declaration = declaration.slice(braceIndex).trim();
  } else {
    const eqUnionMatch = declaration.match(/=\s*(\||[A-Za-z0-9_])/);
    if (eqUnionMatch && typeof eqUnionMatch.index === "number") {
      declaration = declaration.slice(eqUnionMatch.index + 1).trim();
    }
  }
  declaration = declaration.replace(/^\|\s*/, "");
  declaration = declaration.replace(/;\s*$/, "");
  return declaration;
};

const TypeLibrary: React.FC = () => {
  const typeLibrary = {
    ...componentJson.typeLibrary,
    ...canaryComponentJson.typeLibrary,
  };

  const sortedEntries = Object.entries(typeLibrary).sort((a, b) => {
    const nameA = getTypeName(a[0]).toLowerCase();
    const nameB = getTypeName(b[0]).toLowerCase();
    return nameA.localeCompare(nameB);
  });

  return (
    <ic-data-list
      style={{ "--data-row-label-width": "18rem" } as React.CSSProperties}
    >
      {sortedEntries.map(([key, value]) => {
        const typeName = getTypeName(key);
        let raw = "";
        if (typeof value === "object" && value.declaration) {
          raw = value.declaration;
        } else if (typeof value === "string") {
          raw = value;
        }
        const declaration = getCleanDeclaration(raw);
        return (
          <ic-data-row
            key={key}
            label={typeName}
            style={{ overflowWrap: "break-word" }}
          >
            <div slot="value">
              <pre style={{ whiteSpace: "pre-wrap" }}>{declaration}</pre>
            </div>
          </ic-data-row>
        );
      })}
    </ic-data-list>
  );
};

export default TypeLibrary;
