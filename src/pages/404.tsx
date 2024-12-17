import React from "react";

import { PageProps, Link as GatsbyLink } from "gatsby";

const NotFoundPage: React.FC<PageProps> = () => (
  <ic-section-container aligned="full-width">
    <ic-empty-state
      heading="That page wasn't found"
      body=" This may be because the page has moved or there was a typo in the URL."
    >
      <ic-link slot="actions">
        <GatsbyLink slot="router-item" to="/">
          Return to home page
        </GatsbyLink>
      </ic-link>
    </ic-empty-state>
  </ic-section-container>
);

export default NotFoundPage;
