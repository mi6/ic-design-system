import React, { FormEvent, useEffect, useState } from "react";
import { graphql, navigate, useStaticQuery } from "gatsby";
import FlexSearch, { Index } from "flexsearch";
import { IcSearchBar } from "@ukic/react";

interface SearchResult {
  path: string;
  label: string;
  value: string;
}

const tabNames = "code|accessibility";
const componentsRegEx = `/components/.*/?(${tabNames})`;

const Search: React.FC = () => {
  const queryData = useStaticQuery(graphql`
    query {
      localSearchAll {
        index
        store
      }
    }
  `);

  const { index, store } = queryData.localSearchAll;
  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<SearchResult[]>();
  const [idx, setIdx] = useState<Index<any>>();

  useEffect(() => {
    const importedIndex = FlexSearch.create();
    importedIndex.import(index);
    setIdx(importedIndex);
  }, []);

  const onIcOptionSelect = (event: CustomEvent) => {
    const { value: selectedValue } = event.detail;
    if (options) {
      const match = options.find((option) => option.value === selectedValue);
      if (match && match.path) {
        navigate(match.path);
      }
    }
  };

  // navigate to first item in suggestions when enter pressed or search icon clicked
  const onIcSubmitSearch = (event: CustomEvent) => {
    const { value: searchValue } = event.detail;
    if (searchValue && options) {
      navigate(options[0].path);
    }
  };

  const onIcInput = async (event: CustomEvent) => {
    const newValue = event.detail.value;
    if (idx && value !== newValue) {
      const rawResults = idx.search(value, {});

      // process results to handle components pages where 3 different pages (tabs) have the same title
      // i.e. guidance, accessibility & code
      // parse the path to determine if the result is a component and remove element if path contains "accessibility" or "code"
      // also sort entries to give closest "starts with" match first

      const loaded = await rawResults;
      const mappedResults = loaded
        .flatMap((id) => {
          const el = store[id];
          if (el.title.toLowerCase().includes(newValue.toLowerCase())) {
            const newEl: SearchResult = {
              path: el.path,
              label: el.title,
              value: el.id,
            };
            const { path } = newEl;
            const regex = new RegExp(componentsRegEx);
            const key = path.match(regex)?.pop();
            // if it's accessibility or code page, then ignore
            if (key) {
              return [];
            }
            return newEl;
          }
          return [];
        })
        .sort((a, b) => {
          if (a.label < b.label) {
            return -1;
          }
          if (a.label > b.label) {
            return 1;
          }
          return 0;
        });

      setOptions(mappedResults);
    }

    setValue(newValue);
  };

  const onSubmit = (event: FormEvent) => {
    // cancel form submissions for now - may want to enhance in future to take to a search results page
    event.preventDefault();
  };

  return (
    <form role="search" slot="search" onSubmit={onSubmit}>
      <IcSearchBar
        label="Search the Design System"
        placeholder="Type to search"
        options={options || []}
        onIcInput={onIcInput}
        onIcOptionSelect={onIcOptionSelect}
        onIcSubmitSearch={onIcSubmitSearch}
        value={value}
        disableFilter
        hintText="When autocomplete results are available, use the up and down arrows to choose and press enter to go to that page."
      />
    </form>
  );
};

export default Search;
