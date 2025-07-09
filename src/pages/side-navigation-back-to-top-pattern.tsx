import React from "react";
import { PageProps } from "gatsby";
import {
  IcBackToTop,
  IcClassificationBanner,
  IcDivider,
  IcFooter,
  IcFooterLink,
  IcNavigationItem,
  IcSectionContainer,
  IcSideNavigation,
  IcSkipLink,
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
  mdiWeb,
} from "@mdi/js";

const SideNavigationBackToTopPattern: React.FC<PageProps> = () => {
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
  });

  const classes = useStyles();

  const alignment: IcAlignment = "center";

  return (
    <div id="side-nav-back-to-top-pattern-root">
      <div className={classes.parentDiv}>
        <IcClassificationBanner />
        <IcSkipLink target="main" />
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
          <main id="main" className={classes.main}>
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
          <IcBackToTop target="main" />
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

export default SideNavigationBackToTopPattern;
