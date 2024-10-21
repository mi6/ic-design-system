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
  const [navHeight, setNavHeight] = useState(0);

  const toggleResponsiveNavOpen = () =>
    setResponsiveNavOpen(!responsiveNavOpen);

  const updateNavigationHeight = () => {
    const cookieBanner = document.querySelector("#cookie-banner");
    const cookieBannerHeight = cookieBanner?.clientHeight || 0;
    const topNav = document.querySelector("#site-top-nav");
    const topNavHeight = topNav?.clientHeight || 0;
    const classificationBanner = document.querySelector("#site-banner");
    const classificationBannerHeight = classificationBanner?.clientHeight || 0;

    if (window.scrollY > cookieBannerHeight + topNavHeight) {
      setNavHeight(window.innerHeight - classificationBannerHeight);
    } else {
      const size =
        window.innerHeight -
        (cookieBannerHeight + topNavHeight - window.scrollY) -
        classificationBannerHeight;
      setNavHeight(size);
    }
  };

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  const isBrowser = () => typeof window !== "undefined";

  const isCurrentPage = (url: string, isParentPage: boolean) => {
    if (!isBrowser()) return false;

    const currentPath = window.location.pathname;

    return (
      currentPath === url ||
      currentPath === `${url}/` ||
      new RegExp(`${url}$`).test(currentPath) ||
      (!isParentPage && currentPath.includes(url))
    );
  };

  const renderTreeItems = (item: TreeItem) => {
    let hasChildren = item.children && item.children.length > 0;

    if (item.data.fields.navSection === "components" && hasChildren) {
      hasChildren = false;
    }

    /* eslint-disable no-undef */
    const handleMouseOver = (e: React.MouseEvent<HTMLIcTreeItemElement>) => {
      const target = e.target as HTMLIcTreeItemElement;
      const tooltip = target.shadowRoot?.querySelector(
        "ic-tooltip"
      ) as HTMLIcTooltipElement;
      /* eslint-enable no-undef */
      tooltip?.setExternalPopperProps({
        strategy: "fixed",
      });
      const pageHeader = document.querySelector("ic-page-header");
      if (pageHeader && pageHeader.getAttribute("sticky-desktop-only")) {
        pageHeader.classList.add("temp-remove-sticky");
      }
    };

    const handleMouseOut = () => {
      const pageHeader = document.querySelector("ic-page-header");
      if (pageHeader && pageHeader.getAttribute("sticky-desktop-only")) {
        pageHeader.classList.remove("temp-remove-sticky");
      }
    };

    // eslint-disable-next-line no-undef
    const handleKeyUp = (e: React.KeyboardEvent<HTMLIcTreeItemElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleNavigation(item.data.fields.slug);
      }
    };

    const isChildSelected = (treeItem: TreeItem) => {
      const isOverviewSelected = isCurrentPage(
        treeItem.data.fields.slug,
        false
      );

      const isAnyChildSelected = treeItem.children.some((child: any) =>
        isCurrentPage(child.data.fields.slug, false)
      );

      return isOverviewSelected || isAnyChildSelected;
    };

    return (
      <IcTreeItem
        key={item.data.id}
        label={item.data.frontmatter.title}
        selected={!hasChildren && isCurrentPage(item.data.fields.slug, false)}
        expanded={hasChildren && isChildSelected(item)}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onIcTreeItemSelected={() =>
          sessionStorage.setItem("navlinkclick", "true")
        }
        {...(!hasChildren && {
          onClick: (e) => {
            e.preventDefault();
            handleNavigation(item.data.fields.slug);
          },
          onKeyUp: handleKeyUp,
        })}
      >
        {hasChildren && (
          <IcTreeItem
            key={item.data.id}
            label="Overview"
            aria-label={`Overview of ${item.data.frontmatter.title}`}
            selected={isCurrentPage(item.data.fields.slug, true)}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation(item.data.fields.slug);
            }}
            onKeyUp={handleKeyUp}
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
        /* eslint-disable no-undef */
        const currentEl = document.querySelector(
          ".ic-tree-item-selected"
        ) as HTMLIcTreeItemElement;
        /* eslint-enable no-undef */
        if (currentEl) currentEl.setFocus();
      }, 300);
    }
    window.addEventListener("scroll", updateNavigationHeight);
    window.addEventListener("resize", updateNavigationHeight);
    return () => {
      window.removeEventListener("scroll", updateNavigationHeight);
      window.removeEventListener("resize", updateNavigationHeight);
    };
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
          "scroll",
          responsiveNavOpen && "small-only"
        )}
        style={
          (!responsiveNavOpen &&
            navHeight > 0 && { height: `${navHeight}px` }) ||
          {}
        }
        focusInset
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
