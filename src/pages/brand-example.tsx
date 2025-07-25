import React from "react";
import {
  IcButton,
  IcClassificationBanner,
  IcFooter,
  IcFooterLink,
  IcHero,
  IcNavigationButton,
  IcNavigationItem,
  IcSearchBar,
  IcSectionContainer,
  IcTheme,
  IcTopNavigation,
  IcTypography,
  SlottedSVG,
} from "@ukic/react";

import { mdiAccount, mdiCog, mdiPencil } from "@mdi/js";
import { createUseStyles } from "react-jss";
import { PageProps } from "gatsby";

const TopNavigation: React.FC<PageProps> = () => {
  const alignment = "center";
  const useStyles = createUseStyles({
    main: {
      minHeight: "100vh",
      display: "flex",
      backgroundColor: "var(--ic-color-background-primary-light)",
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
    <IcTheme brandColor="rgb(92, 9, 72)">
      <IcClassificationBanner />
      <IcTopNavigation
        appTitle="[Enter your application name]"
        status="alpha"
        version="v0.0.7"
        contentAligned={alignment}
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
        <IcSearchBar slot="search" placeholder="Search" label="Search" />
        <IcNavigationButton label="Profile" slot="buttons">
          <SlottedSVG
            slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            path={mdiAccount}
          />
        </IcNavigationButton>
        <IcNavigationButton label="Settings" slot="buttons">
          <SlottedSVG
            slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            path={mdiCog}
          />
        </IcNavigationButton>
        <IcNavigationButton label="Edit" slot="buttons">
          <SlottedSVG
            slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            path={mdiPencil}
          />
        </IcNavigationButton>
        <IcNavigationItem
          slot="navigation"
          label="[navigationOption]"
          href="#"
          selected
        />
        <IcNavigationItem
          slot="navigation"
          label="[navigationOption]"
          href="#"
        />
        <IcNavigationItem
          slot="navigation"
          label="[navigationOption]"
          href="#"
        />
        <IcNavigationItem
          slot="navigation"
          label="[navigationOption]"
          href="#"
        />
        <IcNavigationItem
          slot="navigation"
          label="[navigationOption]"
          href="#"
        />
        <IcNavigationItem
          slot="navigation"
          label="[navigationOption]"
          href="#"
        />
      </IcTopNavigation>
      <IcHero
        heading="Example hero"
        subheading="Showing the custom brand colour"
        aligned={alignment}
      >
        <IcButton variant="primary" slot="interaction">
          Primary
        </IcButton>
        <IcButton variant="secondary" slot="interaction">
          Secondary
        </IcButton>
      </IcHero>
      <main className={classes.main}>
        <IcSectionContainer
          className={classes.mainSectionContainer}
          aligned={alignment}
        >
          <div className={classes.mainContentDiv}>
            <IcTypography variant="h2">
              <h2>Example heading</h2>
            </IcTypography>
            <IcTypography variant="subtitle-large">
              <p>Example sub-heading</p>
            </IcTypography>
            <IcTypography>
              <p>
                Remove this div and add your custom content in
                IcSectionContainer.
              </p>
            </IcTypography>
          </div>
        </IcSectionContainer>
      </main>
      <IcFooter
        aligned={alignment}
        caption="This information is exempt under the Freedom of Information Act 2000 (FOIA) and may be exempt under other UK information legislation."
        description="This pattern was built using the Intelligence Community Design
        System (ICDS)."
      >
        <IcFooterLink slot="link" href="">
          [footerLink]
        </IcFooterLink>
        <IcFooterLink slot="link" href="">
          [footerLink]
        </IcFooterLink>
        <IcFooterLink slot="link" href="">
          [footerLink]
        </IcFooterLink>
        <IcFooterLink slot="link" href="">
          [footerLink]
        </IcFooterLink>
        <IcFooterLink slot="link" href="">
          [footerLink]
        </IcFooterLink>
        <IcFooterLink slot="logo" href="/">
          <SlottedSVG
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#FFFFFF"
            width="48"
            height="48"
          >
            <path
              d="M12 6.19L17 10.69V18.5H15V12.5H9V18.5H7V10.69L12 6.19ZM12 3.5L2 12.5H5V20.5H11V14.5H13V20.5H19V12.5H22L12 3.5Z"
              fill="currentColor"
            />
          </SlottedSVG>
        </IcFooterLink>
      </IcFooter>
    </IcTheme>
  );
};
export default TopNavigation;
