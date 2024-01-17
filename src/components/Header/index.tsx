import React, { useEffect } from "react";

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
  const tabSwitch = () => {
    sessionStorage.setItem("tabSwitch", "true");
  };

  useEffect(() => {
    let tabId = "guidance";
    if (location.indexOf("/accessibility") > 0) {
      tabId = "accessibility";
    } else if (location.indexOf("/code") > 0) {
      tabId = "code";
    }

    const getActiveLinkEl = () => {
      const el = document.querySelector(`#${tabId}`)
        ?.firstElementChild as HTMLElement;
      el?.classList.add("active");
      return el;
    };

    sessionStorage.setItem("currTab", "");
    if (sessionStorage.getItem("tabSwitch") === "true") {
      sessionStorage.setItem("currTab", tabId);
      setTimeout(() => {
        const el = getActiveLinkEl();
        if (el && el.focus) {
          el.focus();
        }
      }, 300);
    } else if (location.indexOf("/components/") === 0) getActiveLinkEl();

    sessionStorage.setItem("tabSwitch", "false");
  }, []);

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
        <ic-status-tag
          slot="heading-adornment"
          label={adornment}
          status={status}
        />
      )}
      {tabs?.map(({ title, path }) => (
        <ic-navigation-item
          key={title}
          id={title.toLowerCase()}
          slot="tabs"
          onClick={tabSwitch}
        >
          <GatsbyLink slot="navigation-item" to={path} activeClassName="active">
            {title}
          </GatsbyLink>
        </ic-navigation-item>
      ))}
    </ic-page-header>
  );
};

export default Header;
