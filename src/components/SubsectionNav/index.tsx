import React, { FocusEvent, useState, useEffect } from "react";
import clsx from "clsx";
import { arrayToTree, TreeItem } from "performant-array-to-tree";
import { navigate } from "gatsby";

import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";
import { IcTreeItem, IcTreeView } from "@ukic/canary-react";

import "./index.css";
import { NavigationObject } from "../../sharedTypes";

interface SubsectionNavProps {
  allStructuredNav: NavigationObject[];
  section: string;
  currentPage: string;
}

const getNavTree = (
  navFromGraphQl: NavigationObject[],
  section: string,
  currentPage: string
): TreeItem | undefined => {
  navFromGraphQl.sort(
    (a, b) =>
      +(a.frontmatter.navPriority === null) -
        +(b.frontmatter.navPriority === null) ||
      +(a.frontmatter.navPriority! > b.frontmatter.navPriority!) ||
      -(a.frontmatter.navPriority! < b.frontmatter.navPriority!)
  );

  const tree = arrayToTree(navFromGraphQl, {
    id: "fields.slug",
    parentId: "fields.navParent",
    rootParentIds: { NONE: true },
  });

  const select = (
    array: TreeItem[],
    value: string,
    object: { selected: boolean }
  ): boolean => {
    let found = false;
    array.forEach((result) => {
      if (
        result.data.fields.slug === value ||
        select(result.children || [], value, object)
      ) {
        found = true;
        Object.assign(result, object);
      }
    });
    return found;
  };

  select(tree, currentPage, { selected: true });

  return tree.find((el) => el.data.fields.navSection === section);
};

const SubsectionNav: React.FC<SubsectionNavProps> = ({
  allStructuredNav,
  section,
  currentPage,
}) => {
  const currentNavSection = getNavTree(allStructuredNav, section, currentPage);

  const isRoot = currentNavSection?.data.fields.navParent === "NONE";

  const [responsiveNavOpen, setResponsiveNavOpen] = useState(false);

  const toggleResponsiveNavOpen = () =>
    setResponsiveNavOpen(!responsiveNavOpen);

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  const isBrowser = () => typeof window !== "undefined";

  const isCurrentPage = (url: string, isParentPage: boolean) =>
    isBrowser() &&
    (window.location.pathname === url ||
      window.location.pathname === `${url}/` ||
      (!isParentPage && window.location.pathname.includes(url)));

  const renderTreeItems = (item: TreeItem) => {
    let hasChildren = item.children && item.children.length > 0;

    if (item.data.fields.navSection === "components" && hasChildren) {
      hasChildren = false;
    }

    return (
      <IcTreeItem
        key={item.data.id}
        label={item.data.frontmatter.title}
        selected={!hasChildren && isCurrentPage(item.data.fields.slug, false)}
        {...(!hasChildren && {
          onClick: (e) => {
            e.preventDefault();
            handleNavigation(item.data.fields.slug);
          },
        })}
      >
        {hasChildren && (
          <IcTreeItem
            key={item.data.id}
            label="Overview"
            aria-label={`Overview of ${item.data.frontmatter.title}`}
            selected={isCurrentPage(item.data.fields.slug, false)}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation(item.data.fields.slug);
            }}
          />
        )}
        {hasChildren &&
          item.children.map((child: TreeItem) => renderTreeItems(child))}
      </IcTreeItem>
    );
  };

  useEffect(() => {
    const linkClick = sessionStorage.getItem("navlinkclick");
    sessionStorage.setItem("navlinkclick", "false");
    if (linkClick === "true") {
      setTimeout(() => {
        const currentEl = document.querySelector(
          ".ic-tree-item-selected"
        ) as HTMLElement;
        if (currentEl) currentEl.focus();
      }, 300);
    }
  }, []);

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    // If not clicking on the elements of the tree view
    if (!(e.relatedTarget?.tagName === "IC-TREE-ITEM")) {
      setResponsiveNavOpen(false);
    }
  };

  return (
    <>
      <ic-link id="skip-page-content-link" href="#page-content">
        Skip to page content
      </ic-link>
      <ic-button
        variant="secondary"
        id="nav-section-button"
        data-class={clsx(responsiveNavOpen && "small-only-open")}
        onClick={toggleResponsiveNavOpen}
        aria-controls="icds-section-nav"
        aria-expanded={responsiveNavOpen ? "true" : "false"}
        full-width
        onBlur={handleBlur}
      >
        {responsiveNavOpen ? "Hide" : "Show"} navigation section
        <div slot="icon">
          <Icon
            path={mdiChevronDown}
            className={clsx(
              "menu-chevron",
              responsiveNavOpen && "menu-chevron-flipped"
            )}
          />
        </div>
      </ic-button>
      <IcTreeView
        id="icds-section-nav"
        class={clsx(
          "tree-view-container",
          "large-only",
          responsiveNavOpen && "small-only"
        )}
      >
        {isRoot && (
          <IcTreeItem
            label={currentNavSection.data.frontmatter.title}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation(currentNavSection.data.fields.slug);
            }}
            selected={isCurrentPage(currentNavSection.data.fields.slug, true)}
          />
        )}
        {currentNavSection &&
          currentNavSection.children.map((child: TreeItem) =>
            renderTreeItems(child)
          )}
      </IcTreeView>
    </>
  );
};

export default SubsectionNav;
