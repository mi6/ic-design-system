export interface ColorConfig {
  name: string;
  token: string;
  hex: string;
  hexDark?: string;
}

export const ColoursText: ColorConfig[] = [
  {
    name: "Primary text",
    token: "--ic-color-text-primary",
    hex: "#0b0c0c",
    hexDark: "#ffffff",
  },
  {
    name: "Secondary text",
    token: "--ic-color-text-secondary",
    hex: "#41464d",
    hexDark: "#e1e3e5",
  },
  {
    name: "Tertiary text",
    token: "--ic-color-text-tertiary",
    hex: "#6c7580",
    hexDark: "#c4c8cd",
  },
  {
    name: "Inverse text",
    token: "--ic-color-text-inverse",
    hex: "#fff",
    hexDark: "#0b0c0c",
  },
  {
    name: "Disabled text",
    token: "--ic-color-text-disabled",
    hex: "#c4c8cd",
    hexDark: "#575e68",
  },
];

export const ColoursAction: ColorConfig[] = [
  {
    name: "Action default",
    token: "--ic-action-default",
    hex: "#1759bc",
    hexDark: "#488fe3",
  },
  {
    name: "Action default hover",
    token: "--ic-action-default-hover",
    hex: "#0b399c",
    hexDark: "#77b4f0",
  },
  {
    name: "Action default pressed",
    token: "--ic-action-default-pressed",
    hex: "#07277e",
    hexDark: "#98c9f5",
  },
  {
    name: "Action default selected",
    token: "--ic-action-default-selected",
    hex: "#1759bc1a",
    hexDark: "#124db3",
  },
  {
    name: "Action destructive",
    token: "--ic-action-destructive",
    hex: "#d4351c",
    hexDark: "#f66d63",
  },
  {
    name: "Action destructive hover",
    token: "--ic-action-destructive-hover",
    hex: "#ad1e0e",
    hexDark: "#f15b4e",
  },
  {
    name: "Action destructive pressed",
    token: "--ic-action-destructive-pressed",
    hex: "#8b1209",
    hexDark: "#dd3b25",
  },
  {
    name: "Action neutral",
    token: "--ic-action-neutral",
    hex: "#e1e3e5",
    hexDark: "#2c2f34",
  },
];

export const ColoursBackgrounds: ColorConfig[] = [
  {
    name: "Background primary",
    token: "--ic-color-background-primary",
    hex: "#ffffff",
    hexDark: "#2c2f34",
  },
  {
    name: "Background secondary",
    token: "--ic-color-background-secondary",
    hex: "#f9fafa",
    hexDark: "#41464d",
  },
  {
    name: "Background active",
    token: "--ic-color-background-active",
    hex: "#1759bc",
    hexDark: "#488fe3",
  },
  {
    name: "Background hover",
    token: "--ic-color-background-hover",
    hex: "#c4c8cd",
    hexDark: "#2c2f34",
  },
  {
    name: "Background pressed",
    token: "--ic-color-background-pressed",
    hex: "#a7acb3",
    hexDark: "#41464d",
  },
  {
    name: "Background disabled",
    token: "--ic-color-background-disabled",
    hex: "#e8e9eb",
    hexDark: "#a7acb3",
  },
  {
    name: "Background success",
    token: "--ic-color-background-success",
    hex: "#00703c",
    hexDark: "#81f2bb",
  },
  {
    name: "Background warning",
    token: "--ic-color-background-warning",
    hex: "#ffc107",
    hexDark: "#ffd12e",
  },
  {
    name: "Background destructive",
    token: "--ic-color-background-destructive",
    hex: "#d4351c",
    hexDark: "#f66d63",
  },
  {
    name: "Background destructive hover",
    token: "--ic-color-background-destructive-hover",
    hex: "#ad1e0e",
    hexDark: "#f15b4e",
  },
  {
    name: "Background destructive pressed",
    token: "--ic-color-background-destructive-pressed",
    hex: "#8b1209",
    hexDark: "#dd3b25",
  },
  {
    name: "Background neutral",
    token: "--ic-color-background-neutral",
    hex: "#2c2f34",
    hexDark: "#0b0c0c",
  },
];

