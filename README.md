<!-- markdownlint-disable-file -->
<p align="center">
  <img width="150px" src="/static/icds-logo.png" alt="Logo of the Intelligence Community Design System" loading="lazy">
</p>

# The UK Intelligence Community Design System (ICDS)

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mi6/ic-design-system/tree/main/LICENSE)

The [Intelligence Community Design System](https://design.sis.gov.uk) helps the United Kingdom's Intelligence Community (MI6, GCHQ, MI5, and partners) to quickly build powerful capabilities that are accessible and easy to use.

This is a joint project led by [MI6](https://www.sis.gov.uk), working with [GCHQ](https://www.gchq.gov.uk) and [MI5](https://www.mi5.gov.uk).

<p align="center">
  <img src="/static/icds-orgs.png" alt="SIS (MI6), GCHQ and MI5 Logos" loading="lazy">
</p>

This repo holds the website at [`design.sis.gov.uk`](https://design.sis.gov.uk), look at the [`ic-ui-kit` repo](https://github.com/mi6/ic-ui-kit) for the ICDS UI Kit components.

## Why we're doing this

We build a lot of stuff that needs to be quick-to-build, usable and always accessible. We build using a lot of different tech, so creating something that can be consistently accessible and usable across different stacks is critical for us.

The Design System is being used to build our powerful, flexible and complex capabilities that help keep the UK safe and prosperous.

📖 [Read our story](https://design.sis.gov.uk/get-started/a-design-system) to learn more on why we've created our own design system.

### Learning from the best

We track many sources of accessibility expertise, as well as using our internal experts and communities. For example, many of our patterns and components are based on awesome work from the [Government Digital Service (GDS) Design System](https://design-system.service.gov.uk/). Where we can, we'll contribute back!

If you think we could improve something, please do [raise an issue](https://github.com/mi6/ic-design-system/issues/new/choose).

## Installing

The UI Kit components are in the [`ic-ui-kit` repo](https://github.com/mi6/ic-ui-kit) 👉.

If you still want to host a local version of the `ic-design-system` website, it's straightforward.

```
// dev mode
npm i --legacy-peer-deps
npm run start

// production build outputs to ./dist
npm run clean
npm run build
```

We use GitHub Actions and Pages to host the website, which is automatically published from `main` branch ☁️.

## Contributing

We have a couple of resources to help you with contributing.

- To find out more about the different types of contributions, the criteria, raising issues or our roadmap read [how to contribute to the Design System and UI Kit](https://design.sis.gov.uk/community/contribute).
- Make sure to also read our [coding standards and technical instructions](CONTRIBUTING.md).
- [IC Design System website repository](https://github.com/mi6/ic-design-system) contains the code and content for the Design System website.
- [IC UI Kit repository](https://github.com/mi6/ic-ui-kit) contains the code and content for the web components.

### Security

If you've found a vulnerability, we want to know so that we can fix it. [Our security policy](SECURITY.md) tells you how to do this.

## Questions about the departments

The team is only able to talk about the projects we've put on GitHub 🕵️. We unfortunately can't talk about the work of our departments 😢.

Visit our websites to learn more about:

- The [Secret Intelligence Service (MI6)](https://www.sis.gov.uk).
- The [Government Communications Headquarters (GCHQ)](https://www.gchq.gov.uk).
- The [Security Service (MI5)](https://www.mi5.gov.uk).

## License

Unless stated otherwise, the codebase is released under the [MIT License](https://opensource.org/licenses/MIT). This covers both the codebase and any sample code in the documentation. The documentation is and available under the terms of the [Open Government License v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).

© Crown copyright 2022

[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/mi6/ic-design-system/badge)](https://securityscorecards.dev/viewer/?uri=github.com/mi6/ic-design-system)
