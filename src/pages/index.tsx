import { PageProps } from "gatsby";
import React from "react";
import Homepage from "../templates/Homepage";
import Layout from "../components/Layout";

const LandingPage: React.FC<PageProps> = () => (
  <Layout contentProps={{ index: true }} title="Home">
    <Homepage />
  </Layout>
);

export default LandingPage;
