import React from "react";
import { PageProps } from "gatsby";

import fig404 from "../../static/404.png";

import "./404.css";

const NotFoundPage: React.FC<PageProps> = () => (
  <ic-section-container aligned="full-width" id="container-404">
    <img src={fig404} alt="" width="200" />
    <ic-typography variant="h1" apply-vertical-margins>
      <h2>That page wasn&apos;t found</h2>
    </ic-typography>
    <ic-typography variant="body" apply-vertical-margins>
      <p>
        Sorry, we can&apos;t find the page you&apos;re looking for. This may be
        because the page has moved or there was a typo in the URL.
      </p>
    </ic-typography>
    <ic-typography variant="label" apply-vertical-margins>
      <p>
        Try <ic-link href="/">searching from the homepage</ic-link>.
      </p>
    </ic-typography>
  </ic-section-container>
);

export default NotFoundPage;
