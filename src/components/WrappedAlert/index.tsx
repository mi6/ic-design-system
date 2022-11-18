import React from "react";

import { IcAlert } from "@ukic/react";

import "./index.css";

const WrappedAlert: React.FC = (props: any) => (
  <IcAlert className="alert" announced={false} {...props} />
);

export default WrappedAlert;
