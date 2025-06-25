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
  const [treeChange, setTreeChange] = useState(false);

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

    if (!isParentPage) {
      return currentPage.split("/").pop() === url.split("/").pop();
    }
    return (
      currentPath === url ||
      currentPath === `${url}/` ||
      new RegExp(`${url}$`).test(currentPath)
    );
  };

  const setTooltipStrategy = () => {
    const treeItems = document.querySelectorAll("ic-tree-item");
    treeItems.forEach((treeItem) => {
      const tooltip = treeItem.shadowRoot?.querySelector("ic-tooltip");
      if (tooltip)
        tooltip.setExternalPopperProps({
          strategy: "fixed",
        });
    });
  };

  const handleKeyUp = (
    // eslint-disable-next-line no-undef
    e: React.KeyboardEvent<HTMLIcTreeItemElement>,
    treeItem: TreeItem
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      handleNavigation(treeItem.data.fields.slug);
    }
  };

  const renderTreeItems = (item: TreeItem) => {
    let hasChildren = item.children && item.children.length > 0;

    if (item.data.fields.navSection === "components" && hasChildren) {
      hasChildren = false;
    }

    const handleKeyUpParent = (
      // eslint-disable-next-line no-undef
      e: React.KeyboardEvent<HTMLIcTreeItemElement>
    ) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        setTreeChange(true);
        setIsExpanded(!isExpanded);
      }
    };

    const isAnyChildSelected = (treeItem: TreeItem): boolean =>
      treeItem.children.some(
        (child: any) =>
          isCurrentPage(child.data.fields.slug, false) ||
          (hasChildren && isAnyChildSelected(child))
      );

    const isChildSelected = (treeItem: TreeItem) => {
      const isOverviewSelected = isCurrentPage(
        treeItem.data.fields.slug,
        false
      );
      return isOverviewSelected || isAnyChildSelected(treeItem);
    };

    const [isExpanded, setIsExpanded] = useState(
      hasChildren && isChildSelected(item)
    );

    const handleParentClick = () => {
      setTreeChange(true);
      setIsExpanded(!isExpanded);
    };

    return (
      <IcTreeItem
        key={item.data.id}
        label={item.data.frontmatter.title}
        selected={!hasChildren && isCurrentPage(item.data.fields.slug, false)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation(); // Prevent click on child firing parent click handler
          return hasChildren
            ? handleParentClick()
            : handleNavigation(item.data.fields.slug);
        }}
        onKeyUp={(e) =>
          hasChildren ? handleKeyUpParent(e) : handleKeyUp(e, item)
        }
        expanded={isExpanded}
      >
        {hasChildren && (
          <IcTreeItem
            key={item.data.id}
            label="Overview"
            aria-label={`Overview of ${item.data.frontmatter.title}`}
            selected={isCurrentPage(item.data.fields.slug, true)}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleNavigation(item.data.fields.slug);
            }}
            onKeyUp={(e) => handleKeyUp(e, item)}
          />
        )}
        {hasChildren &&
          item.children.map((child: TreeItem) => renderTreeItems(child))}
      </IcTreeItem>
    );
  };

  // eslint-disable-next-line no-undef
  const getTreeItemByUrl = (): HTMLIcTreeItemElement => {
    const selected = document.querySelector(
      "ic-tree-item[selected=true]"
      // eslint-disable-next-line no-undef
    ) as HTMLIcTreeItemElement;
    return selected;
  };

  useEffect(() => {
    const selectedElement = getTreeItemByUrl();
    if (selectedElement) {
      setTimeout(() => {
        selectedElement.setFocus();
        setTooltipStrategy();
      }, 100);
    }

    window.addEventListener("scroll", updateNavigationHeight);
    window.addEventListener("resize", updateNavigationHeight);
    updateNavigationHeight();
    return () => {
      window.removeEventListener("scroll", updateNavigationHeight);
      window.removeEventListener("resize", updateNavigationHeight);
    };
  }, []);

  useEffect(() => {
    if (treeChange === true) {
      setTimeout(() => {
        setTooltipStrategy();
      }, 100);
      setTreeChange(false);
    }
  }, [treeChange]);

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    // If not clicking on the elements of the tree view
    if (!(e.relatedTarget?.tagName === "IC-TREE-ITEM")) {
      setResponsiveNavOpen(false);
    }
  };

  return (
    <>
      <ic-skip-link label="Skip to page content" target="page-content" inline />
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
        truncateTreeItems
        truncateHeading
      >
        {isRoot && (
          <IcTreeItem
            label={currentNavSection.data.frontmatter.title}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation(currentNavSection.data.fields.slug);
            }}
            onKeyUp={(e) => handleKeyUp(e, currentNavSection)}
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
