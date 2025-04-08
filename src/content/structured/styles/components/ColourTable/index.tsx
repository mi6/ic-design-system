import clsx from "clsx";
import React from "react";
import { ColorConfig } from "./colours.config";
import "./index.css";

const ColorRow: React.FC<{ token: string; dark?: boolean }> = ({
  token,
  dark,
}) => (
  <div className="color-row">
    <div className={clsx("color-swatch", dark && "dark")}>
      <div style={{ backgroundColor: `var(${token})` }} className="color" />
    </div>
    <ic-typography variant="code-small">{token}</ic-typography>
  </div>
);

const ColorTable: React.FC<{
  config: ColorConfig[];
}> = ({ config }) => (
  <ic-data-list>
    {config.map(({ name, token, darkToken }) => (
      <ic-data-row key={name} label={name}>
        <div slot="value">
          <ColorRow token={token} />
          {darkToken && <ColorRow token={darkToken} dark />}
        </div>
      </ic-data-row>
    ))}
  </ic-data-list>
);

export default ColorTable;
