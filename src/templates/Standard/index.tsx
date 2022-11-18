import React from "react";
import { graphql } from "gatsby";

import { IcSectionContainer } from "@ukic/react";

import "./index.css";
import CoreMDXLayout from "../CoreTemplate";
import Metadata from "../../components/Metadata";
import Layout from "../../components/Layout";
import SubsectionNav from "../../components/SubsectionNav";
import { Heading, NavigationObject } from "../../sharedTypes";

interface MdxFrontMatter {
  title: string;
  date: string;
  classification?: string;
  deciders?: string[];
  contribute?: string;
  subTitle?: string;
}

interface MdxFields {
  slug: string;
  navSection: string;
}

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
  const { title, date, contribute, subTitle } = mdx.frontmatter;
  const tabContent = allStructuredNav.filter(
    (page) => page.frontmatter.title === title
  );

  return (
    <Layout title={title} description={subTitle}>
      <IcSectionContainer
        aligned="full-width"
        fullHeight
        className="main-container"
      >
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
      </IcSectionContainer>
    </Layout>
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
