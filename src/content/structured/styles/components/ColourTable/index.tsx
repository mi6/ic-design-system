import clsx from "clsx";
import React from "react";

import { ColorConfig } from "./colours.config";
import "./index.css";

const PaletteRow: React.FC<{
  hex: string;
  dark?: boolean;
}> = ({ hex, dark }) => (
  <div className={clsx("palette", dark && "dark")}>
    <div style={{ backgroundColor: hex }} className="circle">
      &nbsp;
    </div>
    <ic-typography variant="code-large" theme={dark ? "dark" : "light"}>
      {hex}
    </ic-typography>
  </div>
);

const ColorTable: React.FC<{
  config: ColorConfig[];
}> = ({ config }) => (
  <ic-data-list>
    {config.map(({ hex, hexDark, name, token }) => (
      <ic-data-row key={name} label={name}>
        <ic-typography slot="value" variant="code-small">
          {token}
        </ic-typography>
        <div className="color-circles" slot="end-component">
          <PaletteRow hex={hex} />
          {hexDark && <PaletteRow hex={hexDark} dark />}
        </div>
      </ic-data-row>
    ))}
  </ic-data-list>
);

export default ColorTable;
