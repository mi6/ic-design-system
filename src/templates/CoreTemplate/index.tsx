import React, { useState } from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import clsx from "clsx";

import { IcSectionContainer } from "@ukic/react";

import "./index.css";
import AnchorNav from "../../components/AnchorNav";
import ComponentPreview from "../../components/CodePreview";
import ComponentDetails from "../../components/ComponentDetails";
import DoDontCaution from "../../components/DoDontCaution";
import DoubleDoDontCaution from "../../components/DoubleDoDontCaution";
import Header from "../../components/Header";
import WrappedAlert from "../../components/WrappedAlert";
import WrappedBlockquote from "../../components/WrappedBlockquote";
import WrappedCode from "../../components/WrappedCode";
import WrappedH1 from "../../components/WrappedH1";
import WrappedH2 from "../../components/WrappedH2";
import WrappedH3 from "../../components/WrappedH3";
import WrappedH4 from "../../components/WrappedH4";
import WrappedLi from "../../components/WrappedLi";
import WrappedLink from "../../components/WrappedLink";
import WrappedP from "../../components/WrappedP";

import { NavigationObject } from "../../sharedTypes";

const { MDXProvider } = require("@mdx-js/react");

interface CoreMDXLayoutProps {
  mdx: any;
  tabContent: NavigationObject[];
}

const CoreMDXLayout: React.FC<CoreMDXLayoutProps> = ({ mdx, tabContent }) => {
  const shortcodes = {
    h1: WrappedH1,
    h2: WrappedH2,
    h3: WrappedH3,
    h4: WrappedH4,
    p: WrappedP,
    a: WrappedLink,
    li: WrappedLi,
    ComponentDetails,
    inlineCode: WrappedCode,
    IcAlert: WrappedAlert,
    ComponentPreview,
    blockquote: WrappedBlockquote,
    DoDontCaution,
    DoubleDoDontCaution,
  };
  const [pageContent, setPageContent] = useState(mdx);

  return (
    <MDXProvider components={shortcodes}>
      <div className={clsx("force", "page-container")} id="page-contents">
        <Header
          heading={mdx.frontmatter.title}
          subheading={mdx.frontmatter.subTitle}
          adornment={mdx.frontmatter.status}
          tabs={mdx.frontmatter.tabs}
          tabContent={tabContent}
          currentPage={pageContent.fields.slug}
          setPageContent={setPageContent}
        />
        <IcSectionContainer aligned="center" className="page">
          <AnchorNav
            currentPage={pageContent.fields.slug}
            allHeadings={pageContent.headings}
            section={pageContent.fields.navSection}
          />
          <div className="content-container">
            <MDXRenderer>{pageContent.body}</MDXRenderer>
          </div>
        </IcSectionContainer>
      </div>
    </MDXProvider>
  );
};

export default CoreMDXLayout;
