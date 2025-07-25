import React from "react";
import { PageProps } from "gatsby";
import { SlottedSVG } from "@ukic/react";

const SideNavigationLayout: React.FC<PageProps> = () => (
  <div id="side-nav-example-root">
    <div style={{ display: "flex", height: "100%" }}>
      <ic-skip-link target="main" />
      <ic-side-navigation
        app-title="ACME coffee shop"
        version="v0.0.7"
        status="Alpha"
      >
        <SlottedSVG
          slot="app-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <title>coffee-outline</title>
          <path d="M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M16,5H6V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5Z" />
        </SlottedSVG>
        <ic-navigation-item slot="primary-navigation" href="#" label="Home">
          <SlottedSVG
            xmlns="http://www.w3.org/2000/svg"
            slot="icon"
            viewBox="0 0 24 24"
          >
            <title>home</title>
            <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
          </SlottedSVG>
        </ic-navigation-item>
        <ic-navigation-item slot="primary-navigation" href="#" label="Search">
          <SlottedSVG
            xmlns="http://www.w3.org/2000/svg"
            slot="icon"
            viewBox="0 0 24 24"
          >
            <title>magnify</title>
            <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
          </SlottedSVG>
        </ic-navigation-item>
        <ic-navigation-item slot="primary-navigation" href="#" label="Drinks">
          <SlottedSVG
            xmlns="http://www.w3.org/2000/svg"
            slot="icon"
            viewBox="0 0 24 24"
          >
            <title>coffee-outline</title>
            <path d="M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M16,5H6V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5Z" />
          </SlottedSVG>
        </ic-navigation-item>
        <ic-navigation-item
          slot="primary-navigation"
          href="#"
          label="Equipment"
        >
          <SlottedSVG
            xmlns="http://www.w3.org/2000/svg"
            slot="icon"
            viewBox="0 0 24 24"
          >
            <title>coffee-maker-outline</title>
            <path d="M18 6V4H20V2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H20V20H15.97C17.2 19.09 18 17.64 18 16V11H8V16C8 17.64 8.81 19.09 10.03 20H6V4H8V6C8 6.55 8.45 7 9 7H17C17.55 7 18 6.55 18 6M10 16V13H16V16C16 17.65 14.65 19 13 19S10 17.65 10 16M13 8C13.55 8 14 8.45 14 9S13.55 10 13 10 12 9.55 12 9 12.45 8 13 8Z" />
          </SlottedSVG>
        </ic-navigation-item>
        <ic-navigation-item
          slot="secondary-navigation"
          href="#"
          label="Settings"
        >
          <SlottedSVG
            xmlns="http://www.w3.org/2000/svg"
            slot="icon"
            viewBox="0 0 24 24"
          >
            <title>cog-outline</title>
            <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z" />
          </SlottedSVG>
        </ic-navigation-item>
      </ic-side-navigation>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
        }}
      >
        <main id="main" style={{ height: "100vh" }}>
          <ic-section-container>
            <ic-typography>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vestibulum venenatis facilisis. Nam tortor felis, auctor vel
                ante quis, tempor interdum libero. In dictum sodales velit, eu
                egestas arcu dignissim ac. Aliquam facilisis eros dolor, id
                laoreet orci sagittis ut. Sed tempus, lacus in pretium molestie,
                lectus magna interdum risus, vel fringilla libero ex eu dui.
                Suspendisse ullamcorper vehicula lacinia. Phasellus congue velit
                nisl, vitae congue ligula rutrum id.
              </p>
            </ic-typography>
            <ic-typography>
              <p>
                Etiam in suscipit metus. Duis semper, sapien a molestie semper,
                ex nibh porttitor tellus, vel molestie justo odio vel purus.
                Curabitur porttitor, tortor sed semper sollicitudin, odio odio
                congue tortor, eget pulvinar tellus nisl ac lacus. In ultricies
                commodo lorem, a laoreet diam. Ut a mauris at tellus tincidunt
                ullamcorper sit amet in metus. Aenean facilisis placerat dictum.
                Phasellus mattis ante sollicitudin luctus iaculis. Nam porttitor
                lobortis rhoncus. Nam nec malesuada purus, at pulvinar mauris.
                Nam non lorem ante.
              </p>
            </ic-typography>
          </ic-section-container>
        </main>
        <ic-footer
          description="The UK Intelligence Community Design System (ICDS) is a joint project by MI6, MI5, GCHQ, and HMGCC, our national security partner, along with other collaborators."
          caption="All content is available under the Open Government Licence v3.0, except source code and code examples which are available under the MIT Licence."
        >
          <ic-footer-link slot="link" href="/">
            Get Started
          </ic-footer-link>
          <ic-footer-link slot="link" href="/">
            Accessibility
          </ic-footer-link>
          <ic-footer-link slot="link" href="/">
            Styles
          </ic-footer-link>
        </ic-footer>
        <ic-classification-banner classification="official" />
      </div>
    </div>
  </div>
);

export default SideNavigationLayout;
