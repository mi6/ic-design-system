import React, { ReactNode } from "react";
import { Link as GatsbyLink } from "gatsby";

// import { IcLink } from "@ukic/react";

interface WrappedLinkProps {
  children: ReactNode;
  href?: string;
}

// Destructuring props results in those values being undefined?
/* eslint-disable react/destructuring-assignment */
const WrappedLink: React.FC<WrappedLinkProps> = (props) => {
  let correctedHref = props.href;

  if (
    props.href &&
    process.env.GATSBY_ICDS_PREFIX &&
    props.href.startsWith(process.env.GATSBY_ICDS_PREFIX)
  ) {
    correctedHref = props.href.replace(process.env.GATSBY_ICDS_PREFIX, "");
  }

  return correctedHref ? (
    <ic-link>
      <GatsbyLink to={correctedHref} {...props}>
        {props.children}
      </GatsbyLink>
    </ic-link>
  ) : (
    <ic-link {...props} />
  );
};
/* eslint-enable react/destructuring-assignment */

export default WrappedLink;
