import React, { ReactNode } from "react";

const WrappedLi: React.FC<{ children: ReactNode }> = ({ children }) => (
  <li>
    <ic-typography variant="body">
      <p>{children}</p>
    </ic-typography>
  </li>
);

export default WrappedLi;
