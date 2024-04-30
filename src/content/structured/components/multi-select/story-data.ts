import { IcMenuOption } from "@ukic/web-components";

export const OPTIONS: IcMenuOption[] = [
  { label: "Cappuccino", value: "Cap" },
  { label: "Latte", value: "Lat" },
  { label: "Americano", value: "Ame" },
  { label: "Filter", value: "Fil" },
  { label: "Flat white", value: "Fla" },
  { label: "Mocha", value: "Moc" },
  { label: "Macchiato", value: "Mac" },
];

export const OPTIONS_WITH_DESCRIPTIONS: IcMenuOption[] = [
  {
    label: "Cappuccino",
    value: "Cap",
    description: "Coffee frothed up with pressurised steam",
  },
  {
    label: "Latte",
    value: "Lat",
    description: "A milkier coffee than a cappuccino",
  },
  {
    label: "Americano",
    value: "Ame",
    description: "Espresso coffee diluted with hot water",
  },
  {
    label: "Filter",
    value: "Fil",
    description: "Coffee filtered using paper or a mesh",
  },
  {
    label: "Flat white",
    value: "Fla",
    description: "Coffee without froth made with espresso and hot steamed milk",
  },
  {
    label: "Mocha",
    value: "Moc",
    description: "A mixture of coffee and chocolate",
  },
  {
    label: "Macchiato",
    value: "Mac",
    description: "Espresso coffee with a dash of frothy steamed milk",
  },
];

export const OPTIONS_WITH_DISABLED: IcMenuOption[] = [
  { label: "Cappuccino", value: "Cap" },
  { label: "Latte", value: "Lat", disabled: true },
  { label: "Americano", value: "Ame" },
  { label: "Filter", value: "Fil", disabled: true },
  { label: "Flat white", value: "Fla", disabled: true },
  { label: "Mocha", value: "Moc" },
  { label: "Macchiato", value: "Mac" },
];

export const GROUPED_OPTIONS: IcMenuOption[] = [
  {
    label: "Fancy",
    children: [
      { label: "Cappuccino", value: "Cap" },
      { label: "Flat white", value: "Flat" },
    ],
  },
  {
    label: "Boring",
    children: [
      { label: "Filter", value: "Fil" },
      { label: "Latte", value: "Lat" },
    ],
  },
];

export const OPTIONS_WITH_RECOMMENDED = [
  { label: "Cappuccino", value: "Cap" },
  { label: "Latte", value: "Lat" },
  { label: "Americano", value: "Ame", recommended: true },
  { label: "Filter", value: "Fil" },
  { label: "Flat white", value: "Fla", recommended: true },
  { label: "Mocha", value: "Moc" },
  { label: "Macchiato", value: "Mac" },
];
