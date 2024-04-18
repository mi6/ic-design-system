import React from "react";
import { Link as GatsbyLink } from "gatsby";
import "./index.css";
import pagesData from "../../icds-pages-data.json";
import Accordion from "./ComponentImages/accordion-comp-gallery.png";
import Alert from "./ComponentImages/alert-comp-gallery.png";
import Backtotop from "./ComponentImages/back-to-top-comp-gallery.png";
import Badge from "./ComponentImages/badge-comp-gallery.png";
import Breadcrumb from "./ComponentImages/breadcrumb-comp-gallery.png";
import Button from "./ComponentImages/button-comp-gallery.png";
import Card from "./ComponentImages/card-comp-gallery.png";
import Checkbox from "./ComponentImages/checkbox-comp-gallery.png";
import Chip from "./ComponentImages/chip-comp-gallery.png";
import Classificationbanner from "./ComponentImages/classification-banner-comp-gallery.png";
import Dataentity from "./ComponentImages/date-entity-comp-gallery.png";
import Dialog from "./ComponentImages/dialog-comp-gallery.png";
import Emptystate from "./ComponentImages/empty-state-comp-gallery.png";
import Footer from "./ComponentImages/footer-comp-gallery.png";
import Hero from "./ComponentImages/hero-comp-gallery.png";
import Link from "./ComponentImages/link-comp-gallery.png";
import Loadingindicator from "./ComponentImages/loading-indicator-comp-gallery.png";
import Pageheader from "./ComponentImages/page-header-comp-gallery.png";
import Pagination from "./ComponentImages/pagination-comp-gallery.png";
import Popovermenu from "./ComponentImages/popover-menu-comp-gallery.png";
import Radiobutton from "./ComponentImages/radio-button-comp-gallery.png";
import Searchbar from "./ComponentImages/search-bar-comp-gallery.png";
import Sectioncontainer from "./ComponentImages/section-container-comp-gallery.png";
import Select from "./ComponentImages/select-comp-gallery.png";
import Sidenavigation from "./ComponentImages/side-navigation-comp-gallery.png";
import Skeleton from "./ComponentImages/skeleton-comp-gallery.png";
import Statustag from "./ComponentImages/status-tag-comp-gallery.png";
import Stepper from "./ComponentImages/stepper-comp-gallery.png";
import Switch from "./ComponentImages/switch-comp-gallery.png";
import Tabs from "./ComponentImages/tabs-comp-gallery.png";
import Textfield from "./ComponentImages/text-field-comp-gallery.png";
import Toast from "./ComponentImages/toast-comp-gallery.png";
import Togglebutton from "./ComponentImages/toggle-button-comp-gallery.png";
import Tooltip from "./ComponentImages/tooltip-comp-gallery.png";
import Topnavigation from "./ComponentImages/top-navigation-comp-gallery.png";
import Typography from "./ComponentImages/typography-comp-gallery.png";
import PlaceHolder from "./ComponentImages/placeholder-comp-gallery.png";

const ComponentImages: { [key: string]: any } = {
  Accordion,
  Alert,
  Backtotop,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Chip,
  Classificationbanner,
  Dataentity,
  Dialog,
  Emptystate,
  Footer,
  Hero,
  Link,
  Loadingindicator,
  Pageheader,
  Pagination,
  Popovermenu,
  Radiobutton,
  Searchbar,
  Sectioncontainer,
  Select,
  Sidenavigation,
  Skeleton,
  Statustag,
  Stepper,
  Switch,
  Tabs,
  Textfield,
  Toast,
  Togglebutton,
  Tooltip,
  Topnavigation,
  Typography,
};

interface ComponentDetails {
  title: string;
  subTitle: string;
  path: string;
}

const ComponentGallery: React.FC = () => {
  const componentDetails: ComponentDetails[] = [];

  pagesData.data.forEach((page) => {
    if (page.tabs) {
      componentDetails.push({
        title: page.title,
        subTitle: page.subTitle,
        path: page.path,
      });
    }
  });

  const uniqueComponentDetails = [
    ...new Map(componentDetails.map((item) => [item.title, item])).values(),
  ];

  return (
    <ul className="card-container">
      {uniqueComponentDetails &&
        uniqueComponentDetails.map((item: ComponentDetails) => (
          <li>
            <GatsbyLink to={`${item.path}`}>
              <ic-card message={item.subTitle} full-width clickable>
                <img
                  src={ComponentImages[item.title.replace(/ /g, "")] == null ? PlaceHolder : ComponentImages[item.title.replace(/ /g, "")]}
                  slot="image-top"
                  alt={item.title}
                  width="100%"
                  height="100%"
                />
                <ic-typography
                  slot="heading"
                  variant="h4"
                  aria-label={`${item.title} component.`}
                >
                  <h4>{item.title}</h4>
                </ic-typography>
              </ic-card>
            </GatsbyLink>
          </li>
        ))}
    </ul>
  );
};

export default ComponentGallery;
