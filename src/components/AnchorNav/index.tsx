import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Link } from "gatsby";

import { IcTypography } from "@ukic/react";

import "./index.css";
import { Heading } from "../../sharedTypes";

const { slug } = require("github-slugger");

interface AnchorNavProps {
  allHeadings: Heading[];
  currentPage: string;
  section: string;
}

const AnchorNav: React.FC<AnchorNavProps> = ({
  allHeadings,
  currentPage,
  section,
}) => {
  const headings = allHeadings.filter((heading) => heading.depth === 2);

  const headingIds = headings.map((heading) => slug(heading.value));

  const [activeId, setActiveId] = useState(headingIds[0]);

  useEffect(() => {
    setActiveId(headingIds[0]);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `10% 0% -80% 0%` }
    );

    headingIds.forEach((id) => {
      const heading = document.getElementById(id);
      if (heading) {
        observer.observe(heading!);
      }
    });

    return () => {
      headingIds.forEach((id) => {
        const heading = document.getElementById(id);
        if (heading) {
          observer.unobserve(heading!);
        }
      });
    };
  }, [currentPage]);

  const handleLinkSelect = (
    e: React.MouseEvent | React.KeyboardEvent,
    headingId: string
  ) => {
    // Move focus to heading when link is selected using Enter key
    if (e.detail === 0) {
      document
        .querySelector<HTMLAnchorElement>(`a[href='#${headingId}`)
        ?.focus();
    }
  };

  const getNavListItem = (heading: Heading) => {
    const headingId = slug(heading.value);
    const isActive = headingId === activeId;

    return (
      <li className={clsx("nav-list-item", isActive && "active-nav-list-item")}>
        <Link
          className={clsx("nav-link", isActive && "active-nav-link")}
          to={`#${headingId}`}
          onClick={(e) => handleLinkSelect(e, headingId)}
          onKeyPress={(e) => handleLinkSelect(e, headingId)}
        >
          <IcTypography variant={isActive ? "subtitle-large" : "body"}>
            {heading.value}
          </IcTypography>
        </Link>
      </li>
    );
  };

  if (headings.length > 0) {
    return (
      <div className="side-nav">
        <nav aria-label={`${section} section contents`} className="nav">
          <div className="contents-header">
            <IcTypography variant="subtitle-large">Contents</IcTypography>
          </div>
          <ul className="list">
            <div className="nav-list-items-container">
              {headings.map((heading) => getNavListItem(heading))}
            </div>
          </ul>
        </nav>
      </div>
    );
  }

  return null;
};

export default AnchorNav;
