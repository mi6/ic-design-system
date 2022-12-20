import React from "react";
import dateFormat from "dateformat";

import "./index.css";

interface ContributeLinkProps {
  contribute?: string;
}

interface MetadataProps {
  publishDate?: string;
  contribute?: string;
}

const ContributeLink: React.FC<ContributeLinkProps> = ({ contribute = "" }) => {
  const link = process.env.GATSBY_SOURCE_REPO_LINK
    ? process.env.GATSBY_SOURCE_REPO_LINK
    : contribute;
  return contribute ? (
    <>
      <ic-link href={link} rel="noopener noreferrer" target="_blank">
        Edit this page
      </ic-link>
      .
    </>
  ) : null;
};

const Metadata: React.FC<MetadataProps> = ({
  publishDate = null,
  contribute = "",
}) => (
  <div>
    <hr className="bottom-line" />
    <ic-section-container>
      <ic-typography variant="label">
        <ContributeLink contribute={contribute} />
        {publishDate && publishDate.length >= 0 ? (
          <> Last reviewed {dateFormat(publishDate, "d mmmm yyyy")}.</>
        ) : null}
      </ic-typography>
    </ic-section-container>
  </div>
);

export default Metadata;
