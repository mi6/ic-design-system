import React from "react";
import clsx from "clsx";
import { Link as GatsbyLink, withPrefix } from "gatsby";
import Icon from "@mdi/react";
import {
  mdiHumanHandsup,
  mdiPaletteSwatch,
  mdiPuzzle,
  mdiViewDashboard,
  mdiArrowRight,
} from "@mdi/js";
import {
  IcSectionContainer,
  IcLink,
  IcCard,
  IcTypography,
  IcHero,
} from "@ukic/react";
import icdsHero from "../../../static/icds-hero.jpg";

import "./index.css";

const { homepage } = require("../../config");

interface homepageCardItem {
  description: string;
  path: string;
  title: string;
  icon: string;
}

const Homepage: React.FC = () => {
  const renderIcon = (icon: string) => {
    switch (icon) {
      case "AccessibilityIcon":
        return (
          <span slot="icon">
            <Icon path={mdiHumanHandsup} size={1} className="card-icon" />
          </span>
        );
      case "StyleOutlinedIcon":
        return (
          <span slot="icon">
            <Icon path={mdiPaletteSwatch} size={1} className="card-icon" />
          </span>
        );
      case "ExtensionOutlinedIcon":
        return (
          <span slot="icon">
            <Icon path={mdiPuzzle} size={1} className="card-icon" />
          </span>
        );
      case "DashboardOutlinedIcon":
        return (
          <span slot="icon">
            <Icon path={mdiViewDashboard} size={1} className="card-icon" />
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="homepage">
      <IcHero
        heading={homepage.hero.title}
        subheading={homepage.hero.text}
        aligned="center"
        backgroundImage={icdsHero}
      >
        <IcLink variant="light" slot="interaction" className="get-started-link">
          <GatsbyLink slot="router-item" to="/get-started">
            <IcTypography variant="h4">
              Get started
              <Icon
                path={mdiArrowRight}
                size={1}
                className="get-started-arrow"
              />
            </IcTypography>
          </GatsbyLink>
        </IcLink>
      </IcHero>
      <IcSectionContainer aligned="center" fullHeight>
        <div className="section">
          <IcTypography variant="h2">{homepage.cards.title}</IcTypography>
          <ul className={clsx("cards-container", "explore-cards")}>
            {homepage.cards.content &&
              homepage.cards.content.map((item: homepageCardItem) => (
                <li>
                  <GatsbyLink to={item.path}>
                    <IcCard
                      heading={item.title}
                      message={item.description}
                      fullWidth
                      className="card"
                    >
                      {renderIcon(item.icon)}
                    </IcCard>
                  </GatsbyLink>
                </li>
              ))}
          </ul>
        </div>
        <hr aria-hidden="true" className="divider" />
        <div className="section">
          <IcTypography variant="h2" spacing>
            {homepage.about.title}
          </IcTypography>
          {homepage.about.content.map((text: string[]) => (
            <IcTypography variant="body" className="text-content" spacing>
              {text}
            </IcTypography>
          ))}
          <IcTypography variant="body">
            <IcLink href={withPrefix(homepage.about.link)}>
              {homepage.about.linkText}.
            </IcLink>
          </IcTypography>
        </div>
        <hr aria-hidden="true" className="divider" />
        <div className="section">
          <IcTypography variant="h2" spacing>
            <h2>{homepage.contribute.title}</h2>
          </IcTypography>
          {homepage.contribute.content.map((text: string[]) => (
            <IcTypography variant="body" className="text-content" spacing>
              {text}
            </IcTypography>
          ))}
          <IcTypography variant="body">
            <IcLink href={withPrefix(homepage.contribute.link)}>
              {homepage.contribute.linkText}.
            </IcLink>
          </IcTypography>
        </div>
        <hr aria-hidden="true" className="divider" />
        <div className="section">
          <IcTypography variant="h2" spacing>
            {homepage.resources.title}
          </IcTypography>
          {homepage.resources.content.map((text: string[]) => (
            <IcTypography variant="body" className="text-content" spacing>
              {text}
            </IcTypography>
          ))}
          <ul className={clsx("cards-container", "resources-cards")}>
            {homepage.resources.cards &&
              homepage.resources.cards.map((item: homepageCardItem) => (
                <li>
                  <GatsbyLink to={item.path}>
                    <IcCard
                      heading={item.title}
                      message={item.description}
                      fullWidth
                      className="card"
                    />
                  </GatsbyLink>
                </li>
              ))}
          </ul>
        </div>
      </IcSectionContainer>
    </div>
  );
};

export default Homepage;
