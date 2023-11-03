import React from "react";
import "./index.css";
// eslint-disable-next-line import/no-unresolved
import pagesData from "../../../public/icds-pages-data.json";

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
            <ic-card
              heading={item.title}
              message={item.subTitle}
              full-width
              clickable
              href={`${item.path}`}
            />
          </li>
        ))}
    </ul>
  );
};

export default ComponentGallery;
