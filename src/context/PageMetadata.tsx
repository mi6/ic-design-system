import React from "react";

interface PageMetadataContextProps {
  pageTitle: string;
}

const PageMetadataContext = React.createContext<PageMetadataContextProps>({
  pageTitle: "",
});

export default PageMetadataContext;
