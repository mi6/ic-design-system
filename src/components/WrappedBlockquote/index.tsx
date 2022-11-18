import React from "react";

import "./index.css";

const WrappedBlockquote: React.FC = (props: any) => (
  <blockquote {...props} className="blockquote" />
);

export default WrappedBlockquote;
