import React from "react";
import dateFormat from "dateformat";

import "./index.css";

interface MetadataProps {
  publishDate?: string;
}

const Metadata: React.FC<MetadataProps> = ({ publishDate = null }) => (
  <div>
    <hr className="bottom-line" />
    <ic-section-container>
      <ic-typography variant="label">
        {publishDate && publishDate.length >= 0 ? (
          <> Last reviewed {dateFormat(publishDate, "d mmmm yyyy")}.</>
        ) : null}
      </ic-typography>
    </ic-section-container>
  </div>
);

export default Metadata;
