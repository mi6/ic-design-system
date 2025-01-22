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
      <ic-hero
        heading={homepage.hero.title}
        subheading={homepage.hero.text}
        aligned="center"
        background-image={icdsHero}
      >
        <ic-link appearance="light" slot="interaction" id="get-started-link">
          <GatsbyLink slot="router-item" to="/get-started">
            <ic-typography variant="h4">
              Get started
              <Icon
                path={mdiArrowRight}
                size={1}
                className="get-started-arrow"
              />
            </ic-typography>
          </GatsbyLink>
        </ic-link>
      </ic-hero>
      <ic-section-container aligned="center" full-height>
        <div className="section">
          <ic-alert
            heading="Design System and UI Kit v3.0 now in pre-release"
            message="Start experimenting with Dark Mode, new components and more today!"
            variant="info"
          >
            <ic-link
              slot="action"
              appearance="dark"
              href="https://mi6.github.io/ic-design-system-githubpages/branches/v3.0.0/develop"
              target="_blank"
              rel="noreferer noopener nofollow"
            >
              Go to v3.0
            </ic-link>
          </ic-alert>
        </div>
        <div className="section">
          <ul className={clsx("cards-container", "explore-cards")}>
            {homepage.cards.content &&
              homepage.cards.content.map((item: homepageCardItem) => (
                <li key={item.title}>
                  <GatsbyLink to={item.path}>
                    <ic-card message={item.description} full-width>
                      <ic-typography
                        slot="heading"
                        variant="h4"
                        aria-label={`${item.title}.`}
                      >
                        <h4>{item.title}</h4>
                      </ic-typography>
                      {renderIcon(item.icon)}
                    </ic-card>
                  </GatsbyLink>
                </li>
              ))}
          </ul>
        </div>
        <hr aria-hidden="true" className="divider" />
        <div className="section">
          <ic-typography variant="h2" apply-vertical-margins="true">
            {homepage.about.title}
          </ic-typography>
          {homepage.about.content.map((text: string, index: number) => (
            <ic-typography
              variant="body"
              data-class="text-content"
              apply-vertical-margins="true"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              {text}
            </ic-typography>
          ))}
          <ic-typography variant="body">
            <ic-link href={withPrefix(homepage.about.link)}>
              {homepage.about.linkText}
            </ic-link>
          </ic-typography>
        </div>
        <hr aria-hidden="true" className="divider" />
        <div className="section">
          <ic-typography variant="h2" apply-vertical-margins="true">
            <h2>{homepage.contribute.title}</h2>
          </ic-typography>
          {homepage.contribute.content.map((text: string, index: number) => (
            <ic-typography
              variant="body"
              data-class="text-content"
              apply-vertical-margins="true"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              {text}
            </ic-typography>
          ))}
          <ic-typography variant="body">
            <ic-link href={withPrefix(homepage.contribute.link)}>
              {homepage.contribute.linkText}
            </ic-link>
          </ic-typography>
        </div>
        <hr aria-hidden="true" className="divider" />
        <div className="section">
          <ic-typography variant="h2" apply-vertical-margins="true">
            {homepage.resources.title}
          </ic-typography>
          {homepage.resources.content.map((text: string[], index: number) => (
            <ic-typography
              variant="body"
              data-class="text-content"
              apply-vertical-margins="true"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              {text}
            </ic-typography>
          ))}
          <ul className={clsx("cards-container", "resources-cards")}>
            {homepage.resources.cards &&
              homepage.resources.cards.map((item: homepageCardItem) => (
                <li key={item.title}>
                  <GatsbyLink to={item.path}>
                    <ic-card
                      heading={item.title}
                      message={item.description}
                      full-width
                    />
                  </GatsbyLink>
                </li>
              ))}
          </ul>
        </div>
      </ic-section-container>
    </div>
  );
};

export default Homepage;
