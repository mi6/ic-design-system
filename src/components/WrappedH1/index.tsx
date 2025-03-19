import React from "react";

import "./index.css";

interface WrappedH1Props {
  children: string;
  preview?: boolean;
}

const WrappedH1: React.FC = ({ children, preview }: WrappedH1Props) =>
  preview ? (
    <h1>{children}</h1>
  ) : (
    <ic-typography
      variant="h1"
      apply-vertical-margins
      data-class="heading-extra-large"
    >
      <h2>{children}</h2>
    </ic-typography>
  );

export default WrappedH1;
