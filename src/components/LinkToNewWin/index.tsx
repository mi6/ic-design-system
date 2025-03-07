import React from "react";

interface LinkToNewWinProps {
  href?: string;
}

// Destructuring props results in those values being undefined?
/* eslint-disable react/destructuring-assignment */
const LinkToNewWin: React.FC<LinkToNewWinProps> = (props) => {
  let correctedHref = props.href;

  if (props.href && process.env.GATSBY_ICDS_PREFIX) {
    correctedHref = process.env.GATSBY_ICDS_PREFIX + props.href;
  }

  return (
    <ic-link href={correctedHref} target="_blank">
      View example in new window
    </ic-link>
  );
};
/* eslint-enable react/destructuring-assignment */

export default LinkToNewWin;
