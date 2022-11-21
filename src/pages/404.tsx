import React from "react";
import { PageProps } from "gatsby";
import { IcLink, IcTypography, IcSectionContainer } from "@ukic/react";
import Layout from "../components/Layout";

import fig404 from "../../static/404.png";

import "./404.css";

const NotFoundPage: React.FC<PageProps> = () => (
  <Layout>
    <IcSectionContainer aligned="full-width" className="container-404">
      <img src={fig404} alt="" width="200" />
      <IcTypography variant="h1" applyVerticalMargins>
        <h2>That page wasn&apos;t found</h2>
      </IcTypography>
      <IcTypography variant="body" applyVerticalMargins>
        <p>
          Sorry, we can&apos;t find the page you&apos;re looking for. This may
          be because the page has moved or there was a typo in the URL.
        </p>
      </IcTypography>
      <IcTypography variant="label" applyVerticalMargins>
        <p>
          Try <IcLink href="/">searching from the homepage</IcLink>.
        </p>
      </IcTypography>
    </IcSectionContainer>
  </Layout>
);

export default NotFoundPage;
