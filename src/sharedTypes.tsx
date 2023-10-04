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

export interface MdxFrontMatter {
  title: string;
  date: string;
  contribute?: string;
  subTitle?: string;
}

export interface MdxFields {
  slug: string;
  navSection: string;
}
