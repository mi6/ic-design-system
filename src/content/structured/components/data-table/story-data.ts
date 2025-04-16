const accountSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>account</title><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>`;

export const COLUMNS = [
  {
    key: "firstName",
    title: "First name",
    dataType: "string",
  },
  {
    key: "coffeeOrder",
    title: "Coffee order",
    dataType: "string",
  },
  {
    key: "quantity",
    title: "Quantity",
    dataType: "number",
  },
];
export const DATA = [
  {
    firstName: "Joe",
    coffeeOrder: "Latte",
    quantity: 3,
  },
  {
    firstName: "Sarah",
    coffeeOrder: "Mocha",
    quantity: 2,
  },
  {
    firstName: "Mark",
    coffeeOrder: "Espresso",
    quantity: 1,
  },
];
export const LONG_COLUMNS = [
  {
    key: "orderNumber",
    title: "Order number",
    dataType: "number",
    columnAlignment: { horizontal: "left" },
  },
  {
    key: "name",
    title: "Name",
    dataType: "string",
  },
  {
    key: "coffeeOrder",
    title: "Coffee order",
    dataType: "string",
  },
];
export const LONG_DATA = [
  {
    orderNumber: 1,
    name: "Joe Bloggs",
    coffeeOrder: "Latte",
  },
  {
    orderNumber: 2,
    name: "Sarah Jones",
    coffeeOrder: "Mocha",
  },
  {
    orderNumber: 3,
    name: "Mark Owens",
    coffeeOrder: "Espresso",
  },
  {
    orderNumber: 4,
    name: "Naomi Thomas",
    coffeeOrder: "Cappuccino",
  },
  {
    orderNumber: 5,
    name: "Luke Ashford",
    coffeeOrder: "Americano",
  },
  {
    orderNumber: 6,
    name: "Dave Smith",
    coffeeOrder: "Flat white",
  },
  {
    orderNumber: 7,
    name: "Amy Fox",
    coffeeOrder: "Macchiato",
  },
  {
    orderNumber: 8,
    name: "Mary Cooper",
    coffeeOrder: "Affogato",
  },
  {
    orderNumber: 9,
    name: "Alice Cole",
    coffeeOrder: "Latte",
  },
  {
    orderNumber: 10,
    name: "Ben Fields",
    coffeeOrder: "Mocha",
  },
  {
    orderNumber: 11,
    name: "Pete Norton",
    coffeeOrder: "Americano",
  },
  {
    orderNumber: 12,
    name: "Ashley Langford",
    coffeeOrder: "Latte",
  },
  {
    orderNumber: 13,
    name: "Michael Hall",
    coffeeOrder: "Espresso",
  },
  {
    orderNumber: 14,
    name: "David Frank",
    coffeeOrder: "Flat white",
  },
  {
    orderNumber: 15,
    name: "Mary Lincoln",
    coffeeOrder: "Macchiato",
  },
  {
    orderNumber: 16,
    name: "Will Barns",
    coffeeOrder: "Americano",
  },
  {
    orderNumber: 17,
    name: "Elizabeth Long",
    coffeeOrder: "Cappuccino",
  },
  {
    orderNumber: 18,
    name: "Keith Jones",
    coffeeOrder: "Affogato",
  },
  {
    orderNumber: 19,
    name: "Olivia Brown",
    coffeeOrder: "Latte",
  },
  {
    orderNumber: 20,
    name: "Tim Green",
    coffeeOrder: "Mocha",
  },
];
export const ROW_HEADER_COLUMNS = [
  {
    key: "header",
    title: "Order number",
    dataType: "number",
  },
  {
    key: "firstName",
    title: "First name",
    dataType: "string",
  },
  {
    key: "coffeeOrder",
    title: "Coffee order",
    dataType: "string",
  },
  {
    key: "quantity",
    title: "Quantity",
    dataType: "number",
  },
];
export const ROW_HEADER_DATA = [
  {
    header: { title: 1 },
    firstName: "Joe",
    coffeeOrder: "Latte",
    quantity: 3,
  },
  {
    header: { title: 2 },
    firstName: "Sarah",
    coffeeOrder: "Mocha",
    quantity: 2,
  },
  {
    header: { title: 3 },
    firstName: "Mark",
    coffeeOrder: "Espresso",
    quantity: 1,
  },
];
export const COLUMN_OVERRIDES = [
  {
    key: "firstName",
    title: "First name",
    dataType: "string",
    columnAlignment: { horizontal: "center", vertical: "middle" },
    emphasis: "high",
  },
  {
    key: "coffeeOrder",
    title: "Coffee order",
    dataType: "string",
  },
  {
    key: "quantity",
    title: "Quantity",
    dataType: "number",
  },
];
export const ROW_OVERRIDES_DATA = [
  {
    header: {
      title: 1,
      rowAlignment: "middle",
      emphasis: "high",
    },
    firstName: "Joe",
    coffeeOrder: "Latte",
    quantity: 3,
  },
  {
    header: { title: 2 },
    firstName: "Sarah",
    coffeeOrder: "Mocha",
    quantity: 2,
  },
  {
    header: { title: 3 },
    firstName: "Mark",
    coffeeOrder: "Espresso",
    quantity: 1,
  },
];
export const CELL_OVERRIDES_DATA = [
  {
    firstName: {
      data: "Joe",
      cellAlignment: { horizontal: "center", vertical: "middle" },
      emphasis: "high",
    },
    coffeeOrder: "Latte",
    quantity: 3,
  },
  {
    firstName: "Sarah",
    coffeeOrder: "Mocha",
    quantity: 2,
  },
  {
    firstName: "Mark",
    coffeeOrder: "Espresso",
    quantity: 1,
  },
];

export const COLUMNS_ELEMENTS = [
  {
    key: "firstName",
    title: "First name",
    dataType: "string",
  },
  {
    key: "coffeeOrder",
    title: "Coffee order",
    dataType: "string",
  },
  {
    key: "quantity",
    title: "Quantity",
    dataType: "number",
  },
  {
    key: "actions",
    title: "Actions",
    dataType: "element",
    columnAlignment: { horizontal: "center" },
  },
];

export const DATA_ELEMENTS = [
  {
    firstName: {
      data: "Joe",
      href: "#",
    },
    coffeeOrder: "Latte",
    quantity: 3,
    actions: `<ic-button variant='destructive' onClick='this.closest("tr").remove()'>Delete</ic-button>`,
  },
  {
    firstName: "Sarah",
    coffeeOrder: "Mocha",
    quantity: 2,
    actions: `<ic-button variant='destructive' onClick='this.closest("tr").remove()'>Delete</ic-button>`,
  },
  {
    firstName: "Mark",
    coffeeOrder: "Espresso",
    quantity: 1,
    actions: `<ic-button variant='destructive' onClick='this.closest("tr").remove()'>Delete</ic-button>`,
  },
];

export const DATA_REACT_ELEMENTS = [
  {
    firstName: {
      data: "Joe",
      href: "https://www.example.com",
    },
    coffeeOrder: "Latte",
    quantity: 3,
  },
  {
    firstName: "Sarah",
    coffeeOrder: "Mocha",
    quantity: 2,
  },
  {
    firstName: "Mark",
    coffeeOrder: "Espresso",
    quantity: 1,
  },
  {
    firstName: "Naomi",
    coffeeOrder: "Thomas",
    quantity: 4,
  },
  {
    firstName: "Luke",
    coffeeOrder: "Ashford",
    quantity: 2,
  },
];
export const ICON_DATA = [
  {
    firstName: {
      data: "Joe",
      icon: accountSVG,
    },
    coffeeOrder: "Latte",
    quantity: 3,
  },
  {
    firstName: "Sarah",
    coffeeOrder: "Mocha",
    quantity: 2,
  },
  {
    firstName: {
      data: "Mark",
      icon: accountSVG,
    },
    coffeeOrder: "Espresso",
    quantity: 1,
  },
];
export const ICON_COLUMNS = [
  {
    key: "firstName",
    title: "First name",
    dataType: "string",
    cellAlignment: "right",
    columnAlignment: { horizontal: "right", vertical: "middle" },
    icon: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>account-outline</title><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M12,13C14.67,13 20,14.33 20,17V20H4V17C4,14.33 9.33,13 12,13M12,14.9C9.03,14.9 5.9,16.36 5.9,17V18.1H18.1V17C18.1,16.36 14.97,14.9 12,14.9Z" /></svg>`,
      onAllCells: true,
      hideOnHeader: true,
    },
  },
  {
    key: "coffeeOrder",
    title: "Coffee order",
    dataType: "string",
    cellAlignment: "center",
    columnAlignment: { horizontal: "center", vertical: "bottom" },
  },
  {
    key: "quantity",
    title: "Quantity",
    dataType: "number",
  },
];
export const LOADING_DATA = [
  {
    firstName: "Joe",
    coffeeOrder: "Latte",
    quantity: 3,
  },
  {
    firstName: "Sarah",
    coffeeOrder: "Mocha",
    quantity: 2,
  },
  {
    firstName: "Mark",
    coffeeOrder: "Espresso",
    quantity: 1,
  },
  {
    firstName: "Naomi",
    coffeeOrder: "Thomas",
    quantity: 4,
  },
  {
    firstName: "Luke",
    coffeeOrder: "Ashford",
    quantity: 2,
  },
];

