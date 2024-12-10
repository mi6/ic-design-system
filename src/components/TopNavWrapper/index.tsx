import React from "react";
import { Link as GatsbyLink, withPrefix } from "gatsby";
import { SlottedSVG } from "@ukic/react";

import "./index.css";
import Search from "../Search";
import { iconLinks, textLinks } from "../../config.navigation";
import { ICDSLogo } from "../../assets/svg";
import { useTheme } from "../../context/ThemeContext";

const DarkIcon = () => (
  <SlottedSVG
    slot="icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Icon">
      <path
        id="Vector"
        d="M14.5 2C16.32 2 18.03 2.5 19.5 3.35C16.51 5.08 14.5 8.3 14.5 12C14.5 15.7 16.51 18.92 19.5 20.65C18.03 21.5 16.32 22 14.5 22C8.98 22 4.5 17.52 4.5 12C4.5 6.48 8.98 2 14.5 2Z"
        fill="currentColor"
      />
    </g>
  </SlottedSVG>
);

const LightIcon = () => (
  <SlottedSVG
    slot="icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Icon">
      <path
        id="Vector"
        d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM2 13H4C4.55 13 5 12.55 5 12C5 11.45 4.55 11 4 11H2C1.45 11 1 11.45 1 12C1 12.55 1.45 13 2 13ZM20 13H22C22.55 13 23 12.55 23 12C23 11.45 22.55 11 22 11H20C19.45 11 19 11.45 19 12C19 12.55 19.45 13 20 13ZM11 2V4C11 4.55 11.45 5 12 5C12.55 5 13 4.55 13 4V2C13 1.45 12.55 1 12 1C11.45 1 11 1.45 11 2ZM11 20V22C11 22.55 11.45 23 12 23C12.55 23 13 22.55 13 22V20C13 19.45 12.55 19 12 19C11.45 19 11 19.45 11 20ZM5.99 4.58C5.6 4.19 4.96 4.19 4.58 4.58C4.19 4.97 4.19 5.61 4.58 5.99L5.64 7.05C6.03 7.44 6.67 7.44 7.05 7.05C7.43 6.66 7.44 6.02 7.05 5.64L5.99 4.58ZM18.36 16.95C17.97 16.56 17.33 16.56 16.95 16.95C16.56 17.34 16.56 17.98 16.95 18.36L18.01 19.42C18.4 19.81 19.04 19.81 19.42 19.42C19.81 19.03 19.81 18.39 19.42 18.01L18.36 16.95ZM19.42 5.99C19.81 5.6 19.81 4.96 19.42 4.58C19.03 4.19 18.39 4.19 18.01 4.58L16.95 5.64C16.56 6.03 16.56 6.67 16.95 7.05C17.34 7.43 17.98 7.44 18.36 7.05L19.42 5.99ZM7.05 18.36C7.44 17.97 7.44 17.33 7.05 16.95C6.66 16.56 6.02 16.56 5.64 16.95L4.58 18.01C4.19 18.4 4.19 19.04 4.58 19.42C4.97 19.8 5.61 19.81 5.99 19.42L7.05 18.36Z"
        fill="currentColor"
      />
    </g>
  </SlottedSVG>
);

interface TopNavWrapperProps {
  appTitle: string;
  status: string;
  shortTitle: string;
  version: string;
}

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme, oppositeTheme } = useTheme();

  return (
    <ic-navigation-button
      label={`Turn on ${oppositeTheme} mode`}
      slot="buttons"
      onClick={toggleTheme}
    >
      {theme === "dark" ? <LightIcon /> : <DarkIcon />}
    </ic-navigation-button>
  );
};

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

    <ThemeToggleButton />
  </ic-top-navigation>
);

export default TopNavWrapper;
