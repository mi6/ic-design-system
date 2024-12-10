import React, { useState } from "react";
import {
  IcAlert,
  IcNavigationButton,
  IcSectionContainer,
  IcTheme,
  IcTopNavigation,
  IcTypography,
  SlottedSVG,
} from "@ukic/react";

import { createUseStyles } from "react-jss";
import { PageProps } from "gatsby";

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

const TopNavigation: React.FC<PageProps> = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const useStyles = createUseStyles({
    main: {
      minHeight: "100vh",
      display: "flex",
      background: "var(--ic-color-background-primary)",
    },
    mainContentDiv: {
      border: "var(--ic-border-width) dashed var(--ic-architectural-400)",
      padding: "var(--ic-space-md)",
      flex: 1,
    },
    mainSectionContainer: { display: "flex", flex: 1 },
  });
  const classes = useStyles();

  return (
    <IcTheme theme={theme}>
      <IcTopNavigation
        appTitle="[Enter your application name]"
        status="alpha"
        version="v0.0.7"
      >
        <SlottedSVG
          slot="app-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#000000"
          width="24"
          height="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" />
        </SlottedSVG>
        <IcNavigationButton
          label={`Turn on ${theme === "light" ? "dark" : "light"} mode`}
          slot="buttons"
          onClick={toggleTheme}
        >
          {theme === "light" ? <DarkIcon /> : <LightIcon />}
        </IcNavigationButton>
      </IcTopNavigation>
      <main className={classes.main}>
        <IcSectionContainer className={classes.mainSectionContainer}>
          <div className={classes.mainContentDiv}>
            <IcAlert heading="See how the content changes!" variant="info" />
            <IcTypography variant="h2">
              <h2>
                Click the button in the top-navigation to change between light
                and dark mode...
              </h2>
            </IcTypography>
          </div>
        </IcSectionContainer>
      </main>
    </IcTheme>
  );
};
export default TopNavigation;
