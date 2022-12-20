import React from "react";

const WrappedP: React.FC<{ children: string }> = ({ children }) => (
  <ic-typography variant="body" apply-vertical-margins>
    <p>{children}</p>
  </ic-typography>
);

export default WrappedP;
