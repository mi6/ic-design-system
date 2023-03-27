import React, { useState } from "react";

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
    <ic-page-header
      heading={heading}
      subheading={subheading}
      aligned="center"
      data-class="page-header"
      sticky-desktop-only
    >
      {adornment && (
        <ic-chip slot="heading-adornment" label={adornment} size="large" />
      )}
      {tabs?.map((tab) => (
        <ic-navigation-item
          label={tab.title}
          onClick={() => onTabChange(tab)}
          slot="tabs"
          selected={activeTab === tab.title}
          href="#"
        />
      ))}
    </ic-page-header>
  );
};

export default Header;
