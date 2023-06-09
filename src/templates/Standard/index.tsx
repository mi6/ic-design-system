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
    allMdx: {
      nodes: NavigationObject[];
    };
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
  data: { mdx, allMdx },
}) => {
  const { title, date, contribute } = mdx.frontmatter;
  const allStructuredNav = allMdx.nodes;
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
  query ($id: String!, $navSection: String, $returnBodies: Boolean!) {
    mdx(id: { eq: $id }) {
      body
      fields {
        slug
        navSection
      }
      frontmatter {
        title
        subTitle
        status
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
    allMdx(filter: { fields: { navSection: { eq: $navSection } } }) {
      nodes {
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
            path
          }
        }
        body @include(if: $returnBodies)
        headings {
          depth
          value
        }
      }
    }
  }
`;
