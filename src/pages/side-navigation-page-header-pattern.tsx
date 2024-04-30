import React from "react";
import { PageProps } from "gatsby";
import {
  IcBreadcrumb,
  IcBreadcrumbGroup,
  IcButton,
  IcChip,
  IcClassificationBanner,
  IcDivider,
  IcFooter,
  IcFooterLink,
  IcNavigationItem,
  IcPageHeader,
  IcSectionContainer,
  IcSideNavigation,
  IcTextField,
  IcTypography,
  SlottedSVG,
} from "@ukic/react";
import { IcAlignment } from "@ukic/web-components";
import { createUseStyles } from "react-jss";
import {
  mdiChartTimelineVariant,
  mdiCogOutline,
  mdiCommentTextOutline,
  mdiCompassOutline,
  mdiHomeOutline,
  mdiHuman,
  mdiMagnify,
  mdiNumeric1BoxOutline,
  mdiNumeric2BoxOutline,
  mdiNumeric3BoxOutline,
  mdiNumeric4BoxOutline,
  mdiPlus,
  mdiWeb,
} from "@mdi/js";

const SideNavigationPattern: React.FC<PageProps> = () => {
  const useStyles = createUseStyles({
    contentDivContainer: {
      display: "flex",
      flexDirection: "column",
      flexGrow: "1",
    },
    mainContentDiv: {
      border: "var(--ic-border-width) dashed var(--ic-architectural-400)",
      padding: "var(--ic-space-md)",
      flex: 1,
    },
    parentDiv: { display: "flex", height: "100%" },
    main: { minHeight: "100vh", display: "flex" },
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
    <div id="side-nav-page-header-pattern-root">
      <div className={classes.parentDiv}>
        <IcClassificationBanner />
        <IcSideNavigation
          appTitle="[Enter your application name]"
          status="alpha"
          version="v0.0.7"
        >
          <SlottedSVG
            slot="app-icon"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            path={mdiCompassOutline}
          />
          <IcNavigationItem
            slot="primary-navigation"
            label="[navigationOption]"
            href="#"
            selected
          >
            <SlottedSVG
              slot="icon"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              path={mdiHomeOutline}
            />
          </IcNavigationItem>
          <IcNavigationItem
            slot="primary-navigation"
            label="[navigationOption]"
            href="#"
          >
            <SlottedSVG
              slot="icon"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              path={mdiMagnify}
            />
          </IcNavigationItem>
          <IcNavigationItem
            slot="primary-navigation"
            label="[navigationOption]"
            href="#"
          >
            <SlottedSVG
              slot="icon"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              path={mdiChartTimelineVariant}
            />
          </IcNavigationItem>
          <IcNavigationItem
            slot="primary-navigation"
            label="[navigationOption]"
            href="#"
          >
            <SlottedSVG
              slot="icon"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              path={mdiCommentTextOutline}
            />
          </IcNavigationItem>
          <IcDivider slot="primary-navigation" />
          <IcNavigationItem
            slot="primary-navigation"
            label="[navigationOption]"
            href="#"
          >
            <SlottedSVG
              slot="icon"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              path={mdiNumeric1BoxOutline}
            />
          </IcNavigationItem>
          <IcNavigationItem
            slot="primary-navigation"
            label="[navigationOption]"
            href="#"
          >
            <SlottedSVG
              slot="icon"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              path={mdiNumeric2BoxOutline}
            />
          </IcNavigationItem>
          <IcNavigationItem
            slot="primary-navigation"
            label="[navigationOption]"
            href="#"
          >
            <SlottedSVG
              slot="icon"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              path={mdiNumeric3BoxOutline}
            />
          </IcNavigationItem>
          <IcNavigationItem
            slot="primary-navigation"
            label="[navigationOption]"
            href="#"
          >
            <SlottedSVG
              slot="icon"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              path={mdiNumeric4BoxOutline}
            />
          </IcNavigationItem>
          <IcNavigationItem
            slot="secondary-navigation"
            label="[navigationOption]"
            href="#"
          >
            <SlottedSVG
              slot="icon"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              path={mdiCogOutline}
            />
          </IcNavigationItem>
          <IcNavigationItem
            slot="secondary-navigation"
            label="[navigationOption]"
            href="#"
          >
            <SlottedSVG
              slot="icon"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              path={mdiHuman}
            />
          </IcNavigationItem>
          <IcNavigationItem
            slot="secondary-navigation"
            label="[navigationOption]"
            href="#"
          >
            <SlottedSVG
              slot="icon"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              path={mdiWeb}
            />
          </IcNavigationItem>
        </IcSideNavigation>
        <div className={classes.contentDivContainer}>
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
                height="24"
                viewBox="0 0 24 24"
                width="24"
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
              aligned={alignment}
              className={classes.mainSectionContainer}
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
                height="48"
                viewBox="0 0 24 24"
                width="48"
                fill="#FFFFFF"
              >
                <path
                  d="M12 6.19L17 10.69V18.5H15V12.5H9V18.5H7V10.69L12 6.19ZM12 3.5L2 12.5H5V20.5H11V14.5H13V20.5H19V12.5H22L12 3.5Z"
                  fill="currentColor"
                />
              </SlottedSVG>
            </IcFooterLink>
          </IcFooter>
        </div>
      </div>
    </div>
  );
};

export default SideNavigationPattern;
