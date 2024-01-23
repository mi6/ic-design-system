import React, { useState, useEffect } from "react";
import { debounce } from "../../../../utils/helpers";

import CookiesCards from "./CookiesCards";
import CookiesTable from "./CookiesTable";

export interface CookiesDataProps {
  headers: string[];
  data: CookiesDetails[];
  caption: string;
}

export interface CookiesDetails {
  provider: string;
  domain: string;
  desc: string;
  cookies: string;
}

const CookiesData = ({ headers, data, caption }: CookiesDataProps) => {
  let defaultViewportWidth = 0;
  const props = {
    headers,
    data,
    caption,
  };

  if (typeof window !== "undefined") {
    defaultViewportWidth = window.innerWidth;
  }

  const [viewportWidth, setViewportWidth] = useState(defaultViewportWidth);

  useEffect(() => {
    const handleResize = debounce(() => setViewportWidth(window.innerWidth));

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (viewportWidth > 992) {
    return <CookiesTable {...props} />;
  }

  return <CookiesCards {...props} />;
};

export default CookiesData;
