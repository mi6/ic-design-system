import React from "react";
import { Link as GatsbyLink } from "gatsby";
import "./index.css";
import pagesData from "../../icds-pages-data.json";

import {
  AccordionLight,
  AccordionDark,
  ActionchipLight,
  ActionchipDark,
  AlertLight,
  AlertDark,
  BacktotopLight,
  BacktotopDark,
  BadgeLight,
  BadgeDark,
  BreadcrumbLight,
  BreadcrumbDark,
  ButtonLight,
  ButtonDark,
  CalendarLight,
  CalendarDark,
  CardhorizontalLight,
  CardhorizontalDark,
  CardverticalLight,
  CardverticalDark,
  CheckboxLight,
  CheckboxDark,
  ChipLight,
  ChipDark,
  ClassificationbannerLight,
  ClassificationbannerDark,
  DatatableLight,
  DatatableDark,
  DateinputLight,
  DateinputDark,
  DatalistLight,
  DatalistDark,
  DatepickerLight,
  DatepickerDark,
  DialogLight,
  DialogDark,
  DividerLight,
  DividerDark,
  DrawerLight,
  DrawerDark,
  EmptystateLight,
  EmptystateDark,
  FooterLight,
  FooterDark,
  HeroLight,
  HeroDark,
  LayoutgridLight,
  LayoutgridDark,
  LinkLight,
  LinkDark,
  LoadingindicatorLight,
  LoadingindicatorDark,
  MultiselectLight,
  MultiselectDark,
  PageheaderLight,
  PageheaderDark,
  PaginationLight,
  PaginationDark,
  PaginationbarLight,
  PaginationbarDark,
  PlaceHolderLight,
  PlaceHolderDark,
  PopovermenuLight,
  PopovermenuDark,
  RadiobuttonLight,
  RadiobuttonDark,
  SearchbarLight,
  SearchbarDark,
  SectioncontainerLight,
  SectioncontainerDark,
  SelectLight,
  SelectDark,
  SidenavigationLight,
  SidenavigationDark,
  SkeletonLight,
  SkeletonDark,
  SkiplinkLight,
  SkiplinkDark,
  StatustagLight,
  StatustagDark,
  StepperLight,
  StepperDark,
  SwitchLight,
  SwitchDark,
  TabsLight,
  TabsDark,
  TableofcontentsLight,
  TableofcontentsDark,
  TextfieldLight,
  TextfieldDark,
  ThemeLight,
  ThemeDark,
  TimeinputLight,
  TimeinputDark,
  TimepickerLight,
  TimepickerDark,
  TimeselectorLight,
  TimeselectorDark,
  ToastLight,
  ToastDark,
  TogglebuttonLight,
  TogglebuttonDark,
  TooltipLight,
  TooltipDark,
  TopnavigationLight,
  TopnavigationDark,
  TreeviewLight,
  TreeviewDark,
  TypographyLight,
  TypographyDark,
} from "./ComponentImages";
import { useTheme } from "../../context/ThemeContext";
import { passImage } from "../../utils/helpers";

const ComponentImages: { [key: string]: any } = {
  AccordionLight,
  AccordionDark,
  ActionchipLight,
  ActionchipDark,
  AlertLight,
  AlertDark,
  BacktotopLight,
  BacktotopDark,
  BadgeLight,
  BadgeDark,
  BreadcrumbLight,
  BreadcrumbDark,
  ButtonLight,
  ButtonDark,
  CalendarLight,
  CalendarDark,
  CardhorizontalLight,
  CardhorizontalDark,
  CardverticalLight,
  CardverticalDark,
  CheckboxLight,
  CheckboxDark,
  ChipLight,
  ChipDark,
  ClassificationbannerLight,
  ClassificationbannerDark,
  DatatableLight,
  DatatableDark,
  DateinputLight,
  DateinputDark,
  DatalistLight,
  DatalistDark,
  DatepickerLight,
  DatepickerDark,
  DialogLight,
  DialogDark,
  DividerLight,
  DividerDark,
  DrawerLight,
  DrawerDark,
  EmptystateLight,
  EmptystateDark,
  FooterLight,
  FooterDark,
  HeroLight,
  HeroDark,
  LayoutgridLight,
  LayoutgridDark,
  LinkLight,
  LinkDark,
  LoadingindicatorLight,
  LoadingindicatorDark,
  MultiselectLight,
  MultiselectDark,
  PageheaderLight,
  PageheaderDark,
  PaginationLight,
  PaginationDark,
  PaginationbarLight,
  PaginationbarDark,
  PlaceHolderLight,
  PlaceHolderDark,
  PopovermenuLight,
  PopovermenuDark,
  RadiobuttonLight,
  RadiobuttonDark,
  SearchbarLight,
  SearchbarDark,
  SectioncontainerLight,
  SectioncontainerDark,
  SelectLight,
  SelectDark,
  SidenavigationLight,
  SidenavigationDark,
  SkeletonLight,
  SkeletonDark,
  SkiplinkLight,
  SkiplinkDark,
  StatustagLight,
  StatustagDark,
  StepperLight,
  StepperDark,
  SwitchLight,
  SwitchDark,
  TabsLight,
  TabsDark,
  TableofcontentsLight,
  TableofcontentsDark,
  TextfieldLight,
  TextfieldDark,
  ThemeLight,
  ThemeDark,
  TimeinputLight,
  TimeinputDark,
  TimepickerLight,
  TimepickerDark,
  TimeselectorLight,
  TimeselectorDark,
  ToastLight,
  ToastDark,
  TogglebuttonLight,
  TogglebuttonDark,
  TooltipLight,
  TooltipDark,
  TopnavigationLight,
  TopnavigationDark,
  TreeviewLight,
  TreeviewDark,
  TypographyLight,
  TypographyDark,
};

const ComponentGallery: React.FC = () => {
  const { theme } = useTheme();

  // to allow the concatenation of a camelcase variable name, we capitalise the value of theme
  const capitalisedTheme =
    String(theme).charAt(0).toUpperCase() + String(theme).slice(1);

  return (
    pagesData?.data && (
      <ul className="card-container">
        {pagesData.data.map(({ path, subTitle, title }) => (
          <li key={title}>
            <GatsbyLink to={path}>
              <ic-card-vertical message={subTitle} full-width clickable>
                <img
                  src={
                    ComponentImages[
                      title.replace(/[- ()]/g, "") + capitalisedTheme
                    ] || passImage([PlaceHolderLight, PlaceHolderDark], theme)
                  }
                  slot="image-top"
                  alt=""
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
    )
  );
};

export default ComponentGallery;
