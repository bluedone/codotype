### v0.8.0-canary.53

-   Fix `yarn.lock` file
-   More UI/UX refinements

### v0.8.0-canary.52

-   Lots of UI/UX refinements

### v0.8.0-canary.51

-   Updated `@codotype/core` to `0.8.0-canary.17`
-   Added support for `GroupLayoutVariants.DOCS`

### v0.8.0-canary.50

-   Tailwind UI
-   A lot of other stuff too.

### v0.8.0-canary.40

-   Fix `FaqPage` component `react` import statements
-   Fix `GeneratorListing` page to use `Plugin` terminology
-   Tightened up `HomePage` styles and layout

### v0.8.0-canary.39

-   Updated Navbar + Homepage component exports to allow Next.js to gracefully handle SSR for the `GitHubButton` component

### v0.8.0-canary.38

-   Removed `@src` alias, dependency injection now handled only by relative paths

### v0.8.0-canary.37

-   Simplified dependency injection of `GitHubButton` component

### v0.8.0-canary.36

-   Remove `react-github-btn` - replaced with our own `GitHubButton` component

### v0.8.0-canary.35

-   Updated `@codotype/core` to `0.8.0-canary.6`
-   Added `ExampleProjectDropdown` component
-   Responsive `SchemaEditor`
-   Simplified `ProjectEditor` and `SchemaEditor` UI

### v0.8.0-canary.35

-   Updated `@codotype/core` to `0.8.0-canary.5`
-   Added `DataPreviewRenderer` component - implemented in `ConfigurationCollectionInput`

### v0.8.0-canary.34

-   Updated `ConfigurationInputChild` to implement `applyStringPropertyFilter` + `applyNumberPropertyFilter` in `onBlur` event
-   First `CHANGELOG` entry since move to React + TypeScript

#### Changes

-   Bug fix in `localStorageMediator`, improved inital loading handler

---

### v0.1.16

#### Changes

-   Bug fix in `localStorageMediator`, improved inital loading handler

---

### v0.1.15

#### Changes

-   Updated `localStorageMediator` to scope all data under `projects` (sloppy first-pass)

---

### v0.1.14

#### Changes

-   Added `MobileNotSupported` component
-   Tweaked layout for `md` size screens
-   Bug fix in `NavbarBrand` component

---

### v0.1.13

#### Changes

-   Fixed another issue with `SchemaDestroyButton` tooltip behavior
-   Updated `runtimeModule` to filter out schemas without any attributes or relations
-   `SchemaDetail` supports new `schema.removable` property
-   Refactored `EditProjectModal` component, wraps `ProjectForm` component
-   Sized down `GenerateCodeButton`
-   Merged `ConfigurationEditor` component template and logic into `BlueprintEditor` component
-   Added `ProjectEditButton` component
-   Split `SchemaEditor` out of `BlueprintEditor` as a standalone component
-   Cleaned up `<TourButton />` component

---

### v0.1.12

#### Changes

-   Fixed bug in ConfigurationEditor preventing Generators with `defaultSchemas` from not full loading on initialization
-   Fixed bug with `SchemaDestroyButton` tooltip behavior

---

### v0.1.11

#### Changes

-   Refined `SchemaDetail` schema removal behavior
-   ConfigurationEditor supports `defaultSchemas`
-   Fixed bug in Relation form where edit changes weren't propagating

---

### v0.1.10

#### Changes

-   Loading components use new brand-centric `LoadingSpinner.vue` component

---

### v0.1.9

#### Changes

-   `Generate Code` button enabled in schema editor

---

### v0.1.8

#### Changes

