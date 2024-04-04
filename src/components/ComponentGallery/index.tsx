import React from "react";
import { Link as GatsbyLink } from "gatsby";
import "./index.css";
import pagesData from "../../icds-pages-data.json";

const ComponentGallery: React.FC = () => {
  const uniqueComponentDetails = [
    ...new Map(
      pagesData.data
        .filter(({ tabs }) => tabs)
        .map((item) => [item.title, item])
    ).values(),
  ];

  return (
    <ul className="card-container">
      {uniqueComponentDetails?.map(({ path, subTitle, status, title }) => (
        <li>
          <GatsbyLink to={path}>
            <ic-card message={subTitle} full-width clickable>
              <ic-typography
                slot="heading"
                variant="h4"
                aria-label={`${title} component.`}
              >
                <h4>{title}</h4>
              </ic-typography>
              {status === "CANARY" && (
                <ic-status-tag
                  slot="adornment"
                  label={status}
                  size="small"
                  status="warning"
                />
              )}
            </ic-card>
          </GatsbyLink>
        </li>
      ))}
    </ul>
  );
};

export default ComponentGallery;
