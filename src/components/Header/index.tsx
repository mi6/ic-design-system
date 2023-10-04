import React, { useCallback } from "react";

import "./index.css";
import { IcStatusTagStatuses } from "@ukic/web-components";
import { Link as GatsbyLink } from "gatsby";

interface HeaderProps {
  heading: string;
  subheading: string;
  tabs: Tab[];
  adornment: string;
  location: string;
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
  location,
}) => {
  const locationRef = useCallback(
    (node: HTMLElement | null) => {
      const storedLocation = sessionStorage.getItem("location");
      if (!storedLocation) sessionStorage.setItem("location", location);
      else if (storedLocation !== location) {
        let pathNameEls: string[] = [];
        const getRelativePathName = (pathName: string) => {
          pathNameEls = pathName.split("/");
          return pathNameEls.length > 3
            ? pathNameEls.slice(0, 3).join("/")
            : pathName;
        };

        if (
          getRelativePathName(storedLocation) === getRelativePathName(location)
        ) {
          let tabId = pathNameEls[pathNameEls.length - 1];
          if (!(tabId === "code" || tabId === "accessibility"))
            tabId = "guidance";
          setTimeout(() => {
            (
              Array.from(node!.children).find((el) => el.id === tabId)!
                .firstElementChild as HTMLElement
            ).focus();
          }, 100);
        }
        sessionStorage.setItem("location", location);
      }
    },
    [location]
  );

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
      ref={locationRef}
    >
      {adornment && (
        <ic-status-tag
          slot="heading-adornment"
          label={adornment}
          status={status}
        />
      )}
      {tabs?.map((tab) => (
        <ic-navigation-item
          key={tab.title}
          id={tab.title.toLowerCase()}
          slot="tabs"
        >
          <GatsbyLink
            slot="navigation-item"
            to={tab.path}
            activeClassName="active"
          >
            {tab.title}
          </GatsbyLink>
        </ic-navigation-item>
      ))}
    </ic-page-header>
  );
};

export default Header;
