import React from "react";
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
      newDesc[index] = <code className="language-text">{block}</code>;
    }
  });

  return <p>{newDesc}</p>;
};
