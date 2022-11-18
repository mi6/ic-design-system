import React, { ReactNode } from "react";
import { Link as GatsbyLink } from "gatsby";

import { IcLink } from "@ukic/react";

interface WrappedLinkProps {
  children: ReactNode;
  href?: string;
}

// Destructuring props results in those values being undefined?
/* eslint-disable react/destructuring-assignment */
const WrappedLink: React.FC<WrappedLinkProps> = (props) =>
  props.href ? (
    <IcLink>
      <GatsbyLink to={props.href} {...props}>
        {props.children}
      </GatsbyLink>
    </IcLink>
  ) : (
    <IcLink {...props} />
  );
/* eslint-enable react/destructuring-assignment */

export default WrappedLink;
