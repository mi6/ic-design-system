const testFiles = {
  cypress: {
    fileName: "cypress.cy.tsx",
    disableMoreButton: false,
    snippets: {
      short: `// StackBlitz cannot currently run Cypress tests
it("should fill the form with no errors/validation", () => {
  mount(<Subscription />);
  // checkHydrated will wait until the component is hydrated and ensures it is ready to test
  checkHydrated(IC_PAGE_HEADER);

  // Check the first step is visible
  cy.get(IC_STEPPER).should(BE_VISIBLE);
  checkCurrentStep(0);

  // Select a radio option
  cy.get(IC_RADIO_OPTION).find(RADIO+'[value="house"]').check({ force: true });
  cy.get(IC_RADIO_OPTION+'[label="House Blend"]').should(HAVE_ATTR, SELECTED);

  // Select a select option using mouse
  clickOnShadowEl(IC_SELECT, IC_INPUT_CONTAINER);
  clickOnShadowEl(IC_SELECT, IC_MENU_OPTION+'[data-value="aeropress"]');

  // Select a select option using keyboard
  clickOnShadowEl(IC_SELECT, IC_INPUT_CONTAINER, 1);
  cy.realPress([ARROW_DOWN_KEY, ESCAPE_KEY]);

  // Go to next step, check the stepper and the logged formValues so far
  cy.get(IC_BUTTON).contains("Add to order").click();
  checkCurrentStep(1);
  cy.get(CONSOLE_LOG).should(HAVE_BEEN_CALLED_WITH, filledForm());

  // Fill out the text fields
  clickOnShadowEl(IC_TEXT_FIELD, IC_INPUT_CONTAINER);
  cy.realType("Java the Hutt")
  .realPress(TAB_KEY)
  .realType("javadahutt@tattooine.com")
  .realPress(TAB_KEY)
  .realType("1234567890");

  // Check both options in the checkbox group
  findShadowEl(IC_CHECKBOX, CHECKBOX).eq(0).check();
  findShadowEl(IC_CHECKBOX, CHECKBOX).eq(1).check();
  cy.get(IC_CHECKBOX).eq(0).should(HAVE_ATTR, CHECKED);
  cy.get(IC_CHECKBOX).eq(1).should(HAVE_ATTR, CHECKED);

  // Go to next step, check the stepper and the logged formValues so far
  cy.get(IC_BUTTON).contains("Add to order").click();
  cy.get(CONSOLE_LOG).should(HAVE_BEEN_CALLED_WITH, filledForm("details"));
  checkCurrentStep(2);

  // Select a date using the date picker
  findShadowEl(IC_DATE_PICKER, IC_DATE_INPUT)
  .shadow()
  .find(CALENDAR_BUTTON_ID)
  .click();
  findShadowEl(IC_DATE_PICKER, FOCUSSED_DAY_BTN_CLASS).click();
  checkDateInputValue(new Date());

  // Agree to terms
  cy.get(IC_RADIO_OPTION).find(RADIO+'[name="agree"]').check({ force: true });
  cy.get(IC_RADIO_OPTION + '[name="agree"]').should(HAVE_ATTR, SELECTED);

  // Submit and check the logged formValues
  cy.get(IC_BUTTON).contains("Submit order").click();
  let date = new Date();
  cy.get(CONSOLE_LOG).should(HAVE_BEEN_CALLED_WITH, filledForm("checkout"));
});`,
      long: `//StackBlitz cannot currently run Cypress tests
/* eslint-disable react/jsx-no-bind */
/// <reference types="Cypress" />

import { mount } from "cypress/react";
import {
  BE_VISIBLE,
  HAVE_ATTR,
  HAVE_BEEN_CALLED_WITH,
  NOT_HAVE_ATTR,
  HAVE_CLASS
} from "../../src/utils/cyConstants";
import Subscription from "../../src/components/Subscription/Subscription";

//* CONSTANTS
// ICDS Components
const IC_PAGE_HEADER = "ic-page-header";
const IC_STEPPER = "ic-stepper";
const IC_STEP = "ic-step";
const IC_ALERT = "ic-alert";
const IC_RADIO_OPTION = "ic-radio-option";
const IC_SELECT = "ic-select";
const IC_INPUT_CONTAINER = "ic-input-component-container";
const IC_MENU_OPTION = "ic-menu li";
const IC_TEXT_FIELD = "ic-text-field";
const IC_CHECKBOX = "ic-checkbox";
const IC_BUTTON = "ic-button";
const IC_DATE_PICKER = "ic-date-picker";
const IC_DATE_INPUT = "ic-date-input";
// HTML Elements
const CALENDAR_BUTTON_ID = "#calendar-button";
const FOCUSSED_DAY_BTN_CLASS = "button.day-button.focussed";
const CHECKBOX = '[type="checkbox"]';
const RADIO = '[type="radio"]';
const DAY_INPUT = ".day-input";
const MONTH_INPUT = ".month-input";
const YEAR_INPUT = ".year-input";
// Keyboard keys
const ESCAPE_KEY = "Escape";
const ARROW_DOWN_KEY = "ArrowDown";
const TAB_KEY = "Tab";
// Other
const CONSOLE_LOG = "@consoleLog";
const DATE_VAL = "val";
const STEP_TYPE = "type";
const CURRENT = "current";
const CHECKED = "checked";
const SELECTED = "selected";
const VALIDATION_STATUS = "validation-status";
const ERROR = "error";

//* METHODS
const checkHydrated = (element: string): void => {
  cy.get(\`\${element}\`).should(HAVE_CLASS, "hydrated");
};
const checkCurrentStep = (step: number) => {
  cy.get(IC_STEP)
    .eq(step)
    .should(BE_VISIBLE)
    .should(HAVE_ATTR, STEP_TYPE, CURRENT);
};

const findShadowEl = (
element: string,
selector: string
): Cypress.Chainable<JQuery<HTMLElement>> =>
cy.get(\`\${element}\`).shadow().find(\`\${selector}\`);

const clickOnShadowEl = (
element: string,
selector: string,
order: number = 0
): void => {
  cy.get(element).shadow().find(selector)?.eq(order).click();
};

const checkDateInputValue = (date: Date | null) => {
const currDay = (date && date.getDate()) || 0;
const currMon = (date && date.getMonth() + 1) || 0;
const currYear = (date && date.getFullYear()) || 0;
let dayVal: number;
let monthVal: number;
let yearVal: number;
  findShadowEl(IC_DATE_PICKER, IC_DATE_INPUT)
  .shadow()
  .find(DAY_INPUT)
  .invoke(DATE_VAL)
  .then((val: string) => {
  dayVal = Number(val);
  })
  .then(() => {
  expect(dayVal).to.eq(currDay);
  });
  findShadowEl(IC_DATE_PICKER, IC_DATE_INPUT)
  .shadow()
  .find(MONTH_INPUT)
  .invoke(DATE_VAL)
  .then((val: string) => {
  monthVal = Number(val);
  })
  .then(() => {
  expect(monthVal).to.eq(currMon);
  });
  findShadowEl(IC_DATE_PICKER, IC_DATE_INPUT)
  .shadow()
  .find(YEAR_INPUT)
  .invoke(DATE_VAL)
  .then((val: string) => {
  yearVal = Number(val);
  })
  .then(() => {
  expect(yearVal).to.eq(currYear);
  });
};

const formValues = {
  grind: 'aeropress',
  variety: 'house',
  size: '250',
  name: 'Java the Hutt',
  email: 'javadahutt@tattooine.com',
  phone: '1234567890',
  contact: ['sms', 'email'],
}

const filledForm = (page?: string): {} => {
  return {
    "checkoutForm": {
    "dateToStart": page === "checkout" ? new Date() : '',
    "terms": page === "checkout" ? "agree" : '',
    },
    "coffeeForm": {
    "variety": formValues.variety,
    "grind": formValues.grind,
    "size": formValues.size,
    },
    "detailForm": {
    "contact": [
        page === "details" || page === "checkout" ? formValues.contact[0] : "",
        page === "details" || page === "checkout" ? formValues.contact[1] : "",
    ],
    "email": page === "details" || page === "checkout" ? formValues.email : "", 
    "name": page === "details" || page === "checkout" ? formValues.name : "",
    "phone": page === "details" || page === "checkout" ? formValues.phone : "",
    },
  },
};

describe("Coffee subscription form", () => {
  beforeEach(() => {
      cy.viewport("macbook-16");
      cy.window().then((win) => {
      cy.spy(win.console, "log").as("consoleLog");
      });
  });
  it("should fill the form with no errors/validation", () => {
    mount(<Subscription />);
    // checkHydrated will wait until the component is hydrated and ensures it is ready to test
    checkHydrated(IC_PAGE_HEADER);

    // Check the first step is visible
    cy.get(IC_STEPPER).should(BE_VISIBLE);
    checkCurrentStep(0);

    // Select a radio option
    cy.get(IC_RADIO_OPTION).find(RADIO+'[value="house"]').check({ force: true });
    cy.get(IC_RADIO_OPTION+'[label="House Blend"]').should(HAVE_ATTR, SELECTED);

    // Select a select option using mouse
    clickOnShadowEl(IC_SELECT, IC_INPUT_CONTAINER);
    clickOnShadowEl(IC_SELECT, IC_MENU_OPTION+'[data-value="aeropress"]');

    // Select an option using keyboard
    clickOnShadowEl(IC_SELECT, IC_INPUT_CONTAINER, 1);
    cy.realPress([ARROW_DOWN_KEY, ESCAPE_KEY]);

    // Go to next step, check the stepper and the logged formValues so far
    cy.get(IC_BUTTON).contains("Add to order").click();
    checkCurrentStep(1);
    cy.get(CONSOLE_LOG).should(HAVE_BEEN_CALLED_WITH, filledForm());

    // Fill out the text fields
    clickOnShadowEl(IC_TEXT_FIELD, IC_INPUT_CONTAINER);
    cy.realType("Java the Hutt")
    .realPress(TAB_KEY)
    .realType("javadahutt@tattooine.com")
    .realPress(TAB_KEY)
    .realType("1234567890");

    // Check both options in the checkbox group
    findShadowEl(IC_CHECKBOX, CHECKBOX).eq(0).check();
    findShadowEl(IC_CHECKBOX, CHECKBOX).eq(1).check();
    cy.get(IC_CHECKBOX).eq(0).should(HAVE_ATTR, CHECKED);
    cy.get(IC_CHECKBOX).eq(1).should(HAVE_ATTR, CHECKED);

    // Go to next step, check the stepper and the logged formValues so far
    cy.get(IC_BUTTON).contains("Add to order").click();
    cy.get(CONSOLE_LOG).should(HAVE_BEEN_CALLED_WITH, filledForm("details"));
    checkCurrentStep(2);

    // Select a date using the date picker
    findShadowEl(IC_DATE_PICKER, IC_DATE_INPUT)
    .shadow()
    .find(CALENDAR_BUTTON_ID)
    .click();
    findShadowEl(IC_DATE_PICKER, FOCUSSED_DAY_BTN_CLASS).click();
    checkDateInputValue(new Date());

    // Agree to terms
    cy.get(IC_RADIO_OPTION).find(RADIO+'[name="agree"]').check({ force: true });
    cy.get(IC_RADIO_OPTION + '[name="agree"]').should(HAVE_ATTR, SELECTED);
    
    // Submit and check the logged formValues
    cy.get(IC_BUTTON).contains("Submit order").click();
    let date = new Date();
    cy.get(CONSOLE_LOG).should(HAVE_BEEN_CALLED_WITH, filledForm("checkout"));
  });
  it("should show validation errors", () => {
    mount(<Subscription />);
    checkHydrated(IC_PAGE_HEADER);

    cy.get(IC_STEPPER).should(BE_VISIBLE);
    checkCurrentStep(0);

    // Fill in details, missing an option
    cy.get(IC_RADIO_OPTION).find(RADIO).first().check({ force: true });
    cy.get(IC_RADIO_OPTION).eq(0).should(HAVE_ATTR, SELECTED);
    clickOnShadowEl(IC_SELECT, IC_INPUT_CONTAINER);
    clickOnShadowEl(IC_SELECT, IC_MENU_OPTION, 3);

    // Click next step but expect to stay on the same step
    cy.get(IC_BUTTON).click();
    checkCurrentStep(0);

    // Check ic-alert is visible and that the ic-select has a validation error
    cy.get(IC_ALERT).should(BE_VISIBLE);
    cy.get(IC_SELECT).eq(1).should(HAVE_ATTR, VALIDATION_STATUS, ERROR);

    // Fill in required fields and go to next step
    clickOnShadowEl(IC_SELECT, IC_INPUT_CONTAINER, 1);
    cy.realPress([ARROW_DOWN_KEY, ESCAPE_KEY]);
    cy.get(IC_SELECT).eq(1).should(NOT_HAVE_ATTR, VALIDATION_STATUS, ERROR);
    cy.get(IC_BUTTON).click();
    checkCurrentStep(1);
  });
});`,
    },
  },
  rtl: {
    fileName: "jest.test.tsx",
    disableMoreButton: false,
    snippets: {
      short: `it('fills out values on the chooseCoffee page, tests for an error, and submits', async () => {
  container.addEventListener("icChange", callbackFn);

  // Check the current form step
  const stepOne = container.querySelector('ic-step[heading="Choose coffee"]') as HTMLIcStepElement;
  expect(stepOne.type).toBe(stepStates.current);

  // Select radio-option from ic-radio-group
  const coffeeRadio = container.querySelector(
      'ic-radio-option[value="house"]'
  ) as HTMLIcRadioOptionElement;

  await user.click(coffeeRadio);

  expect(callbackFn).toHaveBeenCalled();
  expect(coffeeRadio.selected).toBe(true);

  // Try submitting to see error state
  const coffeeSubmit = screen.getByShadowTestId("coffee-submit-btn") as HTMLIcButtonElement;
  await user.click(coffeeSubmit);

  // ic-alert should be visible
  const alert = container.querySelector('ic-alert') as HTMLIcAlertElement;
  expect(alert).not.toBeNull();

  // Select size from ic-select
  const sizeSelect = container.querySelector('ic-select[label="Size"]') as HTMLIcSelectElement;
  // await user.click(sizeSelect);

  // find ic-menu in the shadowRoot of ic-select
  const sizeMenuOption = await findByShadowLabelText(sizeSelect, "250g")
  await user.click(sizeMenuOption);
  expect(callbackFn).toHaveBeenCalled();

  // Submit first page of form
  await user.click(coffeeSubmit);
  expect(logSpy).toHaveBeenNthCalledWith(2, filledForm());
});`,
      long: `import Subscription from '../Subscription.tsx';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {
    screen,
    findByShadowLabelText,
    getByShadowLabelText,
    getByShadowTestId,
    getAllByShadowLabelText,
} from 'shadow-dom-testing-library'

const formValues = {
  grind: 'whole',
  variety: 'house',
  size: '250',
  name: 'Java the Hutt',
  email: 'javadahutt@hothmail.com',
  phone: '1138',
  contact: ['sms', 'email'],
}

const filledForm = (page?: string): {} => {
  const date = new Date();
  return {
    "checkoutForm": {
      "dateToStart": page === "checkout" ? date : '',
      "terms": page === "checkout" ? "agree" : '',
    },
    "coffeeForm": {
      "grind": formValues.grind,
      "size": formValues.size,
      "variety": formValues.variety,
    },
    "detailForm": {
      "contact": [
        page === "details" || page === "checkout" ? formValues.contact[0] : "",
        page === "details" || page === "checkout" ? formValues.contact[1] : "",
      ],
      "email": page === "details" || page === "checkout" ? formValues.email : "",
      "name": page === "details" || page === "checkout" ? formValues.name : "",
      "phone": page === "details" || page === "checkout" ? formValues.phone : "",
    },
  }
}

const stepStates = {
  current: 'current',
  completed: 'completed',
}

describe('Subscription component', () => {
  let container: HTMLElement;
  let callbackFn: jest.Mock;
  let logSpy: jest.SpyInstance;
  let user: ReturnType<typeof userEvent.setup>;
  beforeEach(async () => {
    const renderResult = render(<Subscription />);
    container = renderResult.container;
    user = userEvent.setup();
    container.addEventListener("icChange", callbackFn);
    callbackFn = jest.fn();
    logSpy = jest.spyOn(global.console, 'log');
  });

  afterEach(() => {
    container.removeEventListener("icChange", callbackFn);
    jest.restoreAllMocks();
  });
    it('renders', async () => {
        const { container } = render(<Subscription />);

        expect(container).not.toBeNull();
    });
    it('fills out values on the chooseCoffee page, tests for an error, and submits', async () => {
        container.addEventListener("icChange", callbackFn);

        // Check the current form step
        const stepOne = container.querySelector('ic-step[heading="Choose coffee"]') as HTMLIcStepElement;
        expect(stepOne.type).toBe(stepStates.current);

        // Select radio-option from ic-radio-group
        const coffeeRadio = container.querySelector(
            'ic-radio-option[value="house"]'
        ) as HTMLIcRadioOptionElement;

        await user.click(coffeeRadio);

        expect(callbackFn).toHaveBeenCalled();
        expect(coffeeRadio.selected).toBe(true);

        // Try submitting to see error state
        const coffeeSubmit = screen.getByShadowTestId("coffee-submit-btn") as HTMLIcButtonElement;
        await user.click(coffeeSubmit);

        // ic-alert should be visible
        const alert = container.querySelector('ic-alert') as HTMLIcAlertElement;
        expect(alert).not.toBeNull();

        // Select size from ic-select
        const sizeSelect = container.querySelector('ic-select[label="Size"]') as HTMLIcSelectElement;
        // await user.click(sizeSelect);

        // find ic-menu in the shadowRoot of ic-select
        const sizeMenuOption = await findByShadowLabelText(sizeSelect, "250g")
        await user.click(sizeMenuOption);
        expect(callbackFn).toHaveBeenCalled();

        // Submit first page of form
        await user.click(coffeeSubmit);
        expect(logSpy).toHaveBeenNthCalledWith(2, filledForm());
    });
    it('fills out values on the enterDetails page and submits', async () => {
      const coffeeRadio = container.querySelector(
        'ic-radio-option[value="house"]'
      ) as HTMLIcRadioOptionElement;
      await user.click(coffeeRadio);
      const coffeeSubmit = getByShadowTestId(container, "coffee-submit-btn") as HTMLIcButtonElement;
      const sizeSelect = container.querySelector('ic-select[label="Size"]') as HTMLIcSelectElement;
      const sizeMenuOption = await findByShadowLabelText(sizeSelect,"250g");
      await user.click(sizeMenuOption);
      await user.click(coffeeSubmit);

      // Check second page is loaded
      const stepTwo = await container.querySelector('ic-step[heading="Enter Details"]') as HTMLIcStepElement;
      expect(stepTwo.type).toBe(stepStates.current);

      const detailsTypography = await screen.findByShadowText('Please enter your details') as HTMLIcTypographyElement;
      await waitFor(() => {
        expect(detailsTypography).toHaveClass('hydrated');
      });

      // Fill out second page of form and submit
      const nameTextField = getByShadowLabelText(container, "Name");
      await user.type(nameTextField, formValues.name)
      const emailTextField = getAllByShadowLabelText(container, "Email")[0];
      await user.type(emailTextField, formValues.email)
      const phoneTextField = getByShadowLabelText(container, "Phone");
      await user.type(phoneTextField, formValues.phone)

      const checkboxes = screen.getAllByShadowRole('checkbox')
      await checkboxes.forEach(async (checkbox) => {
        await user.click(checkbox);
      }
      );
      const detailSubmit = screen.getByShadowTestId("details-submit-btn") as HTMLIcButtonElement;
      await user.click(detailSubmit);

      expect(logSpy).toHaveBeenNthCalledWith(2, filledForm("details"));
    });
});`,
    },
  },
  component: {
    fileName: "Component.tsx",
    disableMoreButton: false,
    snippets: {
      short: `<IcPageHeader
  heading="Customise your coffee subscription"
  subheading="Choose your coffee, enter your details and checkout, easy as 1... 2... 3!"
  size="small"
  id="top"
  sticky
  aligned="center"
>
  <IcChip slot="heading-adornment" label="V0.0.01" size="large" />
  <IcStepper slot="stepper">
    <IcStep
      heading="Choose coffee"
      type={handleSteps(formSteps.chooseCoffee)}
    />
    <IcStep
      heading="Enter Details"
      type={handleSteps(formSteps.enterDetails)}
    />
    <IcStep
      heading="Checkout"
      type={handleSteps(formSteps.checkout)}
    />
  </IcStepper>
</IcPageHeader>
<IcBackToTop target="top" />
<form onSubmit={handleSubmit}>
  {formSteps.chooseCoffee.current && (
    <IcSectionContainer aligned="left">
      {formValidation && (
        <IcAlert
          variant="error"
          heading="Error"
          message="Please fill in all required fields"
          announced
        />
      )}
      <IcTypography variant="subtitle-large">
        Please choose your coffee
      </IcTypography>
      <IcTypography variant="body" maxLines={2}>
        Sip back and relax as we embark on a journey through the aromatic
        fields of coffee-inspired lorem ipsum. In the heart of a lush,
        verdant valley kissed by the golden hues of dawn, there lies a
        quaint little plantation where the beans of legend are nurtured.
        Each bean, a tiny vessel of dreams and whispers of faraway lands,
        cradled in the earth's embrace until it bursts forth with a
        promise of warmth and vigor.
      </IcTypography>
      <div className="input-container">
        <IcRadioGroup
          name="radio-group-1"
          label="What variety of coffee would you like?"
          helperText="House blend is the default option"
          size="small"
          required
          onIcChange={(ev) =>
            handleChange("coffeeForm", "variety", ev.detail.value)
          }
          {...(formValidation &&
            formValues.coffeeForm.variety === "" && {
              validationText: "Please choose an option",
              validationStatus: "error",
            })}
        >
          <IcRadioOption
            value="house"
            label="House Blend"
            selected={formValues.coffeeForm.variety === "house"}
          />
          <IcRadioOption
            value="liberica"
            label="Liberica"
            selected={formValues.coffeeForm.variety === "liberica"}
          />
          <IcRadioOption
            value="arabica"
            label="Arabica"
            selected={formValues.coffeeForm.variety === "arabica"}
          />
          <IcRadioOption
            value="mundo"
            label="Mundo Nova"
            selected={formValues.coffeeForm.variety === "mundo"}
          />
        </IcRadioGroup>
      </div>
      <div className="input-container">
        <IcSelect
          label="Grind"
          helperText="Please select a grind type"
          name="grind-select"
          options={grindOptions}
          size="small"
          className="input"
          value={formValues.coffeeForm.grind}
          onIcChange={(ev) =>
            handleChange("coffeeForm", "grind", ev.detail.value)
          }
          {...(formValidation &&
            formValues.coffeeForm.grind === "" && {
              validationText: "Please choose a grind size",
              validationStatus: "error",
            })}
        />
        <IcSelect
          label="Size"
          helperText="Please select a bag size"
          name="size-select"
          required
          options={sizeOptions}
          size="small"
          className="input"
          value={formValues.coffeeForm.size}
          onIcChange={(ev) =>
            handleChange("coffeeForm", "size", ev.detail.value)
          }
          {...(formValidation &&
            formValues.coffeeForm.size === "" && {
              validationText: "Please choose a size",
              validationStatus: "error",
            })}
        />
      </div>
      <div className="input-container">
        <IcButton
          variant="primary"
          className="button"
          onClick={(ev) => handleClick(ev, next)}
          data-testid="coffee-submit-btn"
        >
          Add to order
        </IcButton>
      </div>
    </IcSectionContainer>
  )}
  {formSteps.enterDetails.current && (
    <IcSectionContainer aligned="left">
      {formValidation && (
        <IcAlert
          variant="error"
          heading="Error"
          message="Please fill in all required fields"
          announced
        />
      )}
      <IcTypography variant="subtitle-large">
        Please enter your details
      </IcTypography>
      <IcTypography variant="body">
        Nearly there, we just need a few more details. Purchases must be
        made by an adult over the age of 18. We will never share your
        details with fourth parties.
      </IcTypography>
      <div className="input-container">
        <IcTextField
          label="Name"
          name="name"
          required
          className="input"
          size="small"
          value={formValues.detailForm.name}
          onIcChange={(ev) =>
            handleChange("detailForm", "name", ev.detail.value)
          }
          {...(formValidation &&
            formValues.detailForm.name === "" && {
              validationText: "Please enter your name",
              validationStatus: "error",
          })}
          autoFocus
        />
        <IcTextField
          label="Email"
          name="email"
          type="email"
          required
          size="small"
          className="input"
          value={formValues.detailForm.email}
          onIcInput={(ev) =>
            handleChange("detailForm", "email", ev.detail.value)
          }
          {...(formValidation &&
            (formValues.detailForm.email === "" ||
              !formValues.detailForm.email.includes("@")) && {
              validationText: "Please enter an email",
              validationStatus: "error",
          })}
          data-test-id="email-text-field"
        />
        <IcTextField
          label="Phone"
          name="phone"
          type="number"
          required
          size="small"
          className="input"
          value={formValues.detailForm.phone}
          onIcInput={(ev) =>
            handleChange("detailForm", "phone", ev.detail.value)
          }
          {...(formValidation &&
            formValues.detailForm.phone === "" && {
              validationText:
                "Please enter a number on which we can contact you",
              validationStatus: "error",
            })}
        />
      </div>
      <div className="input-container">
        <IcCheckboxGroup
          name="signup"
          onIcChange={(ev) =>
            handleChange("detailForm", "contact", ev.detail.value)
          }
          label="Sign up for notifications about future products?"
          className="input"
        >
          <IcCheckbox
            label="SMS"
            name="sms"
            value="sms"
            checked={formValues.detailForm.contact.includes("sms")}
          />
          <IcCheckbox
            label="Email"
            name="email"
            value="email"
            checked={formValues.detailForm.contact.includes("email")}
          />
        </IcCheckboxGroup>
      </div>
      <div className="input-container"></div>
      <div className="input-container">
        <IcButton
          variant="secondary"
          onClick={(ev) => handleClick(ev, back)}
          className="button"
        >
          Go Back
        </IcButton>
        <IcButton
          variant="primary"
          onClick={(ev) => handleClick(ev, next)}
          className="button"
          data-testid="details-submit-btn"
        >
          Add to order
        </IcButton>
      </div>
    </IcSectionContainer>
  )}
  {formSteps.checkout.current && (
    <IcSectionContainer aligned="left">
      {formValidation && (
        <IcAlert
          variant="error"
          heading="Error"
          message="Please fill in all required fields"
          announced
        />
      )}
      <IcTypography variant="subtitle-large">Last step!</IcTypography>
      <IcTypography variant="body">
        Please choose a start date for your subscription and agree to the
        terms and conditions. Feel free to cancel your subscriptions at any time.
      </IcTypography>
      <div className="input-container">
        <IcDatePicker
          label="When would you like your subscription to start?"
          className="input"
          disablePast
          required
          size="small"
          data-testid="date-picker"
          value={formValues.checkoutForm.dateToStart}
          onIcChange={(ev) =>
            handleChange("checkoutForm", "dateToStart", ev.detail.value)
          }
          {...(formValidation &&
            formValues.checkoutForm.dateToStart === "" && {
              validationText: "Please choose a date",
              validationStatus: "error",
            })}
        />
        </div>
        <div className="input-container">
        <IcRadioGroup
          label="Please agree to the terms and conditions"
          name="terms"
          required
          className="input"
          size="small"
          onIcChange={(ev) =>
            handleChange("checkoutForm", "terms", ev.detail.value)
          }
          {...(((formValidation &&
            formValues.checkoutForm.terms === "") ||
            (formValidation &&
              formValues.checkoutForm.terms === "decline")) && {
            validationText: "Please agree to the terms and conditions",
            validationStatus: "error",
          })}
        >
          <IcRadioOption
            label="Agree"
            name="agree"
            value="agree"
            selected={formValues.checkoutForm.terms === "agree"}
          />
          <IcRadioOption
            label="Decline"
            name="decline"
            value="decline"
            selected={formValues.checkoutForm.terms === "decline"}
          />
        </IcRadioGroup>
      </div>
      <div className="input-container">
        <IcButton
          variant="secondary"
          onClick={(ev) => handleClick(ev, back)}
          className="button"
        >
          Go Back
        </IcButton>
        <IcButton
          variant="primary"
          onClick={handleSubmit}
          className="button"
        >
          Submit order
        </IcButton>
        <IcToastRegion ref={toastRegionEl}>
          <IcToast
            heading="Thanks for your order!"
            ref={toastEl}
            dismissMode="automatic"
            autoDismissTimeout={3000}
            variant="success"
            onIcDismiss={() => resetForm()}
          />
        </IcToastRegion>
      </div>
    </IcSectionContainer>
  )}
</form>`,
      long: `import React, { useState, useRef, useCallback } from "react";
import "./index.css";
import {
  IcCheckbox,
  IcCheckboxGroup,
  IcRadioGroup,
  IcRadioOption,
  IcSelect,
  IcTextField,
  IcButton,
  IcSectionContainer,
  IcPageHeader,
  IcChip,
  IcStepper,
  IcStep,
  IcTypography,
  IcBackToTop,
  IcToastRegion,
  IcToast,
  IcAlert,
} from "@ukic/react";
import { IcDatePicker } from "@ukic/canary-react";
import {
  grindOptions,
  sizeOptions,
  next,
  back,
  initialFormValues,
  initialFormSteps,
} from "./constants";
import { handleSteps } from "./methods";
import { FormValues, FormSteps } from "./types";

const Subscription: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [formSteps, setFormSteps] = useState<FormSteps>(initialFormSteps);
  const [formValidation, setFormValidation] = useState<boolean>(false);

  const handleNextStep = () => {
    let updatedFormSteps = { ...formSteps };

    if (formSteps.chooseCoffee.current) {
      const { variety, grind, size } = formValues.coffeeForm;
      if ([variety, grind, size].some((value) => value === "")) {
        setFormValidation(true);
        return;
      }
      setFormValidation(false);
      updatedFormSteps.chooseCoffee = {
        ...formSteps.chooseCoffee,
        active: true,
        completed: true,
        current: false,
      };
      updatedFormSteps.enterDetails = {
        ...formSteps.enterDetails,
        active: true,
        completed: false,
        current: true,
      };
    } else if (formSteps.enterDetails.current) {
      const { name, email, phone } = formValues.detailForm;
      if (
        [name, email, phone].some((value) => value === "") ||
        !email.includes("@")
      ) {
        setFormValidation(true);
        return;
      }
      setFormValidation(false);
      updatedFormSteps.chooseCoffee = {
        ...formSteps.chooseCoffee,
        active: true,
        completed: true,
        current: false,
      };
      updatedFormSteps.enterDetails = {
        ...formSteps.enterDetails,
        active: true,
        completed: true,
        current: false,
      };
      updatedFormSteps.checkout = {
        ...formSteps.checkout,
        active: true,
        completed: false,
        current: true,
      };
    } else {
      throw new Error("Invalid action");
    }
    setFormSteps(updatedFormSteps);
  };

  const handleBackStep = () => {
    let updatedFormSteps = { ...formSteps };

    if (formSteps.enterDetails.current) {
      updatedFormSteps.chooseCoffee = {
        ...formSteps.chooseCoffee,
        active: true,
        completed: false,
        current: true,
      };
      updatedFormSteps.enterDetails = {
        ...formSteps.enterDetails,
        active: true,
        completed: false,
        current: false,
      };
    } else if (formSteps.checkout.current) {
      updatedFormSteps.chooseCoffee = {
        ...formSteps.chooseCoffee,
        active: true,
        completed: true,
        current: false,
      };
      updatedFormSteps.enterDetails = {
        ...formSteps.enterDetails,
        active: true,
        completed: false,
        current: true,
      };
      updatedFormSteps.checkout = {
        ...formSteps.checkout,
        active: true,
        completed: false,
        current: false,
      };
    } else {
      throw new Error("Invalid action");
    }
    setFormSteps(updatedFormSteps);
  };

  const handleClick = useCallback(
    (ev: React.MouseEvent, action: string) => {
      ev.preventDefault();
      console.log(formValues);

      if (action === "next") {
        handleNextStep();
      } else if (action === "back") {
        handleBackStep();
      } else {
        throw new Error("Invalid action");
      }
    },
    [formSteps, formValues]
  );

  const handleChange = (
    formSection: string,
    formValue: string,
    eventDetail: string | string[] | Date
  ) => {
    setFormValues({
      ...formValues,
      [formSection]: {
        ...formValues[formSection as keyof FormValues],
        [formValue]: eventDetail,
      },
    });
  };

  const toastRegionEl = useRef<HTMLIcToastRegionElement | null>(null);
  const toastEl = useRef<HTMLIcToastElement | null>(null);

  const resetForm = () => {
    setFormValues(initialFormValues);
    setFormSteps(initialFormSteps);
  };

  const handleSubmit = () => {
    console.log(formValues);
    const { dateToStart, terms } = formValues.checkoutForm;
    if (
      [dateToStart, terms].some((value) => value === "" || value === "decline")
    ) {
      setFormValidation(true);
      return;
    }
    setFormValidation(false);
    if (toastRegionEl.current && toastEl.current) {
      toastRegionEl.current.openToast = toastEl.current;
    }
  };

  //* This app was originally intended to be used in testing guidance, hence no atomisation of components, keeping the app to a single file

  return (
    <>
      <IcPageHeader
        heading="Customise your coffee subscription"
        subheading="Choose your coffee, enter your details and checkout, easy as 1... 2... 3!"
        size="small"
        id="top"
        sticky
        aligned="center"
      >
        <IcChip slot="heading-adornment" label="V0.0.01" size="large" />
        <IcStepper slot="stepper">
          <IcStep
            heading="Choose coffee"
            type={handleSteps(formSteps.chooseCoffee)}
          />
          <IcStep
            heading="Enter Details"
            type={handleSteps(formSteps.enterDetails)}
          />
          <IcStep
            heading="Checkout"
            type={handleSteps(formSteps.checkout)}
          />
        </IcStepper>
      </IcPageHeader>
      <IcBackToTop target="top" />
      <form onSubmit={handleSubmit}>
        {formSteps.chooseCoffee.current && (
          <IcSectionContainer aligned="left">
            {formValidation && (
              <IcAlert
                variant="error"
                heading="Error"
                message="Please fill in all required fields"
                announced
              />
            )}
            <IcTypography variant="subtitle-large">
              Please choose your coffee
            </IcTypography>
            <IcTypography variant="body" maxLines={2}>
              Sip back and relax as we embark on a journey through the aromatic
              fields of coffee-inspired lorem ipsum. In the heart of a lush,
              verdant valley kissed by the golden hues of dawn, there lies a
              quaint little plantation where the beans of legend are nurtured.
              Each bean, a tiny vessel of dreams and whispers of faraway lands,
              cradled in the earth's embrace until it bursts forth with a
              promise of warmth and vigor.
            </IcTypography>
            <div className="input-container">
              <IcRadioGroup
                name="radio-group-1"
                label="What variety of coffee would you like?"
                helperText="House blend is the default option"
                size="small"
                required
                onIcChange={(ev) =>
                  handleChange("coffeeForm", "variety", ev.detail.value)
                }
                {...(formValidation &&
                  formValues.coffeeForm.variety === "" && {
                    validationText: "Please choose an option",
                    validationStatus: "error",
                  })}
              >
                <IcRadioOption
                  value="house"
                  label="House Blend"
                  selected={formValues.coffeeForm.variety === "house"}
                />
                <IcRadioOption
                  value="liberica"
                  label="Liberica"
                  selected={formValues.coffeeForm.variety === "liberica"}
                />
                <IcRadioOption
                  value="arabica"
                  label="Arabica"
                  selected={formValues.coffeeForm.variety === "arabica"}
                />
                <IcRadioOption
                  value="mundo"
                  label="Mundo Nova"
                  selected={formValues.coffeeForm.variety === "mundo"}
                />
              </IcRadioGroup>
            </div>
            <div className="input-container">
              <IcSelect
                label="Grind"
                helperText="Please select a grind type"
                name="grind-select"
                options={grindOptions}
                size="small"
                className="input"
                value={formValues.coffeeForm.grind}
                onIcChange={(ev) =>
                  handleChange("coffeeForm", "grind", ev.detail.value)
                }
                {...(formValidation &&
                  formValues.coffeeForm.grind === "" && {
                    validationText: "Please choose a grind size",
                    validationStatus: "error",
                  })}
              />
              <IcSelect
                label="Size"
                helperText="Please select a bag size"
                name="size-select"
                required
                options={sizeOptions}
                size="small"
                className="input"
                value={formValues.coffeeForm.size}
                onIcChange={(ev) =>
                  handleChange("coffeeForm", "size", ev.detail.value)
                }
                {...(formValidation &&
                  formValues.coffeeForm.size === "" && {
                    validationText: "Please choose a size",
                    validationStatus: "error",
                  })}
              />
            </div>
            <div className="input-container">
              <IcButton
                variant="primary"
                className="button"
                onClick={(ev) => handleClick(ev, next)}
                data-testid="coffee-submit-btn"
              >
                Add to order
              </IcButton>
            </div>
          </IcSectionContainer>
        )}
        {formSteps.enterDetails.current && (
          <IcSectionContainer aligned="left">
            {formValidation && (
              <IcAlert
                variant="error"
                heading="Error"
                message="Please fill in all required fields"
                announced
              />
            )}
            <IcTypography variant="subtitle-large">
              Please enter your details
            </IcTypography>
            <IcTypography variant="body">
              Nearly there, we just need a few more details. Purchases must be
              made by an adult over the age of 18. We will never share your
              details with fourth parties.
            </IcTypography>
            <div className="input-container">
              <IcTextField
                label="Name"
                name="name"
                required
                className="input"
                size="small"
                value={formValues.detailForm.name}
                onIcChange={(ev) =>
                  handleChange("detailForm", "name", ev.detail.value)
                }
                {...(formValidation &&
                  formValues.detailForm.name === "" && {
                    validationText: "Please enter your name",
                    validationStatus: "error",
                })}
                autoFocus
              />
              <IcTextField
                label="Email"
                name="email"
                type="email"
                required
                size="small"
                className="input"
                value={formValues.detailForm.email}
                onIcInput={(ev) =>
                  handleChange("detailForm", "email", ev.detail.value)
                }
                {...(formValidation &&
                  (formValues.detailForm.email === "" ||
                    !formValues.detailForm.email.includes("@")) && {
                    validationText: "Please enter an email",
                    validationStatus: "error",
                })}
                data-test-id="email-text-field"
              />
              <IcTextField
                label="Phone"
                name="phone"
                type="number"
                required
                size="small"
                className="input"
                value={formValues.detailForm.phone}
                onIcInput={(ev) =>
                  handleChange("detailForm", "phone", ev.detail.value)
                }
                {...(formValidation &&
                  formValues.detailForm.phone === "" && {
                    validationText:
                      "Please enter a number on which we can contact you",
                    validationStatus: "error",
                  })}
              />
            </div>
            <div className="input-container">
              <IcCheckboxGroup
                name="signup"
                onIcChange={(ev) =>
                  handleChange("detailForm", "contact", ev.detail.value)
                }
                label="Sign up for notifications about future products?"
                className="input"
              >
                <IcCheckbox
                  label="SMS"
                  name="sms"
                  value="sms"
                  checked={formValues.detailForm.contact.includes("sms")}
                />
                <IcCheckbox
                  label="Email"
                  name="email"
                  value="email"
                  checked={formValues.detailForm.contact.includes("email")}
                />
              </IcCheckboxGroup>
            </div>
            <div className="input-container"></div>
            <div className="input-container">
              <IcButton
                variant="secondary"
                onClick={(ev) => handleClick(ev, back)}
                className="button"
              >
                Go Back
              </IcButton>
              <IcButton
                variant="primary"
                onClick={(ev) => handleClick(ev, next)}
                className="button"
                data-testid="details-submit-btn"
              >
                Add to order
              </IcButton>
            </div>
          </IcSectionContainer>
        )}
        {formSteps.checkout.current && (
          <IcSectionContainer aligned="left">
            {formValidation && (
              <IcAlert
                variant="error"
                heading="Error"
                message="Please fill in all required fields"
                announced
              />
            )}
            <IcTypography variant="subtitle-large">Last step!</IcTypography>
            <IcTypography variant="body">
              Please choose a start date for your subscription and agree to the
              terms and conditions. Feel free to cancel your subscriptions at any time.
            </IcTypography>
            <div className="input-container">
              <IcDatePicker
                label="When would you like your subscription to start?"
                className="input"
                disablePast
                required
                size="small"
                data-testid="date-picker"
                value={formValues.checkoutForm.dateToStart}
                onIcChange={(ev) =>
                  handleChange("checkoutForm", "dateToStart", ev.detail.value)
                }
                {...(formValidation &&
                  formValues.checkoutForm.dateToStart === "" && {
                    validationText: "Please choose a date",
                    validationStatus: "error",
                  })}
              />
              </div>
              <div className="input-container">
              <IcRadioGroup
                label="Please agree to the terms and conditions"
                name="terms"
                required
                className="input"
                size="small"
                onIcChange={(ev) =>
                  handleChange("checkoutForm", "terms", ev.detail.value)
                }
                {...(((formValidation &&
                  formValues.checkoutForm.terms === "") ||
                  (formValidation &&
                    formValues.checkoutForm.terms === "decline")) && {
                  validationText: "Please agree to the terms and conditions",
                  validationStatus: "error",
                })}
              >
                <IcRadioOption
                  label="Agree"
                  name="agree"
                  value="agree"
                  selected={formValues.checkoutForm.terms === "agree"}
                />
                <IcRadioOption
                  label="Decline"
                  name="decline"
                  value="decline"
                  selected={formValues.checkoutForm.terms === "decline"}
                />
              </IcRadioGroup>
            </div>
            <div className="input-container">
              <IcButton
                variant="secondary"
                onClick={(ev) => handleClick(ev, back)}
                className="button"
              >
                Go Back
              </IcButton>
              <IcButton
                variant="primary"
                onClick={handleSubmit}
                className="button"
              >
                Submit order
              </IcButton>
              <IcToastRegion ref={toastRegionEl}>
                <IcToast
                  heading="Thanks for your order!"
                  ref={toastEl}
                  dismissMode="automatic"
                  autoDismissTimeout={3000}
                  variant="success"
                  onIcDismiss={() => resetForm()}
                />
              </IcToastRegion>
            </div>
          </IcSectionContainer>
        )}
      </form>
    </>
  );
};

export default Subscription;`,
    },
  },
  types: {
    fileName: "types.ts",
    disableMoreButton: true,
    snippets: {
      short: `interface CoffeeForm {
  variety: string;
  grind: string;
  size: string;
}

interface DetailForm {
  name: string;
  email: string;
  phone: string;
  contact: string[];
}

interface CheckoutForm {
  dateToStart: string;
  terms: string;
}

export interface FormValues {
  coffeeForm: CoffeeForm;
  detailForm: DetailForm;
  checkoutForm: CheckoutForm;
}

export interface chooseCoffee {
  active: boolean;
  completed: boolean;
  current: boolean;
  disabled: boolean;
}

export interface enterDetails {
  active: boolean;
  completed: boolean;
  current: boolean;
  disabled: boolean;
}

export interface checkout {
  active: boolean;
  completed: boolean;
  current: boolean;
  disabled: boolean;
}

export interface stepTypes {
  active: boolean;
  completed: boolean;
  current: boolean;
  disabled: boolean;
}

export interface FormSteps {
  chooseCoffee: chooseCoffee;
  enterDetails: enterDetails;
  checkout: checkout;
}`,
      long: `interface CoffeeForm {
  variety: string;
  grind: string;
  size: string;
}

interface DetailForm {
  name: string;
  email: string;
  phone: string;
  contact: string[];
}

interface CheckoutForm {
  dateToStart: string;
  terms: string;
}

export interface FormValues {
  coffeeForm: CoffeeForm;
  detailForm: DetailForm;
  checkoutForm: CheckoutForm;
}

export interface chooseCoffee {
  active: boolean;
  completed: boolean;
  current: boolean;
  disabled: boolean;
}

export interface enterDetails {
  active: boolean;
  completed: boolean;
  current: boolean;
  disabled: boolean;
}

export interface checkout {
  active: boolean;
  completed: boolean;
  current: boolean;
  disabled: boolean;
}

export interface stepTypes {
  active: boolean;
  completed: boolean;
  current: boolean;
  disabled: boolean;
}

export interface FormSteps {
  chooseCoffee: chooseCoffee;
  enterDetails: enterDetails;
  checkout: checkout;
}`,
    },
  },
  constants: {
    fileName: "constants.ts",
    disableMoreButton: true,
    snippets: {
      short: `import { FormValues, FormSteps } from "./types";

export const grindOptions = [
  { value: "whole", label: "Whole Bean (default)" },
  {
    value: "filter",
    label: "Filter",
    description: "A medium grind ideal for drip and pour-over methods",
  },
  {
    value: "espresso",
    label: "Espresso",
    description: "The fine grind size ensures a slow, even extraction",
  },
  { value: "aeropress", label: "Aeropress" },
  {
    value: "cafetiere",
    label: "Cafetiere",
    description:
      "Coarse grinds work best for brewing methods like the French press and cold brew",
  },
];

export const sizeOptions = [
  { value: "250", label: "250g" },
  { value: "500", label: "500g" },
  { value: "1000", label: "1000g" },
];

export const next = "next";
export const back = "back";

export const initialFormValues: FormValues = {
  coffeeForm: {
    variety: "",
    grind: "whole",
    size: "",
  },
  detailForm: {
    name: "",
    email: "",
    phone: "",
    contact: ["", ""],
  },
  checkoutForm: {
    dateToStart: "",
    terms: "",
  },
};

export const initialFormSteps: FormSteps = {
  chooseCoffee: {
    active: true,
    completed: false,
    current: true,
    disabled: false,
  },
  enterDetails: {
    active: true,
    completed: false,
    current: false,
    disabled: false,
  },
  checkout: {
    active: true,
    completed: false,
    current: false,
    disabled: false,
  },
};`,
      long: `import { FormValues, FormSteps } from "./types";

export const grindOptions = [
  { value: "whole", label: "Whole Bean (default)" },
  {
    value: "filter",
    label: "Filter",
    description: "A medium grind ideal for drip and pour-over methods",
  },
  {
    value: "espresso",
    label: "Espresso",
    description: "The fine grind size ensures a slow, even extraction",
  },
  { value: "aeropress", label: "Aeropress" },
  {
    value: "cafetiere",
    label: "Cafetiere",
    description:
      "Coarse grinds work best for brewing methods like the French press and cold brew",
  },
];

export const sizeOptions = [
  { value: "250", label: "250g" },
  { value: "500", label: "500g" },
  { value: "1000", label: "1000g" },
];

export const next = "next";
export const back = "back";

export const initialFormValues: FormValues = {
  coffeeForm: {
    variety: "",
    grind: "whole",
    size: "",
  },
  detailForm: {
    name: "",
    email: "",
    phone: "",
    contact: ["", ""],
  },
  checkoutForm: {
    dateToStart: "",
    terms: "",
  },
};

export const initialFormSteps: FormSteps = {
  chooseCoffee: {
    active: true,
    completed: false,
    current: true,
    disabled: false,
  },
  enterDetails: {
    active: true,
    completed: false,
    current: false,
    disabled: false,
  },
  checkout: {
    active: true,
    completed: false,
    current: false,
    disabled: false,
  },
};`,
    },
  },
  methods: {
    fileName: "methods.ts",
    disableMoreButton: true,
    snippets: {
      short: `import { IcStepTypes } from "@ukic/web-components";
import { stepTypes } from "./types";

export const handleSteps = (step: stepTypes): IcStepTypes | undefined => {
  return step.current
    ? ("current" as IcStepTypes)
    : step.completed
    ? ("completed" as IcStepTypes)
    : step.active
    ? ("active" as IcStepTypes)
    : step.disabled
    ? ("disabled" as IcStepTypes)
    : undefined;
};`,
      long: `import { IcStepTypes } from "@ukic/web-components";
import { stepTypes } from "./types";

export const handleSteps = (step: stepTypes): IcStepTypes | undefined => {
  return step.current
    ? ("current" as IcStepTypes)
    : step.completed
    ? ("completed" as IcStepTypes)
    : step.active
    ? ("active" as IcStepTypes)
    : step.disabled
    ? ("disabled" as IcStepTypes)
    : undefined;
};`,
    },
  },
};

export default testFiles;
