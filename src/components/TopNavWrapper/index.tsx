import React from "react";
import { Link as GatsbyLink, withPrefix } from "gatsby";

import "./index.css";
import Search from "../Search";
import { iconLinks, textLinks } from "../../config.navigation";
import { ICDSLogo } from "../../assets/svg";

interface TopNavWrapperProps {
  appTitle: string;
  status: string;
  version: string;
}

const TopNavItem: React.FC<any> = ({ props, text }) => (
  <ic-navigation-item slot="navigation">
    <GatsbyLink slot="navigation-item" {...props}>
      {text}
    </GatsbyLink>
  </ic-navigation-item>
);

const TopNavWrapper: React.FC<TopNavWrapperProps> = ({
  appTitle,
  version,
}) => (
  <ic-top-navigation version={version} app-title={appTitle}>
    <GatsbyLink slot="app-title" to={withPrefix("/")}>
      {appTitle}
    </GatsbyLink>
    <span slot="app-icon">
      <ICDSLogo role="img" aria-labelledby="ICDS Logo" className="icds-logo" />
    </span>
    {textLinks.map(({ key, ...rest }) => (
      <TopNavItem {...rest} key={key} />
    ))}

    <Search />

    {iconLinks.map((iconLink) => (
      <ic-navigation-button
        label={iconLink.text}
        slot="buttons"
        href={iconLink.to}
        key={iconLink.key}
        target={iconLink.target}
      >
        {iconLink.icon({ slot: "icon" })}
      </ic-navigation-button>
    ))}
  </ic-top-navigation>
);

export default TopNavWrapper;
