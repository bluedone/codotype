# @codotype/ui

:desktop_computer: Codotype UI components - built with React + Typescript

**Getting Started**

Run the following commands to install dependencies and start developing

```
yarn install
yarn storybook
```

**Scripts**

-   `yarn dev` - run `webpack` in `watch` mode
-   `yarn storybook` - runs the Storybook server
-   `yarn build` - builds the NPM package
-   `yarn test -u` - runs Jest + updates test snapshots
-   `yarn lint` - runs EsLint
-   `yarn prettify` - runs Prettier

**Notes**

-   Includes ESLint configured to work with TypeScript and Prettier.

-   Includes tests with Jest - note that the `babel.config.js` and associated dependencies are only necessary for Jest to work with TypeScript.

-   Recommended to use `Visual Studio Code` with the `Format on Save` setting turned on.

-   Includes Storybook configured to work with React + TypeScript. Note that it maintains its own `webpack.config.js` and `tsconfig.json` files. See example story in `src/**/__tests__/*.stories.tsx`

**Built with**

-   [React](https://reactjs.org)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Storybook](https://storybook.js.org/)
-   [Jest](https://jestjs.io)
-   [Eslint](https://eslint.org/)
-   [Webpack](https://webpack.js.org/)
-   [Babel](https://babeljs.io/)
-   [Bootstrap](https://getbootstrap.com)

**Misc. References**

-   [Eslint + Prettier + Typescript Guide](https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb)

---

### Marketing Website TODOs

-   What's your rate?

-   Landing page for Create Next App (working title)

    -   Single landing page
    -   Derived from Tailwind UI
    -   "Powered by Codotype"
    -   Free?
    -   Needs dedicated documentation site (probably dedicated domain too)
    -   Needs dedicated ROADMAP.md file
    -   Privacy Policy

-   FEATURES added to Create Next App (working title)

    -   Putting together roadmap
    -   Dependency updates
    -   New features -> simple!

-   Landing page for Create MERN App (working title)

    -   Single landing page
    -   Derived from Tailwind UI
    -   "Powered by Codotype"
    -   Single-time purchase of \$19.99
    -   Needs dedicated documentation site (probably dedicated domain too)

-   Landing page for Codotype (company)

    -   Links to Create Next App (working title)
    -   Links to GitHub + Documentation

-   Landing page for `ts-find-unused`?
-   Landing page for AkroMills organizers?

### UI TODOs

-   Cleanup brand colors to be `primary` instead of `indigo`

-   Remove references from `Codotype` from the UI

    -   QUESTION - pass in custom copy for finished view + header + else?

-   Tighten up EVERYTHING
