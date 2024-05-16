export const ColoursText = [
  {
    colors: [
      {
        name: "Primary text",
        token: "--ic-color-primary-text",
        hex: "#0B0C0C",
      },
      {
        name: "Secondary text",
        token: "--ic-color-secondary-text",
        hex: "#41464D",
      },
      {
        name: "Tertiary text",
        token: "--ic-color-tertiary-text",
        hex: "#6C7580",
      },
      {
        name: "White text",
        token: "--ic-color-white-text",
        hex: "#FFFFFF",
        border: true,
      },
    ],
  },
];

export const ColoursAction = [
  {
    colors: [
      {
        name: "Action default active",
        token: "--ic-action-default",
        hex: "#1759BC",
      },
      {
        name: "Action default hover",
        token: "--ic-action-default-hover",
        hex: "#0B399C",
      },
      {
        name: "Action default pressed",
        token: "--ic-action-default-active",
        hex: "#07277E",
      },
      {
        name: "Destructive active",
        token: "--ic-action-destructive",
        hex: "#D4351C",
      },
      {
        name: "Destructive hover",
        token: "--ic-action-destructive-hover",
        hex: "#AD1E0E",
      },
      {
        name: "Destructive pressed",
        token: "--ic-action-destructive-active",
        hex: "#8B1209",
      },
      {
        name: "Action light active",
        token: "--ic-action-light",
        hex: "#FFFFFF",
        border: true,
      },
      {
        name: "Action light hover",
        token: "--ic-action-light-hover",
        hex: "#C4C8CD",
      },
      {
        name: "Action light pressed",
        token: "--ic-action-light-active",
        hex: "#A7ACB3",
      },
      { name: "Action dark active", token: "--ic-action-dark", hex: "#0B0C0C" },
      { name: "Action dark hover", token: "--ic-action-hover", hex: "#2C2F34" },
      {
        name: "Action dark pressed",
        token: "--ic-action-active",
        hex: "#41464D",
      },
    ],
  },
];

export const ColoursActionBackgrounds = [
  {
    colors: [
      {
        name: "Action background hover",
        token: "--ic-action-default-bg-hover",
        hex: "#1759BC1A",
        hexDisplay: "#1759BC, 10%",
      },
      {
        name: "Action background pressed",
        token: "--ic-action-default-bg-active",
        hex: "#1759BC33",
        hexDisplay: "#1759BC, 20%",
      },
      {
        name: "Action dark background hover",
        token: "--ic-action-dark-bg-hover",
        hex: "#41464D1A",
        hexDisplay: "#41464D, 10%",
      },
      {
        name: "Action dark background pressed",
        token: "--ic-action-dark-bg-active",
        hex: "#41464D33",
        hexDisplay: "#41464D, 20%",
      },
      {
        name: "Action light background hover",
        token: "--ic-action-light-bg-hover",
        hex: "#FFFFFF1A",
        hexDisplay: "#FFFFFF, 10%",
        border: true,
      },
      {
        name: "Action light background pressed",
        token: "--ic-action-light-bg-active",
        hex: "#FFFFFF33",
        hexDisplay: "#FFFFFF, 20%",
        border: true,
      },
    ],
  },
];

export const ColoursLinks = [
  {
    colors: [
      { name: "Link", token: "--ic-hyperlink", hex: "#1759BC" },
      { name: "Link visited", token: "--ic-hyperlink-visited", hex: "#330072" },
      { name: "Link hover", token: "--ic-hyperlink-hover", hex: "#7C2855" },
    ],
  },
];

