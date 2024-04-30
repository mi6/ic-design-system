const accountSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>account</title><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>`;

export const COLUMNS = [
  {
    key: "firstName",
    title: "First name",
    dataType: "string",
  },
  {
    key: "lastName",
    title: "Last name",
    dataType: "string",
  },
  {
    key: "age",
    title: "Age",
    dataType: "number",
  },
];
export const DATA = [
  {
    firstName: "Joe",
    lastName: "Bloggs",
    age: 30,
  },
  {
    firstName: "Sarah",
    lastName: "Smith",
    age: 28,
  },
  {
    firstName: "Mark",
    lastName: "Owens",
    age: 45,
  },
];
export const LONG_COLUMNS = [
  {
    key: "employeeNumber",
    title: "Employee number",
    dataType: "number",
    columnAlignment: { horizontal: "left" },
  },
  {
    key: "name",
    title: "Name",
    dataType: "string",
  },
  {
    key: "age",
    title: "Age",
    dataType: "number",
  },
];
export const LONG_DATA = [
  {
    employeeNumber: 1,
    name: "Joe Bloggs",
    age: 30,
  },
  {
    employeeNumber: 2,
    name: "Sarah Jones",
    age: 28,
  },
  {
    employeeNumber: 3,
    name: "Mark Owens",
    age: 45,
  },
  {
    employeeNumber: 4,
    name: "Naomi Thomas",
    age: 32,
  },
  {
    employeeNumber: 5,
    name: "Luke Ashford",
    age: 18,
  },
  {
    employeeNumber: 6,
    name: "Dave Smith",
    age: 33,
  },
  {
    employeeNumber: 7,
    name: "Amy Fox",
    age: 27,
  },
  {
    employeeNumber: 8,
    name: "Mary Cooper",
    age: 31,
  },
  {
    employeeNumber: 9,
    name: "Alice Cole",
    age: 38,
  },
  {
    employeeNumber: 10,
    name: "Ben Fields",
    age: 40,
  },
  {
    employeeNumber: 11,
    name: "Pete Norton",
    age: 32,
  },
  {
    employeeNumber: 12,
    name: "Ashley Langford",
    age: 29,
  },
  {
    employeeNumber: 13,
    name: "Michael Hall",
    age: 35,
  },
  {
    employeeNumber: 14,
    name: "David Frank",
    age: 28,
  },
  {
    employeeNumber: 15,
    name: "Mary Lincoln",
    age: 23,
  },
  {
    employeeNumber: 16,
    name: "Will Barns",
    age: 36,
  },
  {
    employeeNumber: 17,
    name: "Elizabeth Long",
    age: 43,
  },
  {
    employeeNumber: 18,
    name: "Keith Jones",
    age: 37,
  },
  {
    employeeNumber: 19,
    name: "Olivia Brown",
    age: 19,
  },
  {
    employeeNumber: 20,
    name: "Tim Green",
    age: 50,
  },
];
export const ROW_HEADER_COLUMNS = [
  {
    key: "header",
    title: "Job Title",
    dataType: "string",
  },
  {
    key: "firstName",
    title: "First name",
    dataType: "string",
  },
  {
    key: "lastName",
    title: "Last name",
    dataType: "string",
  },
  {
    key: "age",
    title: "Age",
    dataType: "number",
  },
];
export const ROW_HEADER_DATA = [
  {
    header: { title: "Employee" },
    firstName: "Joe",
    lastName: "Bloggs",
    age: 30,
  },
  {
    header: { title: "Employee" },
    firstName: "Sarah",
    lastName: "Smith",
    age: 28,
  },
  {
    header: { title: "Manager" },
    firstName: "Mark",
    lastName: "Owens",
    age: 45,
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
    key: "lastName",
    title: "Last name",
    dataType: "string",
  },
  {
    key: "age",
    title: "Age",
    dataType: "number",
  },
];
export const ROW_OVERRIDES_DATA = [
  {
    header: {
      title: "Employee",
      rowAlignment: "middle",
      emphasis: "high",
    },
    firstName: "Joe",
    lastName: "Bloggs",
    age: 30,
  },
  {
    header: { title: "Employee" },
    firstName: "Sarah",
    lastName: "Smith",
    age: 28,
  },
  {
    header: { title: "Manager" },
    firstName: "Mark",
    lastName: "Owens",
    age: 45,
  },
];
export const CELL_OVERRIDES_DATA = [
  {
    firstName: {
      data: "Joe",
      cellAlignment: { horizontal: "center", vertical: "middle" },
      emphasis: "high",
    },
    lastName: "Bloggs",
    age: 30,
  },
  {
    firstName: "Sarah",
    lastName: "Smith",
    age: 28,
  },
  {
    firstName: "Mark",
    lastName: "Owens",
    age: 45,
  },
];

export const COLUMNS_ELEMENTS = [
  {
    key: "firstName",
    title: "First name",
    dataType: "string",
  },
  {
    key: "lastName",
    title: "Last name",
    dataType: "string",
  },
  {
    key: "age",
    title: "Age",
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
    lastName: "Bloggs",
    age: 30,
    actions: `<ic-button variant='destructive' onClick='this.closest("tr").remove()'>Delete</ic-button>`,
  },
  {
    firstName: "Sarah",
    lastName: "Smith",
    age: 28,
    actions: `<ic-button variant='destructive' onClick='this.closest("tr").remove()'>Delete</ic-button>`,
  },
  {
    firstName: "Mark",
    lastName: "Owens",
    age: 45,
    actions: `<ic-button variant='destructive' onClick='this.closest("tr").remove()'>Delete</ic-button>`,
  },
];

export const DATA_REACT_ELEMENTS = [
  {
    firstName: {
      data: "Joe",
      href: "https://www.example.com",
    },
    lastName: "Bloggs",
    age: 30,
    jobTitle: "Developer",
    address: "1 Main Street, Town, County, Postcode",
  },
  {
    firstName: "Sarah",
    lastName: "Smith",
    age: 28,
    jobTitle: "Analyst",
    address: "2 Main Street, Town, Country, Postcode",
  },
  {
    firstName: "Mark",
    lastName: "Owens",
    age: 45,
    jobTitle: "Team Lead",
    address: "12 Key Street, Town, Country, Postcode",
  },
  {
    firstName: "Naomi",
    lastName: "Thomas",
    age: 32,
    jobTitle: "Developer",
    address: "8 Side Street, Town, Country, Postcode",
  },
  {
    firstName: "Luke",
    lastName: "Ashford",
    age: 18,
    jobTitle: "Junior Developer",
    address: "5 New Street, Town, Country, Postcode",
  },
];
export const ICON_DATA = [
  {
    firstName: {
      data: "Joe",
      icon: accountSVG,
    },
    lastName: "Bloggs",
    age: 30,
  },
  {
    firstName: "Sarah",
    lastName: "Smith",
    age: 28,
  },
  {
    firstName: {
      data: "Mark",
      icon: accountSVG,
    },
    lastName: "Owens",
    age: 45,
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
    key: "lastName",
    title: "Last name",
    dataType: "string",
    cellAlignment: "center",
    columnAlignment: { horizontal: "center", vertical: "bottom" },
  },
  {
    key: "age",
    title: "Age",
    dataType: "number",
  },
];
export const LOADING_DATA = [
  {
    firstName: "Joe",
    lastName: "Bloggs",
    age: 30,
  },
  {
    firstName: "Sarah",
    lastName: "Smith",
    age: 28,
  },
  {
    firstName: "Mark",
    lastName: "Owens",
    age: 45,
  },
  {
    firstName: "Naomi",
    lastName: "Thomas",
    age: 32,
  },
  {
    firstName: "Luke",
    lastName: "Ashford",
    age: 18,
  },
];
