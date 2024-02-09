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
              <ic-card message={item.subTitle} full-width clickable>
                <ic-typography
                  slot="heading"
                  variant="h4"
                  aria-label={`${item.title} component.`}
                >
                  <h4>{item.title}</h4>
                </ic-typography>
              </ic-card>
            </GatsbyLink>
          </li>
        ))}
    </ul>
  );
};

export default ComponentGallery;
