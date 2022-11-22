import React from "react";
import {
  IcTopNavigation,
  IcNavigationItem,
  IcNavigationButton,
} from "@ukic/react";
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
  <IcNavigationItem slot="navigation">
    <GatsbyLink slot="navigation-item" {...props}>
      {text}
    </GatsbyLink>
  </IcNavigationItem>
);

const TopNavWrapper: React.FC<TopNavWrapperProps> = ({ appTitle, version }) => (
  <IcTopNavigation appTitle={appTitle} version={version} href={withPrefix("/")}>
    <span slot="app-icon">
      <ICDSLogo role="img" aria-labelledby="ICDS Logo" className="icds-logo" />
    </span>
    {textLinks.map(({ key, ...rest }) => (
      <TopNavItem {...rest} key={key} />
    ))}

    <Search />

    {iconLinks.map((iconLink) => (
      <IcNavigationButton
        label={iconLink.text}
        slot="buttons"
        href={iconLink.to}
        key={iconLink.key}
        target={iconLink.target}
      >
        {iconLink.icon({ slot: "icon" })}
      </IcNavigationButton>
    ))}
  </IcTopNavigation>
);

export default TopNavWrapper;
