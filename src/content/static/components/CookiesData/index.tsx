import React, { useState } from "react";
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

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      debounce(() => setViewportWidth(window.innerWidth))
    );
  }, []);

  if (viewportWidth > 991) {
    return <CookiesTable {...props} />;
  }

  return <CookiesCards {...props} />;
};

export default CookiesData;