export const ColoursBorders: ColorConfig[] = [
  {
    name: "Border neutral default",
    token: "--ic-color-border-neutral-default",
    hex: "#a7acb3",
  },
  {
    name: "Border neutral black",
    token: "--ic-color-border-neutral-black",
    hex: "#000000",
  },
  {
    name: "Border neutral white",
    token: "--ic-color-border-neutral-white",
    hex: "#ffffff",
  },
  {
    name: "Border neutral grey",
    token: "--ic-color-border-neutral-grey",
    hex: "#f4f4f5",
    hexDark: "#8a919b",
  },
  {
    name: "Border neutral hover",
    token: "--ic-color-border-neutral-hover",
    hex: "#6c7580",
    hexDark: "#c4c8cd",
  },
  {
    name: "Border neutral pressed",
    token: "--ic-color-border-neutral-pressed",
    hex: "#575e68",
    hexDark: "#c4c8cd",
  },
  {
    name: "Border neutral disabled",
    token: "--ic-color-border-neutral-disabled",
    hex: "#c4c8cd",
    hexDark: "#575e68",
  },
  {
    name: "Border success",
    token: "--ic-color-border-success",
    hex: "#00703c",
    hexDark: "#81f2bb",
  },
  {
    name: "Border success hover",
    token: "--ic-color-border-success-hover",
    hex: "#0e462b",
    hexDark: "#6dedaf",
  },
  {
    name: "Border success pressed",
    token: "--ic-color-border-success-pressed",
    hex: "#0e3020",
    hexDark: "#4cdf98",
  },
  {
    name: "Border warning",
    token: "--ic-color-border-warning",
    hex: "#d07932",
    hexDark: "#ffd12e",
  },
  {
    name: "Border warning hover",
    token: "--ic-color-border-warning-hover",
    hex: "#b3673c",
    hexDark: "#ffc107",
  },
  {
    name: "Border warning pressed",
    token: "--ic-color-border-warning-pressed",
    hex: "#8f553e",
    hexDark: "#f8ae10",
  },
  {
    name: "Border error",
    token: "--ic-color-border-error",
    hex: "#d4351c",
    hexDark: "#f66d63",
  },
  {
    name: "Border error hover",
    token: "--ic-color-border-error-hover",
    hex: "#ad1e0e",
    hexDark: "#f15b4e",
  },
  {
    name: "Border error pressed",
    token: "--ic-color-border-error-pressed",
    hex: "#8b1209",
    hexDark: "#dd3b25",
  },
  {
    name: "Border action",
    token: "--ic-color-border-action",
    hex: "#1759bc",
    hexDark: "#488fe3",
  },
  {
    name: "Border action hover",
    token: "--ic-color-border-action-hover",
    hex: "#0b399c",
    hexDark: "#77b4f0",
  },
  {
    name: "Border action pressed",
    token: "--ic-color-border-action-pressed",
    hex: "#07277e",
    hexDark: "#98c9f5",
  },
];

export const ColoursLinks: ColorConfig[] = [
  {
    name: "Hyperlink default",
    token: "--ic-color-hyperlink-default",
    hex: "#1759bc",
    hexDark: "#5da0ea",
  },
  {
    name: "Hyperlink visited",
    token: "--ic-color-hyperlink-visited",
    hex: "#330072",
    hexDark: "#c988fd",
  },
  {
    name: "Hyperlink visited monochrome",
    token: "--ic-color-hyperlink-visited-monochrome",
    hex: "#41464d",
    hexDark: "#b0b0b0",
  },
];

export const ColoursStatus: ColorConfig[] = [
  {
    name: "Status success",
    token: "--ic-status-success",
    hex: "#e8fef3",
    hexDark: "#0e3020",
  },
  {
    name: "Status warning",
    token: "--ic-status-warning",
    hex: "#fffbd8",
    hexDark: "#7a4c3c",
  },
  {
    name: "Status error",
    token: "--ic-status-error",
    hex: "#ffe4e3",
    hexDark: "#610a05",
  },
  {
    name: "Status anomalous",
    token: "--ic-status-anomalous",
    hex: "#efdbff",
    hexDark: "#350f54",
  },
  {
    name: "Status info",
    token: "--ic-status-info",
    hex: "#e1f0fc",
    hexDark: "#041144",
  },
  {
    name: "Status unknown",
    token: "--ic-status-unknown",
    hex: "#f4f4f5",
    hexDark: "#2c2f34",
  },
];

