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