-   Added tour to Build Configuration page via the `ConfigurationHelp.html` template
-   TourMediator handles configuration tour "seen" state
-   Updated `SchemaForm` header copy
-   Added `SchemaEmptyState` component
-   Updated `SchemaListItem` component selected state styles
-   `SchemaDetail` component drops `isUserModel` method, replaced with `isLocked` and `isRemovable`
-   Updated `SortableList` and `NewModelButton` components to accept locked/disabled attributes
-   `AttributeDatatypeForm` only displays datatypes that are supported by the generator
-   `schemaModule.is` splits the Vuex action used to show the new/edit modal
-   Build store loads default schemas pulled from `generatorMeta`
-   Added header to `ConfigurationEditor` component
-   Refactoring RelationForm UI
-   Refined BuildStepControls behavior
-   Added `border-left` to `AttributeListItem`, `RelationListItem`, and `SchemaListItem` components - consistent visual languages for re-orderable elements
-   Restructured `AttributeForm` and associated components
-   Added `locked` and `source` attributes to `DEFAULT_SCHEMA`
-   Added color-coding the `RelationForm`
-   Updated warning badge, selection indicator on `SchemaListItem`
-   `BuildSteps` component color changed from green to blue
-   Attribute, Relation, Schema, and Project Forms changed submit buttons from green to blue
-   Added `@keyup.enter` to `SchemaForm`, accepts `enableSubmit` and `onKeypressEnter` props
-   Prevent `AttributeForm` submission if `label` or `identifier` properties are not unique
-   Abstracted `RelationTypeForm` from `RelationForm` component
-   Cleaned up `HelpButton` component, re-integrated into `BuildStepsControls`
-   Deleted unused `ArrayInput` component
-   Deleted unused `HomeFooter` component
-   Moved `GeneratorEditor` components into separate `@codotype/generator-editor` package
-   Added additional datatypes to `FormInput` and `AttributeValidationsForm` components
-   `RelationTypeForm` only displays relation types that are supported by the generator
-   Renamed `option_groups` to `configuration_groups`
-   Added `NavbarBrand`, `NavbarLinks`, `NavbarWrapper` components
-   Added `AboutJumbotron`, `AboutBody`, `AboutAttribution` components
-   Added `ChevronAnimation` component
-   Removed deprecated Navbar components
-   Updated `GeneratorStart` component to render nicely in Vue.js SPA and Nuxt.js
-   Updated `ConfigurationEditor/index.vue` and `OptionFormItem` components to support `ConfigurationGroup` refactor
-   Removed `vue-loading-spinner` package due to license issues (Thanks [Fossa!](https://fossa.com/))
-   `localStorageMediator.js` stores Project label
-   `SchemaDestroyButton` component prevents removal of schema with incoming relations

#### Fixes

-   `BuildError` component directs users to `codotype.io` instead of `splash.codotype.io`
-   Fixed erroneous behavior of `enableSubmit` Vuex getter in `projectModule`

---

### v0.1.7

#### Changes

-   `OptionTemplateWrapper` component implements `tooltip` prop from pulled from `previewTooltip` variables
-   Cleaned up `OptionFormItem` component spacing in `ModelAddonEditor`
-   `ModelAddonEditor` component implements `<draggable>`
-   Scaffolded out Relation validation function, prevents form submission
-   Refined `<BuildLoading />` component UX
-   Refined `<BuildError />` component UX
-   Added `<Redirect redirectUrl="..." />` component
-   Simplified output in `<SchemaPreview />` component
-   Removed emoji from `<SortableList />` component
-   Switched dropdown alignment in `<BuildStepsControls />` component import/export
-   Cleaned up spacing in `GeneratorCard` and `GeneratorListItem` components

#### Fixes

-   Bug in `BuildStepsControls` component for 2-step generators
-   Bug where `build/selectBuild` wasn't being invoked for 2-step generators
-   UI bug where `<BuildLoading />` component wasn't centered on the page

---

### v0.1.6

#### Changes

-   `SchemaList` component implements `<draggable>`
-   Added `localStorageMediator` to `BlueprintEditor`

---

### v0.1.5

#### Changes

-   Bumped `@codotype/types` dependency to `0.2.1`

---

### v0.1.4

#### Changes

-   Improved `ProjectForm` component UI
-   Consistent UI between `BlueprintEditor` and `ConfigurationEditor` components

#### Fixes

-   Added `metaInfo` to Generator `build.vue` component

---

### v0.1.3

#### Changes

-   Simplified `Navbar` component
-   Updated `GeneratorCard` and `GeneratorListItem` to be compatible with the Nuxt.js app
-   Refined `RelationForm` & associated components - still needs a lot more work
-   Misc. Driver.js tour refinements

#### Fixes

-   More bug fixes in `SortableList` component with `b-dropdown` component from BootstrapVue
-   UI icon bug fix in `RelationListItem` component

---

### v0.1.2

#### Changes

-   Bumped `@codotype/types` dependency to `0.2.0`
-   Bumped `@codotype/util` dependency to `0.4.1`
-   UI refinements in `AttributeForm` component

#### Fixes

-   More bug fixes in `SortableList` component with `vue-smooth-reflow` library

---

### v0.1.1

#### Changes

-   Bumped `vuedraggable` dependency to 2.19
-   Lots of UI / UX refinements in `BlueprintEditor` component

#### Fixes

-   Bug fixes in `SortableList` component

#### Documentation

-   Added `CHANGELOG.md`

---

### v0.1.0

#### Changes

-   Published `@codotype/ui` package
