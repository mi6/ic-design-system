import React, { ReactNode } from "react";

import "./index.css";

const WrappedCode: React.FC<{ children: ReactNode }> = ({ children }) => (
  <code className="code">{children}</code>
);

export default WrappedCode;
