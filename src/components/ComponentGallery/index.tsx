import React from "react";
import { Link as GatsbyLink } from "gatsby";
import "./index.css";
import pagesData from "../../icds-pages-data.json";
import { useTheme } from "../../context/ThemeContext";
import {
  Accordionlight,
  Accordiondark,
  Alertlight,
  Backtotoplight,
  Badgelight,
  Breadcrumblight,
  Buttonlight,
  Cardlight,
  Checkboxlight,
  Chiplight,
  Classificationbannerlight,
  Datatablelight,
  Dateinputlight,
  Datalistlight,
  Datepickerlight,
  Dialoglight,
  Emptystatelight,
  Footerlight,
  Herolight,
  Linklight,
  Loadingindicatorlight,
  Multiselectlight,
  Pageheaderlight,
  Paginationlight,
  Popovermenulight,
  Radiobuttonlight,
  Searchbarlight,
  Sectioncontainerlight,
  Selectlight,
  Sidenavigationlight,
  Skeletonlight,
  Statustaglight,
  Stepperlight,
  Switchlight,
  Tabslight,
  Textfieldlight,
  Toastlight,
  Togglebuttonlight,
  Tooltiplight,
  Topnavigationlight,
  Treeviewlight,
  Typographylight,
  PlaceHolderlight,
} from "./ComponentImages";

const ComponentImages: { [key: string]: any } = {
  Accordionlight,
  Accordiondark,
  Alertlight,
  Backtotoplight,
  Badgelight,
  Breadcrumblight,
  Buttonlight,
  Cardlight,
  Checkboxlight,
  Chiplight,
  Classificationbannerlight,
  Datatablelight,
  Dateinputlight,
  Datalistlight,
  Datepickerlight,
  Dialoglight,
  Emptystatelight,
  Footerlight,
  Herolight,
  Linklight,
  Loadingindicatorlight,
  Multiselectlight,
  Pageheaderlight,
  Paginationlight,
  PlaceHolderlight,
  Popovermenulight,
  Radiobuttonlight,
  Searchbarlight,
  Sectioncontainerlight,
  Selectlight,
  Sidenavigationlight,
  Skeletonlight,
  Statustaglight,
  Stepperlight,
  Switchlight,
  Tabslight,
  Textfieldlight,
  Toastlight,
  Togglebuttonlight,
  Tooltiplight,
  Topnavigationlight,
  Treeviewlight,
  Typographylight,
};

const ComponentGallery: React.FC = () => {
  const { theme } = useTheme();
  const uniqueComponentDetails = [
    ...new Map(
      pagesData.data
        .filter(({ tabs }) => tabs)
        .map((item) => [item.title, item])
    ).values(),
  ];

  return (
    <ul className="card-container">
      {uniqueComponentDetails?.map(({ path, subTitle, title }) => (
        <li key={title}>
          <GatsbyLink to={path}>
            <ic-card-vertical message={subTitle} full-width clickable>
              <img
                src={
                  ComponentImages[title.replace(/[- ]/g, "") + theme] ||
                  PlaceHolderlight
                }
                slot="image-top"
                alt={title}
                width="100%"
                height="100%"
              />
              <ic-typography
                slot="heading"
                variant="h4"
                aria-label={`${title} component.`}
              >
                <h4>{title}</h4>
              </ic-typography>
            </ic-card-vertical>
          </GatsbyLink>
        </li>
      ))}
    </ul>
  );
};

export default ComponentGallery;
