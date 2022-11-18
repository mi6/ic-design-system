import React from "react";
import dateFormat from "dateformat";

import { IcLink, IcSectionContainer, IcTypography } from "@ukic/react";

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
      <IcLink href={link} rel="noopener noreferrer" target="_blank">
        Edit this page
      </IcLink>
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
    <IcSectionContainer>
      <IcTypography variant="label">
        <ContributeLink contribute={contribute} />
        {publishDate && publishDate.length >= 0 ? (
          <> Last reviewed {dateFormat(publishDate, "d mmmm yyyy")}.</>
        ) : null}
      </IcTypography>
    </IcSectionContainer>
  </div>
);

export default Metadata;
