import React from "react";
import "./index.css";

const EventDescription: React.FC<{
  description: string;
  deprecation: string | undefined;
}> = ({ description, deprecation }) => (
  <div className="event-description">
    {!!description && <ic-typography>{description}</ic-typography>}
    {deprecation && (
      <>
        <ic-typography>{deprecation}</ic-typography>
        <div className="deprecation-tag">
          <ic-status-tag label="Deprecated" status="warning" small />
        </div>
      </>
    )}
  </div>
);

export default EventDescription;