export const ColoursIcons: ColorConfig[] = [
  {
    name: "Icon grey",
    token: "--ic-color-icon-grey",
    hex: "#c4c8cd",
    hexDark: "#6c7580",
  },
  {
    name: "Icon hover",
    token: "--ic-color-icon-hover",
    hex: "#c4c8cd",
    hexDark: "#2c2f34",
  },
  {
    name: "Icon pressed",
    token: "--ic-color-icon-pressed",
    hex: "#a7acb3",
    hexDark: "#41464d",
  },
  {
    name: "Icon disabled",
    token: "--ic-color-icon-disabled",
    hex: "#a7acb3",
    hexDark: "#6c7580",
  },
  {
    name: "Icon action default",
    token: "--ic-color-icon-action-default",
    hex: "#1759bc",
    hexDark: "#488fe3",
  },
  {
    name: "Icon error",
    token: "--ic-color-icon-error",
    hex: "#f66d63",
    hexDark: "#d4351c",
  },
  {
    name: "Icon brand",
    token: "--ic-color-icon-brand",
    hex: "#ffffff",
  },
  {
    name: "Icon neutral",
    token: "--ic-color-icon-neutral",
    hex: "#0b0c0c",
  },
  {
    name: "Icon inverted",
    token: "--ic-color-icon-inverted",
    hex: "#ffffff",
  },
];

export const ColoursClassification = [
  {
    name: "Classification not set",
    token: "--ic-classification-not-set",
    hex: "#616161",
  },
  {
    name: "Classification official",
    token: "--ic-classification-official",
    hex: "#2b71c7",
  },
  {
    name: "Classification official-sensitive",
    token: "--ic-classification-official-sensitive",
    hex: "#2b71c7",
  },
  {
    name: "Classification secret",
    token: "--ic-classification-secret",
    hex: "#f39c2c",
  },
  {
    name: "Classification top-secret",
    token: "--ic-classification-top-secret",
    hex: "#a00",
  },
];

export const ColoursArchitectural: ColorConfig[] = [
  {
    name: "Architectural 20",
    token: "--ic-architectural-20",
    hex: "#f9fafa",
  },
  {
    name: "Architectural 40",
    token: "--ic-architectural-40",
    hex: "#f4f4f5",
  },
  {
    name: "Architectural 60",
    token: "--ic-architectural-60",
    hex: "#f4f4f5",
  },
  {
    name: "Architectural 80",
    token: "--ic-architectural-80",
    hex: "#e8e9eb",
  },
  {
    name: "Architectural 100",
    token: "--ic-architectural-100",
    hex: "#e1e3e5",
  },
  {
    name: "Architectural 200",
    token: "--ic-architectural-200",
    hex: "#c4c8cd",
  },
  {
    name: "Architectural 300",
    token: "--ic-architectural-300",
    hex: "#a7acb3",
  },
  {
    name: "Architectural 400",
    token: "--ic-architectural-400",
    hex: "#8a919b",
  },
  {
    name: "Architectural 500",
    token: "--ic-architectural-500",
    hex: "#6c7580",
  },
  {
    name: "Architectural 600",
    token: "--ic-architectural-600",
    hex: "#575e68",
  },
  {
    name: "Architectural 700",
    token: "--ic-architectural-700",
    hex: "#41464d",
  },
  {
    name: "Architectural 750",
    token: "--ic-architectural-750",
    hex: "#3b3e45",
  },
  {
    name: "Architectural 800",
    token: "--ic-architectural-800",
    hex: "#2c2f34",
  },
  {
    name: "Architectural 850",
    token: "--ic-architectural-850",
    hex: "#232629",
  },
  {
    name: "Architectural 900",
    token: "--ic-architectural-900",
    hex: "#17191c",
  },
  {
    name: "Architectural 950",
    token: "--ic-architectural-950",
    hex: "#0b0c0c",
  },
  {
    name: "Architectural white",
    token: "--ic-architectural-white",
    hex: "#ffffff",
  },
  {
    name: "Architectural black",
    token: "--ic-architectural-black",
    hex: "#000000",
  },
];

export const ColoursBrand: ColorConfig[] = [
  {
    name: "Brand blue (Primary)",
    token: "--ic-brand-blue-primary",
    hex: "#1b3c79",
  },
  {
    name: "Brand yellow (Primary)",
    token: "--ic-brand-yellow-primary",
    hex: "#ffc93c",
  },
];

