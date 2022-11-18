import React, { ReactNode } from "react";

import "./index.css";

const DoubleDoDontCaution: React.FC<{ children: ReactNode }> = ({
  children,
}) => <div className="container-double">{children}</div>;

export default DoubleDoDontCaution;