export const TRUNCATION_COLUMNS = [
  {
    key: "firstName",
    title: "First name",
    dataType: "string",
  },
  {
    key: "coffeeOrder",
    title: "Coffee order",
    dataType: "string",
  },
  {
    key: "coffeeDescription",
    title: "Coffee description",
    dataType: "string",
  },
];

export const TRUNCATION_DATA = [
  {
    firstName: "Joe",
    coffeeOrder: "Latte",
    coffeeDescription:
      "A latte is a coffee drink made with espresso and steamed milk.",
  },
  {
    firstName: "Sarah",
    coffeeOrder: "Mocha",
    coffeeDescription:
      "A mocha is a chocolate-flavoured variant of a caffè latte.",
  },
  {
    firstName: "Mark",
    coffeeOrder: "Espresso",
    coffeeDescription:
      "An espresso is a concentrated form of coffee served in small, strong shots.",
  },
];

export const COLS_WIDTH = [
  {
    key: "firstName",
    title: "First name",
    dataType: "string",
    columnWidth: "15%",
  },
  {
    key: "coffeeOrder",
    title: "Coffee order",
    dataType: "string",
    columnWidth: "300px",
  },
  {
    key: "quantity",
    title: "Quantity",
    dataType: "number",
    columnWidth: {
      maxWidth: "100px",
    },
  },
];