export const ColoursFocus: ColorConfig[] = [
  {
    name: "Focus inner",
    token: "--ic-color-focus-inner",
    hex: "#0044d7",
  },
  {
    name: "Focus outer",
    token: "--ic-color-focus-outer",
    hex: "#80a1e8",
  },
];

export const ColoursKeyline: ColorConfig[] = [
  {
    name: "Keyline",
    token: "--ic-color-keyline",
    hex: "#c4c8cd",
  },
  {
    name: "Keyline light",
    token: "--ic-color-keyline-light",
    hex: "#e1e3e5",
  },
  {
    name: "Keyline lighten",
    token: "--ic-color-keyline-lighten",
    hex: "#ffffff33",
  },
  {
    name: "Keyline darken",
    token: "--ic-color-keyline-darken",
    hex: "#00000033",
  },
];

export const ColoursArchitecturalStateLayers: ColorConfig[] = [
  {
    name: "700 10%",
    token: "--ic-architectural-700-state-layer-10",
    hex: "#41464d1a",
  },
  {
    name: "700 20%",
    token: "--ic-architectural-700-state-layer-20",
    hex: "#41464d33",
  },
  {
    name: "700 24%",
    token: "--ic-architectural-700-state-layer-24",
    hex: "#41464d3d",
  },
  {
    name: "700 34%",
    token: "--ic-architectural-700-state-layer-34",
    hex: "#41464d57",
  },
  {
    name: "White 10%",
    token: "--ic-architectural-white-state-layer-10",
    hex: "#ffffff1a",
  },
  {
    name: "White 20%",
    token: "--ic-architectural-white-state-layer-20",
    hex: "#ffffff33",
  },
  {
    name: "White 24%",
    token: "--ic-architectural-white-state-layer-24",
    hex: "#ffffff3d",
  },
  {
    name: "White 25%",
    token: "--ic-architectural-white-state-layer-25",
    hex: "#ffffff40",
  },
  {
    name: "White 30%",
    token: "--ic-architectural-white-state-layer-30",
    hex: "#ffffff40",
  },
  {
    name: "White 34%",
    token: "--ic-architectural-white-state-layer-34",
    hex: "#ffffff57",
  },
  {
    name: "White 40%",
    token: "--ic-architectural-white-state-layer-40",
    hex: "#ffffff66",
  },
  {
    name: "White 50%",
    token: "--ic-architectural-white-state-layer-50",
    hex: "#ffffff80",
  },
];

export const ColoursBlue: ColorConfig[] = [
  {
    name: "Blue 0",
    token: "--ic-blue-0",
    hex: "#e1f0fc",
  },
  {
    name: "Blue 50",
    token: "--ic-blue-50",
    hex: "#c3e1f9",
  },
  {
    name: "Blue 100",
    token: "--ic-blue-100",
    hex: "#98c9f5",
  },
  {
    name: "Blue 200",
    token: "--ic-blue-200",
    hex: "#77b4f0",
  },
  {
    name: "Blue 300",
    token: "--ic-blue-300",
    hex: "#5da0ea",
  },
  {
    name: "Blue 400",
    token: "--ic-blue-400",
    hex: "#488fe3",
  },
  {
    name: "Blue 500",
    token: "--ic-blue-500",
    hex: "#377fdb",
  },
  {
    name: "Blue 600",
    token: "--ic-blue-600",
    hex: "#2a71d2",
  },
  {
    name: "Blue 700",
    token: "--ic-blue-700",
    hex: "#2064c8",
  },
  {
    name: "Blue 800",
    token: "--ic-blue-800",
    hex: "#1759bc",
  },
  {
    name: "Blue 900",
    token: "--ic-blue-900",
    hex: "#124db3",
  },
  {
    name: "Blue 1000",
    token: "--ic-blue-1000",
    hex: "#0e43a8",
  },
  {
    name: "Blue 1100",
    token: "--ic-blue-1100",
    hex: "#0b399c",
  },
  {
    name: "Blue 1200",
    token: "--ic-blue-1200",
    hex: "#09308e",
  },
  {
    name: "Blue 1300",
    token: "--ic-blue-1300",
    hex: "#07277e",
  },
  {
    name: "Blue 1400",
    token: "--ic-blue-1400",
    hex: "#1b3c79",
  },
  {
    name: "Blue 1500",
    token: "--ic-blue-1500",
    hex: "#122e63",
  },
  {
    name: "Blue 1600",
    token: "--ic-blue-1600",
    hex: "#041144",
  },
  {
    name: "Blue 1700",
    token: "--ic-blue-1700",
    hex: "#020b2e",
  },
];

