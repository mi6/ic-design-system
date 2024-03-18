import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Link } from "gatsby";

import "./index.css";
import { Heading } from "../../sharedTypes";

const { slug } = require("github-slugger");

interface AnchorNavProps {
  allHeadings: Heading[];
  currentPage: string;
}

const AnchorNav: React.FC<AnchorNavProps> = ({ allHeadings, currentPage }) => {
  const headings = allHeadings.filter(({ depth }) => depth === 2);

  const headingIds = headings.map(({ value }) => slug(value));

  const [activeId, setActiveId] = useState(headingIds[0]);

  useEffect(() => {
    setActiveId(headingIds[0]);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) {
            setActiveId(target.id);
          }
        });
      },
      { rootMargin: `20% 0% -70% 0%` }
    );

    headingIds.forEach((id) => {
      const heading = document.getElementById(id);
      if (heading) {
        observer.observe(heading);
      }
    });

    return () => {
      headingIds.forEach((id) => {
        const heading = document.getElementById(id);
        if (heading) {
          observer.unobserve(heading);
        }
      });
    };
  }, [currentPage]);

  const handleLinkSelect = (
    e: React.MouseEvent | React.KeyboardEvent,
    headingId: string
  ): void => {
    // Move focus to heading when link is selected using Enter key
    if (e.detail === 0) {
      document
        .querySelector<HTMLAnchorElement>(`a[href='#${headingId}`)
        ?.focus();
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
      <li className={clsx("nav-list-item", isActive && "active-nav-list-item")}>
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
    <div className="side-nav">
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
