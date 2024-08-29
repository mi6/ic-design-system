import React, { FormEvent, useEffect, useState } from "react";
import { graphql, navigate, useStaticQuery } from "gatsby";
import FlexSearch, { Index } from "flexsearch";
import { IcSearchBar } from "@ukic/react";
import clsx from "clsx";
import {
  IcOptionSelectEventDetail,
  IcSearchBarCustomEvent,
  IcValueEventDetail,
} from "@ukic/web-components";

interface SearchResult {
  path: string;
  label: string;
  value: string;
  description: string;
  isInBody: boolean;
  isInTags: boolean;
}

interface QueryResult {
  localSearchAll: {
    index: string;
    store: {
      [key: string]: {
        title: string;
        body: string;
        subTitle: string;
        path: string;
        id: string;
        tags?: string[];
      };
    };
  };
}
/** If it's accessibility or code page, then ignore */
const componentsRegEx = "/components/.*/?(code|accessibility)";

const Search: React.FC = () => {
  const { index, store } = useStaticQuery<QueryResult>(graphql`
    query {
      localSearchAll {
        index
        store
      }
    }
  `).localSearchAll;

  const [hasMounted, setHasMounted] = useState(false);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<SearchResult[]>([]);
  const [idx, setIdx] = useState<Index<string>>();

  useEffect(() => {
    const importedIndex = FlexSearch.create<string>();
    importedIndex.import(index);
    setIdx(importedIndex);
    setHasMounted(true);
  }, []);

  const onIcOptionSelect = (
    event: IcSearchBarCustomEvent<IcOptionSelectEventDetail>
  ) => {
    const match = options.find((option) => option.value === event.detail.value);
    if (match?.path) {
      navigate(match.path);
      setValue("");
    }
  };

  /** Navigate to first item in suggestions when enter pressed or search icon clicked */
  const onIcSubmitSearch = (
    event: IcSearchBarCustomEvent<IcValueEventDetail>
  ) => {
    if (event.detail.value && options.length) {
      navigate(options[0].path);
    }
  };

  /**
   * Process results to handle components pages where 3 different pages (tabs) have the same title (i.e. guidance, accessibility & code).
   * Parse the path to determine if the result is a component and remove element if path contains "accessibility" or "code".
   * Also sort entries to give closest "starts with" match first
   */
  const onIcInput = async (
    event: IcSearchBarCustomEvent<IcValueEventDetail>
  ) => {
    const newValue = event.detail.value;
    const includesNewValue = (property?: string) =>
      !!property?.toLowerCase().includes(newValue.toLowerCase());

    if (idx && value !== newValue) {
      setLoading(true);
      const loaded = await idx.search(newValue, {});
      const mappedResults = loaded
        .flatMap((loadedId) => {
          const { path, title, id, tags, body, subTitle } = store[loadedId];
          const isInTags = !!tags?.some((tag) => includesNewValue(tag));
          const isInBody = includesNewValue(body);
          return !path.match(new RegExp(componentsRegEx)) &&
            (includesNewValue(title) ||
              includesNewValue(subTitle) ||
              isInBody ||
              isInTags)
            ? {
                label: title,
                value: id,
                description: subTitle,
                path,
                isInBody,
                isInTags,
              }
            : [];
        })
        .sort((a, b) => {
          const getPriority = ({
            label,
            description,
            isInBody,
            isInTags,
          }: SearchResult) => {
            if (includesNewValue(label)) return 1;
            if (isInTags) return 2;
            if (includesNewValue(description)) return 3;
            if (isInBody) return 4;
            return 5;
          };

          const priorityA = getPriority(a);
          const priorityB = getPriority(b);

          if (priorityA < priorityB) {
            return -1;
          }
          if (priorityA > priorityB) {
            return 1;
          }
          return 0;
        });

      setLoading(false);
      setOptions(mappedResults);
    }

    setValue(newValue);
  };

  const onSubmit = (event: FormEvent) => {
    // cancel form submissions for now - may want to enhance in future to take to a search results page
    event.preventDefault();
  };

  return (
    <form
      role="search"
      slot="search"
      onSubmit={onSubmit}
      className={clsx(!hasMounted && "not-loaded")}
    >
      <IcSearchBar
        id="search-form"
        label="Search the Design System"
        hideLabel
        placeholder="Type to search"
        options={options}
        onIcInput={onIcInput}
        onIcOptionSelect={onIcOptionSelect}
        onIcSubmitSearch={onIcSubmitSearch}
        value={value}
        loading={loading}
        timeout={1000}
        disableAutoFiltering
        fullWidth
        assistiveHintText="When autocomplete results are available, use the up and down arrows to choose and press enter to go to that page."
      />
    </form>
  );
};

export default Search;