export const ColoursBlueStateLayers: ColorConfig[] = [
  {
    name: "800 10%",
    token: "--ic-blue-800-state-layer-10",
    hex: "#1759bc1a",
  },
  {
    name: "800 20%",
    token: "--ic-blue-800-state-layer-20",
    hex: "#1759bc33",
  },
  {
    name: "800 24%",
    token: "--ic-blue-800-state-layer-24",
    hex: "#1759bc3d",
  },
  {
    name: "800 30%",
    token: "--ic-blue-800-state-layer-30",
    hex: "#1759bc4d",
  },
  {
    name: "800 34%",
    token: "--ic-blue-800-state-layer-34",
    hex: "#1759bc57",
  },
  {
    name: "800 50%",
    token: "--ic-blue-800-state-layer-50",
    hex: "#1759bc80",
  },
];

export const ColoursGreen: ColorConfig[] = [
  {
    name: "Green 0",
    token: "--ic-green-0",
    hex: "#e8fef3",
  },
  {
    name: "Green 50",
    token: "--ic-green-50",
    hex: "#d1fde7",
  },
  {
    name: "Green 100",
    token: "--ic-green-100",
    hex: "#b2fad6",
  },
  {
    name: "Green 200",
    token: "--ic-green-200",
    hex: "#97f6c8",
  },
  {
    name: "Green 300",
    token: "--ic-green-300",
    hex: "#81f2bb",
  },
  {
    name: "Green 400",
    token: "--ic-green-400",
    hex: "#6dedaf",
  },
  {
    name: "Green 500",
    token: "--ic-green-500",
    hex: "#5ce7a3",
  },
  {
    name: "Green 600",
    token: "--ic-green-600",
    hex: "#4cdf98",
  },
  {
    name: "Green 700",
    token: "--ic-green-700",
    hex: "#3ed78d",
  },
  {
    name: "Green 800",
    token: "--ic-green-800",
    hex: "#31cd83",
  },
  {
    name: "Green 900",
    token: "--ic-green-900",
    hex: "#26c278",
  },
  {
    name: "Green 1000",
    token: "--ic-green-1000",
    hex: "#1bb56c",
  },
  {
    name: "Green 1100",
    token: "--ic-green-1100",
    hex: "#12a661",
  },
  {
    name: "Green 1200",
    token: "--ic-green-1200",
    hex: "#0b9655",
  },
  {
    name: "Green 1300",
    token: "--ic-green-1300",
    hex: "#058449",
  },
  {
    name: "Green 1400",
    token: "--ic-green-1400",
    hex: "#00703c",
  },
  {
    name: "Green 1600",
    token: "--ic-green-1600",
    hex: "#0e462b",
  },
  {
    name: "Green 1700",
    token: "--ic-green-1700",
    hex: "#0e3020",
  },
];

export const ColoursPurple: ColorConfig[] = [
  {
    name: "Purple 0",
    token: "--ic-purple-0",
    hex: "#f9f2ff",
  },
  {
    name: "Purple 50",
    token: "--ic-purple-50",
    hex: "#efdbff",
  },
  {
    name: "Purple 100",
    token: "--ic-purple-100",
    hex: "#e4c5ff",
  },
  {
    name: "Purple 200",
    token: "--ic-purple-200",
    hex: "#d5a2fe",
  },
  {
    name: "Purple 300",
    token: "--ic-purple-300",
    hex: "#c988fd",
  },
  {
    name: "Purple 400",
    token: "--ic-purple-400",
    hex: "#bf74fc",
  },
  {
    name: "Purple 500",
    token: "--ic-purple-500",
    hex: "#b764fb",
  },
  {
    name: "Purple 600",
    token: "--ic-purple-600",
    hex: "#b057f9",
  },
  {
    name: "Purple 700",
    token: "--ic-purple-700",
    hex: "#ab4df7",
  },
  {
    name: "Purple 800",
    token: "--ic-purple-800",
    hex: "#a645f5",
  },
  {
    name: "Purple 900",
    token: "--ic-purple-900",
    hex: "#a13ef2",
  },
  {
    name: "Purple 1000",
    token: "--ic-purple-1000",
    hex: "#9c38ee",
  },
  {
    name: "Purple 1100",
    token: "--ic-purple-1100",
    hex: "#9733e8",
  },
  {
    name: "Purple 1200",
    token: "--ic-purple-1200",
    hex: "#902fe0",
  },
  {
    name: "Purple 1300",
    token: "--ic-purple-1300",
    hex: "#882ad5",
  },
  {
    name: "Purple 1400",
    token: "--ic-purple-1400",
    hex: "#7c25c2",
  },
  {
    name: "Purple 1800",
    token: "--ic-purple-1800",
    hex: "#350f54",
  },
];

