import React from "react";
import clsx from "clsx";
import { Link as GatsbyLink } from "gatsby";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";
import { IcButtonVariants } from "@ukic/web-components";
import icdsHero from "../../../static/icds-hero.png";
import backgroundImage from "../../../static/background-image.png";
import backgroundImageDarkMode from "../../../static/background-image-dark-mode.png";
import {
  Accessibility,
  AccessibilityDark,
  Components,
  ComponentsDark,
  Patterns,
  PatternsDark,
  Styles,
  StylesDark,
} from "../../content/structured/get-started/images/card-icons";
import { DesignImage, DevImage } from "../../assets/svg";

import "./index.css";
import { useViewportWidth } from "../../utils/helpers";
import { useTheme } from "../../context/ThemeContext";

const { homepage } = require("../../config");

interface homepageCardItem {
  description: string;
  path: string;
  title: string;
}

const Homepage: React.FC = () => {
  const { theme } = useTheme();

  const renderImage = (image: string) => {
    if (useViewportWidth() < 577) return null;

    switch (image) {
      case "Accessibility":
        return (
          <img
            src={theme === "light" ? Accessibility : AccessibilityDark}
            alt="An accessibility icon"
            loading="lazy"
            slot="image"
            aria-hidden="true"
          />
        );
      case "Styles":
        return (
          <img
            src={theme === "light" ? Styles : StylesDark}
            alt="A h1, h2 and h3 element"
            loading="lazy"
            slot="image"
            aria-hidden="true"
          />
        );
      case "Components":
        return (
          <img
            src={theme === "light" ? Components : ComponentsDark}
            alt="A diamond shape split into four sections"
            loading="lazy"
            slot="image"
            aria-hidden="true"
          />
        );
      case "Patterns":
        return (
          <img
            src={theme === "light" ? Patterns : PatternsDark}
            alt="A collection of elements on a page"
            loading="lazy"
            slot="image"
            aria-hidden="true"
          />
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
        disable-background-parallax="true"
      >
        <ic-link
          theme="dark"
          monochrome
          slot="interaction"
          id="get-started-link"
        >
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
      <ic-section-container aligned="center" full-height="true">
        <div className="section">
          <ic-alert
            heading="Not what you were expecting?"
            message="v3.0 is now live, featuring dark mode and new components. Start experimenting now! If you'd prefer, you can still access our v2.0 site."
            variant="info"
          >
            <ic-link
              slot="action"
              monochrome
              href="https://mi6.github.io/ic-design-system-githubpages/v2"
              target="_blank"
              rel="noreferer noopener nofollow"
            >
              Go to v2.0
            </ic-link>
          </ic-alert>
        </div>
        <div className="section">
          <ul className={clsx("cards-container", "explore-cards")}>
            {homepage.cards.content?.map((item: homepageCardItem) => (
              <li key={item.title}>
                <GatsbyLink to={item.path}>
                  <ic-card-horizontal>
                    <ic-typography
                      slot="heading"
                      variant="h4"
                      aria-label={`${item.title}.`}
                    >
                      <h4>{item.title}</h4>
                    </ic-typography>
                    <ic-typography
                      slot="message"
                      variant="body"
                      aria-label={`${item.description}.`}
                    >
                      <p>{item.description}</p>
                    </ic-typography>
                    {renderImage(item.title)}
                  </ic-card-horizontal>
                </GatsbyLink>
              </li>
            ))}
          </ul>
        </div>
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
          <ic-button>
            <GatsbyLink slot="router-item" to={homepage.about.link}>
              {homepage.about.buttonText}
            </GatsbyLink>
          </ic-button>
        </div>
        <hr aria-hidden="true" className="divider" />
        <div className={clsx("section", "display-row")}>
          <div>
            <ic-typography variant="h2" apply-vertical-margins="true">
              {homepage.design.title}
            </ic-typography>
            {homepage.design.content.map((text: string, index: number) => (
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
            <div className="homepage-button-container">
              {homepage.design.button.map(
                (button: {
                  href: string;
                  text: string;
                  variant: IcButtonVariants;
                }) => (
                  <ic-button variant={button.variant}>
                    <GatsbyLink slot="router-item" to={button.href}>
                      {button.text}
                    </GatsbyLink>
                  </ic-button>
                )
              )}
            </div>
          </div>
          <div>
            <DesignImage className="design-image" />
          </div>
        </div>
        <hr aria-hidden="true" className="divider" />
        <div className={clsx("section", "display-row")}>
          <div>
            <DevImage className="dev-image" />
          </div>
          <div>
            <ic-typography variant="h2" apply-vertical-margins="true">
              {homepage.develop.title}
            </ic-typography>
            {homepage.develop.content.map((text: string, index: number) => (
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
            <div className="homepage-button-container">
              {homepage.develop.button.map(
                (button: {
                  href: string;
                  text: string;
                  variant: IcButtonVariants;
                }) => (
                  <ic-button variant={button.variant}>
                    <GatsbyLink slot="router-item" to={button.href}>
                      {button.text}
                    </GatsbyLink>
                  </ic-button>
                )
              )}
            </div>
          </div>
        </div>
        <hr aria-hidden="true" className="divider" />
        <div
          style={{
            backgroundImage: `url( ${
              theme === "light" ? backgroundImage : backgroundImageDarkMode
            } )`,
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        >
          <div className={clsx("section", "with-background-image")}>
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
            <ic-button>
              <GatsbyLink slot="router-item" to={homepage.contribute.link}>
                {homepage.contribute.buttonText}
              </GatsbyLink>
            </ic-button>
          </div>
        </div>
      </ic-section-container>
    </div>
  );
};

export default Homepage;
