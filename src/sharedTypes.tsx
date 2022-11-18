import React from "react";

interface FrontMatter {
  navPriority?: number;
  title: string;
}

interface Fields {
  navParent: string;
  navSection: string;
  slug: string;
}

export interface NavigationObject {
  id: string;
  frontmatter: FrontMatter;
  fields: Fields;
  body: string;
  headings: Heading[];
}

export interface Icon {
  icon: React.ReactNode;
  name: string;
  link?: string;
  library?: string;
}

export interface IconGroup {
  title: string;
  id: string;
  icons: Icon[];
}

export interface Heading {
  depth: number;
  value: string;
}
