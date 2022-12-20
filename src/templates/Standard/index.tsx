import React from "react";
import { graphql } from "gatsby";

import "./index.css";
import CoreMDXLayout from "../CoreTemplate";
import Metadata from "../../components/Metadata";
import SubsectionNav from "../../components/SubsectionNav";
import {
  Heading,
  NavigationObject,
  MdxFrontMatter,
  MdxFields,
} from "../../sharedTypes";

interface TemplateProps {
  pageContext: {
    pageType: string;
  };
  data: {
    allStructuredNav: NavigationObject[];
    mdx: {
      body: string;
      fields: MdxFields;
      frontmatter: MdxFrontMatter;
      headings: Heading[];
    };
  };
}

const Template: React.FC<TemplateProps> = ({
  pageContext: { pageType },
  data: { mdx, allStructuredNav },
}) => {
  const { title, date, contribute } = mdx.frontmatter;
  const tabContent = allStructuredNav.filter(
    (page) => page.frontmatter.title === title
  );

  return (
    <ic-section-container aligned="full-width" full-height id="main-container">
      <div className="page-content-container">
        <div className="subsection-nav">
          <div className="sticky">
            {pageType === "sectionnav" && (
              <SubsectionNav
                currentPage={mdx.fields.slug}
                section={mdx.fields.navSection}
                allStructuredNav={allStructuredNav}
              />
            )}
          </div>
        </div>
        <div className="page-content">
          <CoreMDXLayout mdx={mdx} tabContent={tabContent} />
          <Metadata publishDate={date} contribute={contribute} />
        </div>
      </div>
    </ic-section-container>
  );
};

export default Template;

export const pageQuery = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      body
      fileAbsolutePath
      fields {
        slug
        navSection
      }
      frontmatter {
        title
        subTitle
        tags
        categories
        classification
        status
        deciders
        contribute
        date
        tabs {
          title
          path
        }
      }
      headings {
        depth
        value
      }
    }
    allStructuredNav {
      id
      fields {
        navParent
        navSection
        slug
      }
      frontmatter {
        navPriority
        title
        tabs {
          title
          path
        }
      }
      body
      headings {
        depth
        value
      }
    }
  }
`;
