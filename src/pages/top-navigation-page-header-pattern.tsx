import React from "react";
import {
  IcBreadcrumb,
  IcBreadcrumbGroup,
  IcButton,
  IcChip,
  IcClassificationBanner,
  IcFooter,
  IcFooterLink,
  IcNavigationButton,
  IcNavigationItem,
  IcPageHeader,
  IcSearchBar,
  IcSectionContainer,
  IcTextField,
  IcTopNavigation,
  IcTypography,
  SlottedSVG,
} from "@ukic/react";

import { mdiAccount, mdiCog, mdiPencil, mdiPlus } from "@mdi/js";
import { createUseStyles } from "react-jss";
import { PageProps } from "gatsby";
import { IcAlignment } from "@ukic/web-components";

const TopNavigationWithPageHeader: React.FC<PageProps> = () => {
  const useStyles = createUseStyles({
    main: { minHeight: "100vh", display: "flex" },
    mainContentDiv: {
      border: "var(--ic-border-width) dashed var(--ic-architectural-400)",
      padding: "var(--ic-space-md)",
      flex: 1,
    },
    mainSectionContainer: { display: "flex", flex: 1 },
    inputArea: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--ic-space-md)",
      "@media screen and (max-width: 320px)": {
        gap: "var(--ic-space-xs)",
      },
    },
    textField: {
      "--input-width": "21.5rem",
      "@media screen and (max-width: 768px)": {
        "--input-width": "100%",
        flex: "1 1 0",
      },
    },
  });
  const classes = useStyles();
  const alignment: IcAlignment = "center";
  const pageHeaderAlignment: IcAlignment = "center";
  return (
    <>
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
      <IcPageHeader
        heading="Page header"
        subheading="This is a page header component with additional functionality and this is the text."
        reverseOrder
        aligned={pageHeaderAlignment || alignment}
      >
        <IcChip slot="heading-adornment" label="BETA" size="large" />
        <IcBreadcrumbGroup slot="breadcrumbs">
          <IcBreadcrumb pageTitle="Breadcrumb 1" href="#" />
          <IcBreadcrumb pageTitle="Breadcrumb 2" href="#" />
          <IcBreadcrumb pageTitle="Breadcrumb 3" href="#" />
          <IcBreadcrumb pageTitle="Breadcrumb 4" href="#" />
          <IcBreadcrumb pageTitle="Breadcrumb 5" href="#" />
          <IcBreadcrumb current pageTitle="Breadcrumb 6" href="#" />
        </IcBreadcrumbGroup>
        <IcButton slot="actions" variant="primary">
          <SlottedSVG
            slot="left-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            path={mdiPlus}
          />
          Primary button
        </IcButton>
        <IcButton slot="actions" variant="tertiary">
          Tertiary button
        </IcButton>
        <div className={classes.inputArea} slot="input">
          <IcTextField
            className={classes.textField}
            placeholder="Enter your input..."
            label="Input"
            hideLabel
          />
          <IcButton>Submit</IcButton>
        </div>
      </IcPageHeader>
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
        description="This pattern was built using the Intelligence Community Design System (ICDS)."
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
    </>
  );
};
export default TopNavigationWithPageHeader;
