import React from "react";
import { Link as GatsbyLink, withPrefix } from "gatsby";

import "./index.css";
import Search from "../Search";
import { iconLinks, textLinks } from "../../config.navigation";
import { ICDSLogo } from "../../assets/svg";

interface TopNavWrapperProps {
  appTitle: string;
  status: string;
  shortTitle: string;
  version: string;
}

const TopNavWrapper: React.FC<TopNavWrapperProps> = ({
  appTitle,
  version,
  shortTitle,
}) => (
  <ic-top-navigation id="site-top-nav" version={version}>
    <GatsbyLink id="icds-link" slot="app-title" to="/">
      {appTitle}
    </GatsbyLink>
    <GatsbyLink slot="short-app-title" to="/">
      {shortTitle}
    </GatsbyLink>
    <a slot="app-icon" href={withPrefix("/")}>
      <ICDSLogo role="img" aria-labelledby="icds-link" className="icds-logo" />
    </a>
    {textLinks.map(({ key, text, props }) => (
      <ic-navigation-item slot="navigation" key={key}>
        <GatsbyLink slot="navigation-item" {...props}>
          {text}
        </GatsbyLink>
      </ic-navigation-item>
    ))}

    <Search />

    {iconLinks.map(({ text, to, key, target, icon }) => (
      <ic-navigation-button
        label={text}
        slot="buttons"
        href={to}
        key={key}
        target={target}
      >
        {icon({ slot: "icon" })}
      </ic-navigation-button>
    ))}
  </ic-top-navigation>
);

export default TopNavWrapper;
