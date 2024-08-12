# Contributing to the Intelligence Community Design System guidance site

Welcome and thank you for contributing to the [Intelligence Community Design System guidance site](https://design.sis.gov.uk/). This guide will take you through the technical considerations for contributing.

## Table of contents

- [Code of conduct](#code-of-conduct)

- [How to contribute](#how-to-contribute)

  - [Making a suggestion or raising a bug](#making-a-suggestion-or-raising-a-bug)
  - [Contributing code](#contributing-code)
  - [Setting up the Design System guidance site codebase](#setting-up-the-design-system-guidance-site-codebase)
  - [Pull requests](#pull-requests)

- [Coding standards and practices](#coding-standards-and-practices)

  - [Accessibility](#accessibility)
  - [Style guide](#style-guide)
  - [Git commit](#git-commit)
  - [Amending a commit](#amending-a-commit)
  - [Styling](#styling)

- [Testing](#testing)

- [Useful links](#useful-links)

## Code of conduct

The Intelligence Community Design System (ICDS) has adopted the [Contributor Covenant](https://www.contributor-covenant.org/). Please familiarise yourself with our full [conduct principles](/CODE_OF_CONDUCT.md).

## How to contribute

To find out more about the different types of contributions, the criteria or our roadmap, read [how to contribute to the Design System and UI Kit](https://design.sis.gov.uk/community/contribute).

### Making a suggestion or raising a bug

You can help us speed up the development of our Design System by contributing new guidance, improving existing guidance or raising bugs.

Before getting started, please check our [Github issues](https://github.com/mi6/ic-design-system/issues) page to check whether a similar bug or suggestion already exists. If not, create a ticket with as much information as possible. The working group will triage your ticket and get back to you. The working group meet on a fortnightly basis to review new tickets, but important bugs will be reviewed sooner.

### Contributing code

[Gatsby](https://www.gatsbyjs.com/) is the [React](https://reactjs.org/) based framework used to build the guidance site with the content pages built in [MDX](https://mdxjs.com/).
All content pages can be found in `./src/content/`.

### Setting up the Design System guidance site codebase

[Node 16+](https://nodejs.org/en/) is required to build and run the codebase.

If you would like to contribute code, please complete the following steps:

1. Fork the [Design System guidance site repository](https://github.com/mi6/ic-design-system) and clone your forked repo onto your device.
2. Make sure to add the `mi6/ic-design-system` repo as your upstream remote branch, by running:

```bash
git remote add upstream git@github.com:mi6/ic-design-system.git
```

3. Create a new branch in your forked repo, named after the issue number of your contribution (e.g. feature/123-new-feature).
4. Run the following:

**NPM**

```bash
npm install
npm start
```

**Yarn**

```bash
rm package-lock.json
yarn install
yarn run start
```

5. Make your changes, keeping to the [coding standards and practices](#coding-standards-and-practices).
6. Commit your changes, as per the [Git commit style guide](#git-commit) and push to your branch.
7. Submit a [pull request](#pull-requests) to merge to the `develop` branch in the original repository:

   - Click on `Compare & pull request`.
   - Set the base to be the original repository's `develop` branch and the host to be your `forked branch`.
   - Click on `Create pull request`.

### Pull Requests

All changes will be reviewed via a pull request. Raise the pull request to merge to the `develop` branch. Provide details on what has been changed or added. To make sure there is enough detail in the pull request, our [pull request template](https://github.com/mi6/ic-design-system/blob/main/.github/pull_request_template.md) is available.

All pull requests will be reviewed by:

- Checking the change meets the guidance set out on this page.
- Checking the change meets the requirements of the ticket.
- For new components or large changes, testing the project locally by importing the component into a real project.
- Checking anything else deemed relevant by the reviewer.

Pull requests must have the approval of 2 reviewers before they can be merged into the `develop` branch.

## Coding standards and practices

### Accessibility

All changes must meet the criteria for [WCAG 2.2 AA](https://design.sis.gov.uk/accessibility/requirement/wcag). Find out more about the importance of [accessibility](https://design.sis.gov.uk/accessibility).

### Style guide

Linting tools are ran against the codebase to keep in line with our coding standards. The linting tools used are:

- [Prettier](https://prettier.io/)
- [Eslint](https://eslint.org/) with the following plugins:
  - [React](https://github.com/jsx-eslint/eslint-plugin-react)
  - [Airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
  - [MDX](https://github.com/mdx-js/eslint-mdx)

These tools are ran as part of the pre-commit and can also be ran separately.

Resolve linting and formatting issues via `npm run lint:fix` and `npm run prettier:fix`.

### Git user configuration

As a data protection measure, this repository enforces the use of GitHub user email address in your commit. Please follow these steps:

1. Visit your [GitHub email settings](https://github.com/settings/emails)
   - Optionally check the settings "Keep my email addresses private" and "Block command line pushes that expose my email"
2. On this page, under **Primary Email Address** you'll see a user email that follows the pattern `<username>@users.noreply.github.com`.
3. Inside your developer environment, open a command line in the directory of the ic-ui-kit repository
4. Enter the command `git config user.email <EMAIL>` where you replace `<EMAIL>` with the address from step 3. This will be applied to commits made in this repository.

### Git commit

For automated versioning, we use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

To make it easy to use we have implemented [Commitizen](https://github.com/commitizen/cz-cli).

Please ensure that your commits are [signed](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification) when contributing to the Design System guidance site repository.

Follow these steps when making a commit:

1. Ensure your commit only contains changes for one of the scopes. If your change affects more than one scope then make multiple commits, i.e. one for each scope.
2. Once your changes are staged, run `git commit`. This will trigger the [Commitizen](https://github.com/commitizen/cz-cli) command line utility.
3. Select the commit type, read each of the options and select the appropriate one.
4. When asked for scope, enter either:

   - `root` if your commit contains changes to the root of the project.
   - `docs` for a documentation changes.

5. Provide a short description of the change.

   - Use the present tense, such as "Add feature" not "Added feature"
   - Reference the issue number at the start of the commit, such as "#123 Add feature"

6. Provide a longer description of the change.
7. If there are breaking changes enter `y` and provide a description.
8. Provide a link to the issue by entering the reference e.g. `#123`.
9. When the editor opens up, check your commit message and press `Ctrl`+`x` to confirm.

### Amending a commit

If you need to make changes to a commit (for example, after receiving comments on a PR), follow these steps:

1. **If you're amending the most recent commit:**
   - Stage your changes using `git add` and include the files you want to update.
   - Run `git commit --amend --no-edit` to amend the most recent commit without changing the commit message.
   - The Commitizen prompt will still appear as if you are making a new commit. Exit the prompt (usually by pressing Ctrl+C).
   - Push the changes to the remote repository using: `git push --force`.

2. **If you're amending an older commit:**
   - Use `git rebase` to modify an older commit. For example, to modify commit `a1312407`, run:
     ```sh
     git rebase --interactive a1312407
     ```

   - In the default editor, change `pick` to `edit` for the line mentioning `a1312407`.

   - Save the file and exit. Git will interpret and automatically execute the commands in the file, placing you in the state just after creating commit `a1312407`.

   - Amend the commit by making your changes and then running:
     ```sh
     git commit --all --amend --no-edit
     ```

   - The Commitizen prompt will still appear as if you are making a new commit. Exit the prompt (usually by pressing Ctrl+C).

   - Continue the rebase process by running:
     ```sh
     git rebase --continue
     ```

   - Push the changes to the remote repository using:
     ```sh
     git push --force
     ```

### Styling

- Avoid using inline css.
- Use [clsx](https://www.npmjs.com/package/clsx) (included as part of setup) for constructing className strings in the [Design System guidance site repository](https://github.com/mi6/ic-design-system).
- The styling is provided by [IC UI Kit design tokens](https://github.com/mi6/ic-ui-kit/blob/main/packages/web-components/src/global/variables.css) using CSS custom properties.

## Testing

Tests should be sufficient enough for the functionality changed or added.

Testing should always include accessibility testing. Please read our advice on [how to test for accessibility](https://design.sis.gov.uk/accessibility/testing)

## Useful links

- [Issues](https://github.com/mi6/ic-design-system/issues)
- [Code of conduct](./CODE_OF_CONDUCT.md)
- [ICDS guidance site](https://design.sis.gov.uk/)
- [License](./LICENSE)
- [Security](./SECURITY.md)
