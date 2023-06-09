import React, { FocusEvent, useState, useEffect } from "react";
import clsx from "clsx";
import { Link as GatsbyLink } from "gatsby";
import { arrayToTree, TreeItem } from "performant-array-to-tree";

import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";

import "./index.css";
import { NavigationObject } from "../../sharedTypes";

interface WrappedListItemProps {
  text: string;
  url?: string;
  open?: boolean;
  label?: string;
  controls?: string;
  onClick?: Function;
  tabs?: boolean | undefined;
}

interface ListItemProps {
  item: TreeItem;
  onClick: Function;
  open: boolean | undefined;
}

interface ListChildenProps {
  item: TreeItem | undefined;
}

interface SubsectionNavProps {
  allStructuredNav: NavigationObject[];
  section: string;
  currentPage: string;
}

const WrappedListItem: React.FC<WrappedListItemProps> = ({
  text,
  url = "",
  onClick,
  open = false,
  label = "",
  controls,
  tabs = false,
}) => {
  if (onClick) {
    return (
      <a
        href=".#"
        role="button"
        className="list-title"
        aria-controls={controls}
        aria-expanded={open ? "true" : "false"}
        aria-label={label}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <ic-typography data-class="list-typography" variant="body">
          {text}
        </ic-typography>
        <Icon
          path={mdiChevronDown}
          size={1.25}
          className={clsx("chevron", open && "chevron-flip")}
        />
      </a>
    );
  }
  return (
    <GatsbyLink
      activeClassName="active"
      to={url}
      title={label}
      partiallyActive={tabs && true}
    >
      <ic-typography data-class="list-typography" variant="body">
        {text}
      </ic-typography>
    </GatsbyLink>
  );
};

const ListItem: React.FC<ListItemProps> = ({ item, onClick, open }) => {
  if (item.children.length > 0 && !item.data.frontmatter.tabs) {
    return (
      <WrappedListItem
        key={item.data.id}
        text={item.data.frontmatter.title}
        onClick={onClick}
        open={open}
        controls={item.data.id}
      />
    );
  }
  return (
    <WrappedListItem
      key={item.data.id}
      text={item.data.frontmatter.title}
      url={item.data.fields.slug}
      open={open}
      tabs={item.data.frontmatter.tabs}
    />
  );
};

const ListChildren: React.FC<ListChildenProps> = ({ item }) => {
  if (!item) {
    return null;
  }

  const isRoot = item.data.fields.navParent === "NONE";
  const [open, setOpen] = useState(item.selected);
  const toggleOpen = () => setOpen(!open);

  if (isRoot) {
    return (
      <>
        <li key={item.data.id} className="list-item">
          <WrappedListItem
            key={item.data.id}
            text={item.data.frontmatter.title}
            url={item.data.fields.slug}
            open={open}
          />
        </li>
        {item.children.map((child: TreeItem) => (
          <ListChildren item={child} />
        ))}
      </>
    );
  }
  if (item.children?.length > 0 && !item.data.frontmatter.tabs) {
    return (
      <li key={item.data.id} className={clsx("list-item", "icds-gatsby-lp")}>
        <ListItem
          item={item}
          onClick={toggleOpen}
          open={isRoot ? true : open}
        />
        <ul
          id={item.data.id}
          className={clsx("list", !(isRoot || open) && "list-closed")}
        >
          <li className="list-item">
            <WrappedListItem
              key={item.data.id}
              text="Overview"
              label={`Overview of ${item.data.frontmatter.title}`}
              url={item.data.fields.slug}
              open={false}
            />
          </li>
          {item.children.map((child: TreeItem) => (
            <ListChildren item={child} />
          ))}
        </ul>
      </li>
    );
  }
  return (
    <li key={item.data.id} className="list-item">
      <ListItem item={item} onClick={toggleOpen} open={isRoot ? true : open} />
    </li>
  );
};

const SubsectionNav: React.FC<SubsectionNavProps> = ({
  allStructuredNav,
  section,
}) => {
  const currentNavSection = arrayToTree(allStructuredNav, {
    id: "fields.slug",
    parentId: "fields.navParent",
    rootParentIds: { NONE: true },
  })[0];

  const [responsiveNavOpen, setResponsiveNavOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const toggleResponsiveNavOpen = () =>
    setResponsiveNavOpen(!responsiveNavOpen);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    // If not clicking on the elements of the Side Nav
    if (
      !(
        e.relatedTarget?.hasAttribute("title") ||
        e.relatedTarget?.className === "list-title" ||
        e.relatedTarget?.matches("ic-button")
      )
    ) {
      setResponsiveNavOpen(false);
    }
  };

  return (
    <>
      <ic-link id="skip-page-content-link" href="#page-contents">
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
      <nav
        id="icds-section-nav"
        aria-label={`${section} section`}
        className={clsx(
          "scroll",
          "large-only",
          responsiveNavOpen && "force-open",
          !hasMounted && "not-mounted"
        )}
        onBlur={handleBlur}
      >
        <ul className={clsx("list-root", "list")}>
          <ListChildren item={currentNavSection} />
        </ul>
      </nav>
    </>
  );
};

export default SubsectionNav;