export const DATA_WITH_DESCRIPTIONS = [
  {
    firstName: "Joe",
    coffeeOrder: {
      data: "Latte",
      description: {
        data: "A latte is a coffee drink made with espresso and steamed milk.",
        icon: '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Coffee</title><path d="M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M16,5H6V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5Z" /></svg>',
      },
    },
    quantity: 1,
  },
  {
    firstName: "Sarah",
    coffeeOrder: {
      data: "Mocha",
      description: {
        data: "A mocha is a chocolate-flavoured variant of a caffè latte.",
        icon: '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Coffee</title><path d="M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M16,5H6V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5Z" /></svg>',
      },
    },
    quantity: 6,
  },
  {
    firstName: "Mark",
    coffeeOrder: {
      data: "Espresso",
      description: {
        data: "An espresso is a concentrated form of coffee served in small, strong shots.",
        icon: '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Coffee</title><path d="M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M16,5H6V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5Z" /></svg>',
      },
    },
    quantity: 2,
  },
];

export const DATA_WITH_EMPTY_VALUES = [
  {
    firstName: "Joe",
    coffeeOrder: null,
    quantity: 3,
  },
  {
    firstName: "Sarah",
    coffeeOrder: "Mocha",
    quantity: undefined,
  },
  {
    firstName: "",
    coffeeOrder: "Espresso",
    quantity: 1,
  },
];
