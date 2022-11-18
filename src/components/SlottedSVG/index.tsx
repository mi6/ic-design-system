import React, { FC } from "react";

const defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
};

function slot(name = "") {
  return { ref: (e: any) => (e ? e.setAttribute("slot", name) : null) };
}

const SlottedSVG: FC<any> = ({ props, path, slot: slotName }) => (
  <svg {...slot(slotName)} {...props} {...defaultProps}>
    <path d={path} />
  </svg>
);

export default SlottedSVG;