export const ColoursRed: ColorConfig[] = [
  {
    name: "Red 0",
    token: "--ic-red-0",
    hex: "#ffe4e3",
  },
  {
    name: "Red 50",
    token: "--ic-red-50",
    hex: "#fec9c8",
  },
  {
    name: "Red 100",
    token: "--ic-red-100",
    hex: "#fca19e",
  },
  {
    name: "Red 200",
    token: "--ic-red-200",
    hex: "#f9837d",
  },
  {
    name: "Red 300",
    token: "--ic-red-300",
    hex: "#f66d63",
  },
  {
    name: "Red 400",
    token: "--ic-red-400",
    hex: "#f15b4e",
  },
  {
    name: "Red 500",
    token: "--ic-red-500",
    hex: "#ec4e3d",
  },
  {
    name: "Red 600",
    token: "--ic-red-600",
    hex: "#e54330",
  },
  {
    name: "Red 700",
    token: "--ic-red-700",
    hex: "#dd3b25",
  },
  {
    name: "Red 800",
    token: "--ic-red-800",
    hex: "#d4351c",
  },
  {
    name: "Red 900",
    token: "--ic-red-900",
    hex: "#c92c16",
  },
  {
    name: "Red 1000",
    token: "--ic-red-1000",
    hex: "#bc2411",
  },
  {
    name: "Red 1100",
    token: "--ic-red-1100",
    hex: "#ad1e0e",
  },
  {
    name: "Red 1300",
    token: "--ic-red-1300",
    hex: "#8b1209",
  },
  {
    name: "Red 1500",
    token: "--ic-red-1500",
    hex: "#610a05",
  },
  {
    name: "Red 1700",
    token: "--ic-red-1700",
    hex: "#330403",
  },
];

export const ColoursYellow: ColorConfig[] = [
  {
    name: "Yellow 0",
    token: "--ic-yellow-0",
    hex: "#fffbd8",
  },
  {
    name: "Yellow 50",
    token: "--ic-yellow-50",
    hex: "#fff7b0",
  },
  {
    name: "Yellow 100",
    token: "--ic-yellow-100",
    hex: "#ffed83",
  },
  {
    name: "Yellow 200",
    token: "--ic-yellow-200",
    hex: "#ffe058",
  },
  {
    name: "Yellow 300",
    token: "--ic-yellow-300",
    hex: "#ffd12e",
  },
  {
    name: "Yellow 400",
    token: "--ic-yellow-400",
    hex: "#ffc107",
  },
  {
    name: "Yellow 500",
    token: "--ic-yellow-500",
    hex: "#f8ae10",
  },
  {
    name: "Yellow 600",
    token: "--ic-yellow-600",
    hex: "#f09d19",
  },
  {
    name: "Yellow 700",
    token: "--ic-yellow-700",
    hex: "#e78f22",
  },
  {
    name: "Yellow 800",
    token: "--ic-yellow-800",
    hex: "#dc832a",
  },
  {
    name: "Yellow 900",
    token: "--ic-yellow-900",
    hex: "#d07932",
  },
  {
    name: "Yellow 1000",
    token: "--ic-yellow-1000",
    hex: "#c26f38",
  },
  {
    name: "Yellow 1100",
    token: "--ic-yellow-1100",
    hex: "#b3673c",
  },
  {
    name: "Yellow 1200",
    token: "--ic-yellow-1200",
    hex: "#a25e3f",
  },
  {
    name: "Yellow 1300",
    token: "--ic-yellow-1300",
    hex: "#8f553e",
  },
  {
    name: "Yellow 1400",
    token: "--ic-yellow-1400",
    hex: "#7a4c3c",
  },
  {
    name: "Yellow 1700",
    token: "--ic-yellow-1700",
    hex: "#342521",
  },
];
