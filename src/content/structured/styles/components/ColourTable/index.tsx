import React from "react";
import { ColorConfig } from "./colours.config";
import "./index.css";

const ColorRow: React.FC<{ token: string; theme?: "light" | "dark" }> = ({
  token,
  theme = "light",
}) => (
  <ic-theme theme={theme}>
    <div className="color-swatch">
      <div style={{ backgroundColor: `var(${token})` }} />
    </div>
  </ic-theme>
);

const ColorTable: React.FC<{
  config: ColorConfig[];
}> = ({ config }) => (
  <ic-data-list>
    {config.map(({ name, token, darkMode }) => (
      <ic-data-row key={name} label={name}>
        <ic-typography slot="value" variant="code-small">
          {token}
        </ic-typography>
        <div slot="end-component">
          <ColorRow token={token} />
          {darkMode && <ColorRow token={token} theme="dark" />}
        </div>
      </ic-data-row>
    ))}
  </ic-data-list>
);

export default ColorTable;
