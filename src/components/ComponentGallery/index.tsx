import React from "react";
import { Link as GatsbyLink } from "gatsby";
import "./index.css";
import pagesData from "../../icds-pages-data.json";

interface ComponentDetails {
  title: string;
  subTitle: string;
  path: string;
}

const ComponentGallery: React.FC = () => {
  const componentDetails: ComponentDetails[] = [];

  pagesData.data.forEach((page) => {
    if (page.tabs) {
      componentDetails.push({
        title: page.title,
        subTitle: page.subTitle,
        path: page.path,
      });
    }
  });

  const uniqueComponentDetails = [
    ...new Map(componentDetails.map((item) => [item.title, item])).values(),
  ];

  return (
    <ul className="card-container">
      {uniqueComponentDetails &&
        uniqueComponentDetails.map((item: ComponentDetails) => (
          <li>
            <GatsbyLink to={`${item.path}`}>
              <ic-card
                heading={item.title}
                message={item.subTitle}
                full-width
                clickable
              />
            </GatsbyLink>
          </li>
        ))}
    </ul>
  );
};

export default ComponentGallery;
