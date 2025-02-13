import React from "react";
import { Link as GatsbyLink } from "gatsby";
import "./index.css";
import pagesData from "../../icds-pages-data.json";

import {
  AccordionLight,
  AlertLight,
  BacktotopLight,
  BadgeLight,
  BreadcrumbLight,
  ButtonLight,
  CardLight,
  CheckboxLight,
  ChipLight,
  ClassificationbannerLight,
  DatatableLight,
  DateinputLight,
  DatalistLight,
  DatepickerLight,
  DialogLight,
  EmptystateLight,
  FooterLight,
  HeroLight,
  LinkLight,
  LoadingindicatorLight,
  MultiselectLight,
  PageheaderLight,
  PaginationLight,
  PopovermenuLight,
  RadiobuttonLight,
  SearchbarLight,
  SectioncontainerLight,
  SelectLight,
  SidenavigationLight,
  SkeletonLight,
  StatustagLight,
  StepperLight,
  SwitchLight,
  TabsLight,
  TextfieldLight,
  ToastLight,
  TogglebuttonLight,
  TooltipLight,
  TopnavigationLight,
  TreeviewLight,
  TypographyLight,
  AccordionDark,
  AlertDark,
  BacktotopDark,
  BadgeDark,
  BreadcrumbDark,
  ButtonDark,
  CardDark,
  CheckboxDark,
  ChipDark,
  ClassificationbannerDark,
  DatatableDark,
  DateinputDark,
  DatalistDark,
  DatepickerDark,
  DialogDark,
  EmptystateDark,
  FooterDark,
  HeroDark,
  LinkDark,
  LoadingindicatorDark,
  MultiselectDark,
  PageheaderDark,
  PaginationDark,
  PopovermenuDark,
  RadiobuttonDark,
  SearchbarDark,
  SectioncontainerDark,
  SelectDark,
  SidenavigationDark,
  SkeletonDark,
  StatustagDark,
  StepperDark,
  SwitchDark,
  TabsDark,
  TextfieldDark,
  ToastDark,
  TogglebuttonDark,
  TooltipDark,
  TopnavigationDark,
  TreeviewDark,
  TypographyDark,
  PlaceHolderLight,
  PlaceHolderDark,
} from "./ComponentImages";
import { useTheme } from "../../context/ThemeContext";
import { passImage } from "../../utils/helpers";

const ComponentImages: { [key: string]: any } = {
  AccordionLight,
  AccordionDark,
  AlertLight,
  BacktotopLight,
  BadgeLight,
  BreadcrumbLight,
  ButtonLight,
  CardLight,
  CheckboxLight,
  ChipLight,
  ClassificationbannerLight,
  DatatableLight,
  DateinputLight,
  DatalistLight,
  DatepickerLight,
  DialogLight,
  EmptystateLight,
  FooterLight,
  HeroLight,
  LinkLight,
  LoadingindicatorLight,
  MultiselectLight,
  PageheaderLight,
  PaginationLight,
  PlaceHolderLight,
  PlaceHolderDark,
  PopovermenuLight,
  RadiobuttonLight,
  SearchbarLight,
  SectioncontainerLight,
  SelectLight,
  SidenavigationLight,
  SkeletonLight,
  StatustagLight,
  StepperLight,
  SwitchLight,
  TabsLight,
  TextfieldLight,
  ToastLight,
  TogglebuttonLight,
  TooltipLight,
  TopnavigationLight,
  TreeviewLight,
  TypographyLight,
  AlertDark,
  BacktotopDark,
  BadgeDark,
  BreadcrumbDark,
  ButtonDark,
  CardDark,
  CheckboxDark,
  ChipDark,
  ClassificationbannerDark,
  DatatableDark,
  DateinputDark,
  DatalistDark,
  DatepickerDark,
  DialogDark,
  EmptystateDark,
  FooterDark,
  HeroDark,
  LinkDark,
  LoadingindicatorDark,
  MultiselectDark,
  PageheaderDark,
  PaginationDark,
  PopovermenuDark,
  RadiobuttonDark,
  SearchbarDark,
  SectioncontainerDark,
  SelectDark,
  SidenavigationDark,
  SkeletonDark,
  StatustagDark,
  StepperDark,
  SwitchDark,
  TabsDark,
  TextfieldDark,
  ToastDark,
  TogglebuttonDark,
  TooltipDark,
  TopnavigationDark,
  TreeviewDark,
  TypographyDark,
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

  // to allow the concatenation of a camelcase variable name, we capitalise the value of theme
  const capitalisedTheme =
    String(theme).charAt(0).toUpperCase() + String(theme).slice(1);

  return (
    <ul className="card-container">
      {uniqueComponentDetails?.map(({ path, subTitle, title }) => (
        <li key={title}>
          <GatsbyLink to={path}>
            <ic-card-vertical message={subTitle} full-width clickable>
              <img
                src={
                  ComponentImages[
                    title.replace(/[- ]/g, "") + capitalisedTheme
                  ] || passImage([PlaceHolderLight, PlaceHolderDark], theme)
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
