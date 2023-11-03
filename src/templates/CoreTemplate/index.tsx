import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import clsx from "clsx";

import "./index.css";
import AnchorNav from "../../components/AnchorNav";
import ComponentPreview from "../../components/CodePreview";
import ComponentGallery from "../../components/ComponentGallery";
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

const { MDXProvider } = require("@mdx-js/react");

interface CoreMDXLayoutProps {
  mdx: any;
  children: string & React.ReactNode;
  location: string;
}

const CoreMDXLayout: React.FC<CoreMDXLayoutProps> = ({
  mdx,
  children,
  location,
}) => {
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
    ComponentGallery,
    blockquote: WrappedBlockquote,
    DoDontCaution,
    DoubleDoDontCaution,
  };

  return (
    <MDXProvider components={shortcodes}>
      <div className={clsx("force", "page-container")} id="page-contents">
        <Header
          heading={mdx.frontmatter.title}
          subheading={mdx.frontmatter.subTitle}
          adornment={mdx.frontmatter.status}
          tabs={mdx.frontmatter.tabs}
          location={location}
        />
        <ic-section-container aligned="center" id="page-section-container">
          <AnchorNav
            currentPage={mdx.fields.slug}
            allHeadings={mdx.headings}
            section={mdx.fields.navSection}
          />
          <div className="content-container">
            <MDXRenderer>{children}</MDXRenderer>
          </div>
        </ic-section-container>
      </div>
    </MDXProvider>
  );
};

export default CoreMDXLayout;
