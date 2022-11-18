import React from "react";

import { IcAlert, IcButton, IcTextField, IcTypography } from "@ukic/react";

import "./index.css";

const ErrorSummaryEx: React.FC = () => (
  <div className="form">
    <IcTypography variant="h2">
      <h3>Request Coffee Catalogue</h3>
    </IcTypography>
    <IcTypography variant="body" spacing>
      Use this form to request or update your choices for the Coffee Catalogue.
    </IcTypography>
    <IcAlert
      heading="There are some problems"
      message="Please provide a response for 'Coffee subscription number'."
      variant="error"
    />
    <div>
      <div className="text-field">
        <IcTextField
          label="What's your favourite type of coffee?"
          required
          value="Robusta"
        />
      </div>
      <div className="text-field">
        <IcTextField
          label="Coffee subscription number"
          placeholder="Such as CS-12007"
          required
          validationStatus="error"
          validationText="Please provide your subscription number."
        />
      </div>
      <div className="button-row">
        <IcButton variant="secondary">Cancel</IcButton>
        <IcButton variant="primary">Submit request</IcButton>
      </div>
    </div>
  </div>
);

export default ErrorSummaryEx;
