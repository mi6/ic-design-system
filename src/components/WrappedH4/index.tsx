import React from "react";

import "./index.css";

interface WrappedH4Props {
  children: string;
  preview?: boolean;
}

const WrappedH4: React.FC = ({ children, preview }: WrappedH4Props) =>
  preview ? (
    <h4>{children}</h4>
  ) : (
    <ic-typography variant="h4" apply-vertical-margins data-class="h4">
      <h5>{children}</h5>
    </ic-typography>
  );

export default WrappedH4;
