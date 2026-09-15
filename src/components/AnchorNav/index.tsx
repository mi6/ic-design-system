import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Link } from "gatsby";

import "./index.css";
import { Heading } from "../../sharedTypes";

const { slug } = require("github-slugger");

interface AnchorNavProps {
  allHeadings: Heading[];
  currentPage: string;
  id?: string;
}

const AnchorNav: React.FC<AnchorNavProps> = ({
  allHeadings,
  currentPage,
  id,
}) => {
  const headings = allHeadings.filter(({ depth }) => depth === 2);

  const headingIds = headings.map(({ value }) => slug(value));

  const [activeId, setActiveId] = useState(headingIds[0]);

  useEffect(() => {
    setActiveId(headingIds[0]);

    const updateActiveHeading = () => {
      const headingElements = headingIds
        .map((headingId) => document.getElementById(headingId))
        .filter((heading): heading is HTMLElement => heading !== null);

      if (headingElements.length === 0) {
        return;
      }

      const activationLine = Math.min(window.innerHeight * 0.3, 240);
      const atPageBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 1;

      const activeHeading = atPageBottom
        ? headingElements[headingElements.length - 1]
        : [...headingElements]
            .reverse()
            .find(
              (heading) => heading.getBoundingClientRect().top <= activationLine
            ) || headingElements[0];

      setActiveId(activeHeading.id);
    };

    updateActiveHeading();
    window.addEventListener("scroll", updateActiveHeading, { passive: true });
    window.addEventListener("resize", updateActiveHeading);

    return () => {
      window.removeEventListener("scroll", updateActiveHeading);
      window.removeEventListener("resize", updateActiveHeading);
    };
  }, [currentPage]);

  const handleLinkSelect = (
    e: React.MouseEvent<HTMLAnchorElement>,
    headingId: string
  ): void => {
    const heading = document.getElementById(headingId);

    if (heading) {
      e.preventDefault();
      window.history.pushState(null, "", `#${headingId}`);
      heading.scrollIntoView({ block: "start" });
      heading.focus({ preventScroll: true });
      setActiveId(headingId);
    }

    // reset the active class on current tab
    setTimeout(() => {
      const tabId = sessionStorage.getItem("currTab");
      if (tabId !== "") {
        document
          .querySelector(`#${tabId}`)
          ?.firstElementChild!.classList.add("active");
      }
    }, 300);
  };

  const getNavListItem = (value: string, index: number) => {
    const headingId = headingIds[index];
    const isActive = headingId === activeId;

    return (
      <li
        className={clsx("nav-list-item", isActive && "active-nav-list-item")}
        key={value}
      >
        <Link
          className={clsx("nav-link", isActive && "active-nav-link")}
          to={`#${headingId}`}
          onClick={(e) => handleLinkSelect(e, headingId)}
          title={value}
        >
          <ic-typography variant={isActive ? "subtitle-large" : "body"}>
            {value}
          </ic-typography>
        </Link>
      </li>
    );
  };

  let currentPageName = currentPage.substring(currentPage.lastIndexOf("/") + 1);
  let currTab = "guidance";

  if (currentPageName === "code" || currentPageName === "accessibility") {
    currTab = currentPageName;
    currentPageName = currentPage
      .replace(`/${currentPageName}`, "")
      .replace("/components/", "");
  }

  return headings.length > 0 ? (
    <div className="side-nav" id={id}>
      <nav
        aria-label={`${currentPageName} ${currTab} page contents`}
        className="nav"
      >
        <div className="contents-header">
          <ic-typography variant="subtitle-large">Contents</ic-typography>
        </div>
        <ul className="nav-item-list">
          {headings.map(({ value }, index) => getNavListItem(value, index))}
        </ul>
      </nav>
    </div>
  ) : null;
};

export default AnchorNav;
