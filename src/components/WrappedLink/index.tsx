import React, { ReactNode } from "react";
import { Link as GatsbyLink } from "gatsby";

// import { IcLink } from "@ukic/react";

interface WrappedLinkProps {
  children: ReactNode;
  href?: string;
}

// Destructuring props results in those values being undefined?
/* eslint-disable react/destructuring-assignment */
const WrappedLink: React.FC<WrappedLinkProps> = (props) =>
  props.href ? (
    <ic-link>
      <GatsbyLink to={props.href} {...props}>
        {props.children}
      </GatsbyLink>
    </ic-link>
  ) : (
    <ic-link {...props} />
  );
/* eslint-enable react/destructuring-assignment */

export default WrappedLink;
