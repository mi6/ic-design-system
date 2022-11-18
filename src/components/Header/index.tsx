import React, { useState } from "react";

import { IcNavigationItem, IcPageHeader, IcStatusTag } from "@ukic/react";

import "./index.css";
import { IcStatusTagStatuses } from "@ukic/web-components";
import { NavigationObject } from "../../sharedTypes";

interface HeaderProps {
  heading: string;
  subheading: string;
  tabs: Tab[];
  adornment: string;
  tabContent: NavigationObject[];
  currentPage: string;
  setPageContent: React.Dispatch<NavigationObject>;
}

interface Tab {
  title: string;
  path: string;
}

const Header: React.FC<HeaderProps> = ({
  heading,
  subheading,
  tabs,
  adornment,
  tabContent,
  currentPage,
  setPageContent,
}) => {
  const [activeTab, setActiveTab] = useState(
    tabs?.find((tab) => tab.path === currentPage)?.title
  );

  const onTabChange = ({ title, path }: Tab) => {
    const newPage = tabContent.find((page) => page.fields.slug === path);
    if (newPage) {
      setPageContent(newPage);
      setActiveTab(title);
    }
  };

  let status: IcStatusTagStatuses = "neutral";

  switch (adornment) {
    case "LIVE":
      status = "success";
      break;
    case "IN DEVELOPMENT":
      status = "warning";
      break;
    default:
      status = "neutral";
  }

  return (
    <IcPageHeader
      heading={heading}
      subheading={subheading}
      aligned="center"
      className="page-header"
    >
      {adornment && (
        <IcStatusTag
          slot="heading-adornment"
          label={adornment}
          status={status}
        />
      )}
      {tabs?.map((tab) => (
        <IcNavigationItem
          label={tab.title}
          onClick={() => onTabChange(tab)}
          slot="tabs"
          selected={activeTab === tab.title}
          href="#"
        />
      ))}
    </IcPageHeader>
  );
};

export default Header;
