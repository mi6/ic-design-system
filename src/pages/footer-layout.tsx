import React from "react";
import { PageProps } from "gatsby";
import {
  IcFooter,
  IcFooterLink,
  IcSectionContainer,
  IcTopNavigation,
  IcTypography,
  SlottedSVG,
} from "@ukic/react";

const FooterLayout: React.FC<PageProps> = () => (
  <div id="footer-layout-root">
    <div style={{ minHeight: "100vh" }}>
      <IcTopNavigation appTitle="ICDS" status="alpha" version="v0.0.7">
        <SlottedSVG
          slot="app-icon"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="#000000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" />
        </SlottedSVG>
      </IcTopNavigation>
      <main>
        <IcSectionContainer>
          <IcTypography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            vestibulum venenatis facilisis. Nam tortor felis, auctor vel ante
            quis, tempor interdum libero. In dictum sodales velit, eu egestas
            arcu dignissim ac. Aliquam facilisis eros dolor, id laoreet orci
            sagittis ut. Sed tempus, lacus in pretium molestie, lectus magna
            interdum risus, vel fringilla libero ex eu dui. Suspendisse
            ullamcorper vehicula lacinia. Phasellus congue velit nisl, vitae
            congue ligula rutrum id.
          </IcTypography>
        </IcSectionContainer>
      </main>
    </div>
    <IcFooter
      description="The UK Intelligence Community Design System (ICDS) is a joint project by MI6, GCHQ, MI5, and partners."
      caption="All content is available under the Open Government Licence v3.0, except source code and code examples which are available under the MIT Licence."
    >
      <IcFooterLink slot="link" href="/">
        Accessibility
      </IcFooterLink>
      <IcFooterLink slot="link" href="/">
        Styles
      </IcFooterLink>
      <IcFooterLink slot="link" href="/">
        Components
      </IcFooterLink>
      <IcFooterLink slot="link" href="/">
        Patterns
      </IcFooterLink>
    </IcFooter>
  </div>
);

export default FooterLayout;
