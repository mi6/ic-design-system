import React from "react";

import "./index.css";

const CodeAttribute: React.FC<{ label: string }> = ({ label }) => (
  <ic-typography variant="caption" data-class="type-container">
    {label}
  </ic-typography>
);

export default CodeAttribute;
