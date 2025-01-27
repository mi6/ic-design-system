import React, { useEffect, useState } from "react";
// eslint-disable-next-line import/prefer-default-export
export function debounce(fn: Function, timeout = 300) {
  let timer: ReturnType<typeof setTimeout>;
  return function func(this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, timeout);
  };
}

export const backtickToCodeBlock = (description: string) => {
  const regex = /`(.*?)`/gs;

  const matches = [...description.matchAll(regex)];

  const codeBlocks = matches.map((match) => match[1]);

  const newDesc: any[] = description.split(regex);

  newDesc.forEach((block, index) => {
    if (codeBlocks.includes(block)) {
      newDesc[index] = (
        // eslint-disable-next-line react/no-array-index-key
        <code className="language-text" key={`${block}-${index}`}>
          {block}
        </code>
      );
    }
  });

  return <p>{newDesc}</p>;
};

export const useViewportWidth = () => {
  let defaultViewportWidth = 0;

  if (typeof window !== "undefined") {
    defaultViewportWidth = window.innerWidth;
  }

  const [viewportWidth, setViewportWidth] =
    useState<number>(defaultViewportWidth);

  useEffect(() => {
    const handleResize = debounce(() => setViewportWidth(window.innerWidth));

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return viewportWidth;
};

// returns the image source based on theme mode and whether it is an array of light and dark mode images or a single image
export const passImage = (imageSrc: Array<string> | string, theme: string) => {
  if (typeof imageSrc === "string") {
    return imageSrc;
  }
  return theme === "light" ? imageSrc[0] : imageSrc[1];
};
