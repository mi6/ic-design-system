import React from "react";

import "./index.css";

const ErrorSummaryEx: React.FC = () => (
  <div className="form">
    <ic-typography variant="h2">
      <h3>Request Coffee Catalogue</h3>
    </ic-typography>
    <ic-typography variant="body" apply-vertical-margins>
      Use this form to request or update your choices for the Coffee Catalogue.
    </ic-typography>
    <ic-alert
      heading="There are some problems"
      message="Please provide a response for 'Coffee subscription number'."
      variant="error"
    />
    <div>
      <div className="text-field">
        <ic-text-field
          label="What's your favourite type of coffee?"
          required
          value="Robusta"
        />
      </div>
      <div className="text-field">
        <ic-text-field
          label="Coffee subscription number"
          placeholder="Such as CS-12007"
          required
          validation-status="error"
          validation-text="Please provide your subscription number."
        />
      </div>
      <div className="button-row">
        <ic-button variant="secondary">Cancel</ic-button>
        <ic-button variant="primary">Submit request</ic-button>
      </div>
    </div>
  </div>
);

export default ErrorSummaryEx;