export const ColoursStatus = [
  {
    colors: [
      { name: "Success", token: "--ic-status-success", hex: "#00703C" },
      {
        name: "Success light",
        token: "--ic-status-success-light",
        hex: "#E8FEF3",
      },
      {
        name: "Success contrast",
        token: "--ic-status-success-contrast",
        hex: "#1BB56C",
      },
      {
        name: "Success dark",
        token: "--ic-status-success-dark",
        hex: "#0E3020",
      },
      { name: "Warning", token: "--ic-status-warning", hex: "#D07932" },
      {
        name: "Warning light",
        token: "--ic-status-warning-light",
        hex: "#FFFBD8",
      },
      {
        name: "Warning contrast",
        token: "--ic-status-warning-contrast",
        hex: "#FFC107",
      },
      {
        name: "Warning dark",
        token: "--ic-status-warning-dark",
        hex: "#7A4C3C",
      },
      { name: "Error", token: "--ic-status-error", hex: "#D4351C" },
      {
        name: "Error light",
        token: "--ic-status-error-light",
        hex: "#FFE4E3",
      },
      {
        name: "Error contrast",
        token: "--ic-status-error-contrast",
        hex: "#F15B4E",
      },
      {
        name: "Error dark",
        token: "--ic-status-error-dark",
        hex: "#610A05",
      },
      { name: "Information", token: "--ic-status-info", hex: "#124DB3" },
      {
        name: "Information light",
        token: "--ic-status-info-light",
        hex: "#E1F0FC",
      },
      {
        name: "Information contrast",
        token: "--ic-status-info-contrast",
        hex: "#488FE3",
      },
      {
        name: "Information dark",
        token: "--ic-status-info-dark",
        hex: "#041144",
      },
      { name: "Anomalous", token: "--ic-status-anomalous", hex: "#7C25C2" },
      {
        name: "Anomalous light",
        token: "--ic-status-anomalous-light",
        hex: "#EFDBFF",
      },
      {
        name: "Anomalous contrast",
        token: "--ic-status-anomalous-contrast",
        hex: "#B764FB",
      },
      {
        name: "Anomalous dark",
        token: "--ic-status-anomalous-dark",
        hex: "#350F54",
      },
      { name: "Unknown", token: "--ic-status-unknown", hex: "#6C7580" },
      {
        name: "Unknown light",
        token: "--ic-status-unknown-light",
        hex: "#F4F4F5",
      },
      {
        name: "Unknown contrast",
        token: "--ic-status-unknown-contrast",
        hex: "#A7ACB3",
      },
      {
        name: "Unknown dark",
        token: "--ic-status-unknown-dark",
        hex: "#2C2F34",
      },
    ],
  },
];

export const ColoursDeprecatedStatus = [
  {
    colors: [
      {
        name: "Success background",
        token: "--ic-status-success-background",
        hex: "#E8FEF3",
        deprecated: true,
      },
      {
        name: "Warning mid",
        token: "--ic-status-warning-mid",
        hex: "#D07932",
        deprecated: true,
      },
      {
        name: "Warning background",
        token: "--ic-status-warning-background",
        hex: "#FFFBD8",
        deprecated: true,
      },
      {
        name: "Error background",
        token: "--ic-status-error-background",
        hex: "#FFE4E3",
        deprecated: true,
      },
      {
        name: "Information background",
        token: "--ic-status-info-background",
        hex: "#E1F0FC",
        deprecated: true,
      },
    ],
  },
];

export const ColoursClassification = [
  {
    colors: [
      { name: "Not set", token: "--ic-classification-not-set", hex: "#616161" },
      {
        name: "Official/Official sensitive",
        token: "--ic-classification-official",
        hex: "#2B71C7",
      },
      { name: "Secret", token: "--ic-classification-secret", hex: "#F39C2C" },
      {
        name: "Top secret",
        token: "--ic-classification-top-secret",
        hex: "#AA0000",
      },
    ],
  },
];

export const ColoursArchitecturalAll = [
  {
    colors: [
      {
        name: "Architectural black",
        token: "--ic-architectural-black",
        hex: "#000000",
      },
      {
        name: "Architectural 900",
        token: "--ic-architectural-900",
        hex: "#0B0C0C",
      },
      {
        name: "Architectural 800",
        token: "--ic-architectural-800",
        hex: "#2C2F34",
      },
      {
        name: "Architectural 700",
        token: "--ic-architectural-700",
        hex: "#41464D",
      },
      {
        name: "Architectural 600",
        token: "--ic-architectural-600",
        hex: "#575E68",
      },
      {
        name: "Architectural 500",
        token: "--ic-architectural-500",
        hex: "#6C7580",
      },
      {
        name: "Architectural 400",
        token: "--ic-architectural-400",
        hex: "#8A919B",
      },
      {
        name: "Architectural 300",
        token: "--ic-architectural-300",
        hex: "#A7ACB3",
      },
      {
        name: "Architectural 200",
        token: "--ic-architectural-200",
        hex: "#C4C8CD",
        border: true,
      },
      {
        name: "Architectural 100",
        token: "--ic-architectural-100",
        hex: "#E1E3E5",
        border: true,
      },
      {
        name: "Architectural 80",
        token: "--ic-architectural-80",
        hex: "#E8E9EB",
        border: true,
      },
      {
        name: "Architectural 60",
        token: "--ic-architectural-60",
        hex: "#EEEFF0",
        border: true,
      },
      {
        name: "Architectural 40",
        token: "--ic-architectural-40",
        hex: "#F4F4F5",
        border: true,
      },
      {
        name: "Architectural 20",
        token: "--ic-architectural-20",
        hex: "#F9FAFA",
        border: true,
      },
      {
        name: "Architectural white",
        token: "--ic-architectural-white",
        hex: "#FFFFFF",
        border: true,
      },
    ],
  },
];

export const ColoursTheme = [
  {
    colors: [{ name: "Default theme (blue)", hex: "#1B3C79" }],
  },
];
