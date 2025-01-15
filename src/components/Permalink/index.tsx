import React from "react";

import "./index.css";

interface PermalinkProps {
  title: string;
  sluggedTitle: string;
}

const Permalink: React.FC<PermalinkProps> = ({ title, sluggedTitle }) => (
  <div className="title-container">
    <a
      className="permalink"
      href={`#${sluggedTitle}`}
      title={`Permalink to ${title}`}
      aria-label={`Permalink to ${title}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M4.4 12C4.4 10.29 5.79 8.9 7.5 8.9H11.5V7H7.5C4.74 7 2.5 9.24 2.5 12C2.5 14.76 4.74 17 7.5 17H11.5V15.1H7.5C5.79 15.1 4.4 13.71 4.4 12ZM8.5 13H16.5V11H8.5V13ZM17.5 7H13.5V8.9H17.5C19.21 8.9 20.6 10.29 20.6 12C20.6 13.71 19.21 15.1 17.5 15.1H13.5V17H17.5C20.26 17 22.5 14.76 22.5 12C22.5 9.24 20.26 7 17.5 7Z"
          fill="currentColor"
        />
      </svg>
    </a>
  </div>
);

export default Permalink;
