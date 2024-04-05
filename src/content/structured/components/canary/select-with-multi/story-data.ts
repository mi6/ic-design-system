import { IcMenuOption } from "@ukic/web-components";

/* eslint-disable */

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

// export const createMultiSelectElement = (
//   options: IcMenuOption[] = OPTIONS
// ): HTMLIcSelectWithMultiElement => {
//   const multiSelect = document.createElement("ic-select-with-multi");
//   multiSelect.setAttribute("multiple", "true");
//   multiSelect.setAttribute("label", "What are your favourite types of coffee?");
//   multiSelect.options = options;

//   multiSelect.addEventListener("icChange", function (event: CustomEvent) {
//     console.log("icChange: " + event.detail.value);
//   });

//   return multiSelect;
// };

// export const createContainer = (
//   // Array to account for stories with multiple multi-selects e.g. 'Sizes'
//   elementArray: HTMLElement[],
//   height: string = "430px"
// ) => {
//   const container = document.createElement("div");
//   container.style.height = height;

//   elementArray.forEach((element) => container.appendChild(element));

//   return container;
// };

// export const Default = (): HTMLDivElement => {
//   const multiSelect = createMultiSelectElement();

//   multiSelect.addEventListener("icOptionSelect", function (event: CustomEvent) {
//     console.log("icOptionSelect: " + event.detail.value);
//   });
//   multiSelect.addEventListener(
//     "icOptionDeselect",
//     function (event: CustomEvent) {
//       console.log("icOptionDeselect: " + event.detail.value);
//     }
//   );

//   return createContainer([multiSelect]);
// };

// export const DefaultValue = (): HTMLDivElement => {
//   const multiSelect = createMultiSelectElement();
//   multiSelect.value = ["Ame", "Fil", "Moc"];
//   return createContainer([multiSelect]);
// };

// export const WithClearButton = (): HTMLDivElement => {
//   const multiSelect = createMultiSelectElement();
//   multiSelect.setAttribute("show-clear-button", "true");
//   return createContainer([multiSelect]);
// };

// export const WithDescriptions = (): HTMLDivElement => {
//   const multiSelect = createMultiSelectElement(OPTIONS_WITH_DESCRIPTIONS);
//   return createContainer([multiSelect], "470px");
// };

// export const HelperText = (): HTMLDivElement => {
//   const multiSelect = createMultiSelectElement();
//   multiSelect.setAttribute("helper-text", "Select some options from the list");
//   return createContainer([multiSelect], "450px");
// };

// export const Sizes = (): HTMLDivElement => {
//   const multiSelectSmall = createMultiSelectElement();
//   multiSelectSmall.setAttribute("size", "small");

//   const multiSelectDefault = createMultiSelectElement();

//   const multiSelectLarge = createMultiSelectElement();
//   multiSelectLarge.setAttribute("size", "large");

//   const container = createContainer(
//     [multiSelectSmall, multiSelectDefault, multiSelectLarge],
//     "650px"
//   );
//   container.style.display = "flex";
//   container.style.flexDirection = "column";
//   container.style.gap = "16px";

//   return container;
// };

// export const Disabled = (): HTMLDivElement => {
//   const multiSelect = createMultiSelectElement();
//   multiSelect.setAttribute("disabled", "true");
//   return createContainer([multiSelect], "200px");
// };

// export const DisabledOptions = (): HTMLDivElement => {
//   const multiSelect = createMultiSelectElement(OPTIONS_WITH_DISABLED);
//   return createContainer([multiSelect]);
// };

// export const HiddenLabel = (): HTMLDivElement => {
//   const multiSelect = createMultiSelectElement();
//   multiSelect.setAttribute("hide-label", "true");
//   return createContainer([multiSelect], "400px");
// };

// export const Required = (): HTMLDivElement => {
//   const multiSelect = createMultiSelectElement();
//   multiSelect.setAttribute("required", "true");
//   return createContainer([multiSelect]);
// };

// export const ReadOnly = (): HTMLDivElement => {
//   const multiSelect = createMultiSelectElement();
//   multiSelect.value = ["Cap", "Fla", "Moc"];
//   multiSelect.setAttribute("readonly", "true");
//   return createContainer([multiSelect], "200px");
// };

// export const Groups = (): HTMLDivElement => {
//   const multiSelect = createMultiSelectElement(GROUPED_OPTIONS);
//   return createContainer([multiSelect]);
// };

// export const Recommended = (): HTMLDivElement => {
//   const multiSelect = createMultiSelectElement(OPTIONS_WITH_RECOMMENDED);
//   return createContainer([multiSelect]);
// };

// export const Validation = (): HTMLDivElement => {
//   const multiSelectSuccess = createMultiSelectElement();
//   multiSelectSuccess.setAttribute("validation-status", "success");
//   multiSelectSuccess.setAttribute("validation-text", "Coffee available");

//   const multiSelectWarning = createMultiSelectElement();
//   multiSelectWarning.setAttribute("validation-status", "warning");
//   multiSelectWarning.setAttribute("validation-text", "Only a few left");

//   const multiSelectError = createMultiSelectElement();
//   multiSelectError.setAttribute("validation-status", "error");
//   multiSelectError.setAttribute("validation-text", "Coffee unavailable");

//   const container = createContainer(
//     [multiSelectSuccess, multiSelectWarning, multiSelectError],
//     "640px"
//   );
//   return container;
// };

// export const LoadingWithError = (): HTMLDivElement => {
//   const multiSelect = createMultiSelectElement();
//   multiSelect.setAttribute("loading", "true");
//   multiSelect.setAttribute("timeout", "1000");

//   multiSelect.addEventListener("icRetryLoad", function () {
//     multiSelect.setAttribute("loading", "true");
//   });

//   return createContainer([multiSelect]);
// };

// export const InForm = (): HTMLDivElement => {
//   const form = document.createElement("form");
//   const multiSelect = createMultiSelectElement();

//   form.appendChild(multiSelect);
//   form.appendChild(document.createElement("br"));
//   form.appendChild(document.createElement("br"));

//   const submitButton = document.createElement("input");
//   submitButton.setAttribute("type", "submit");
//   submitButton.setAttribute("value", "Submit");

//   const resetButton = document.createElement("input");
//   resetButton.setAttribute("type", "reset");
//   resetButton.setAttribute("value", "Reset");

//   form.appendChild(submitButton);
//   form.appendChild(resetButton);

//   form.addEventListener("submit", function (event: Event) {
//     event.preventDefault();
//     console.log(
//       (multiSelect.querySelector("input.ic-input") as HTMLInputElement).value
//     );
//   });

//   return createContainer([form]);
// };
