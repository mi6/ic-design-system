import React from "react";
import clsx from "clsx";

import "./index.css";

interface Color {
  gradient?: {
    color1: string;
    color2: string;
  };
  hex?: string; // Use 8-digit hex code for transparent colour
  hexDisplay?: string; // To override hex value displayed in table e.g. to include transparency - "#1759BC, 10%"
  border?: boolean;
  token?: string;
  name: string;
  deprecated?: boolean;
}

interface ColorConfig {
  title: string;
  colors: Color[];
}

interface PaletteRowProps {
  color: Color;
}

interface PaletteSectionProps {
  colors: Color[];
}

interface ColorTableProps {
  config: ColorConfig[];
}

const PaletteRow: React.FC<PaletteRowProps> = ({ color }) => {
  const { gradient, hex, hexDisplay, name, border, token, deprecated } = color;
  return (
    <div className={clsx("color-row", deprecated && "deprecation")}>
      <div className="color-circle">
        <div
          style={
            gradient
              ? {
                  backgroundImage: `linear-gradient(to right, ${gradient.color1}, ${gradient.color2})`,
                }
              : { backgroundColor: hex }
          }
          className={clsx("circle", border && "circle-border")}
        >
          &nbsp;
        </div>
      </div>
      <div className="color-name">{name}</div>
      <div className="color-token color-class">
        <ic-typography variant="body">{token}</ic-typography>
        {deprecated && (
          <div className="deprecation-tag">
            <ic-status-tag label="Deprecated" status="warning" small />
          </div>
        )}
      </div>
      <div className="color-class">
        <ic-typography variant="body">
          {hexDisplay || hex || `${gradient?.color1} ${gradient?.color2}`}
        </ic-typography>
      </div>
    </div>
  );
};

const PaletteSection: React.FC<PaletteSectionProps> = ({ colors }) => (
  <>
    {colors.map((rowColor) => (
      <PaletteRow key={rowColor.name} color={rowColor} />
    ))}
  </>
);

const ColorTable: React.FC<ColorTableProps> = ({ config }) => (
  <>
    {config.map((section) => (
      <PaletteSection key={section.title} colors={section.colors} />
    ))}
  </>
);

export default ColorTable;
