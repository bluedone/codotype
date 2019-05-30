### v0.1.8 (UNPUBLISHED)

#### Changes
* XYZ

#### Fixes
* `BuildError` component directs users to `codotype.io` instead of `splash.codotype.io`

---

### v0.1.7

#### Changes
* `OptionTemplateWrapper` component implements `tooltip` prop from pulled from `previewTooltip` variables
* Cleaned up `OptionFormItem` component spacing in `ModelAddonEditor`
* `ModelAddonEditor` component implements `<draggable>`
* Scaffolded out Relation validation function, prevents form submission
* Refined `<BuildLoading />` component UX
* Refined `<BuildError />` component UX
* Added `<Redirect redirectUrl="..." />` component
* Simplified output in `<SchemaPreview />` component
* Removed emoji from `<SortableList />` component
* Switched dropdown alignment in `<BuildStepsControls />` component import/export
* Cleaned up spacing in `GeneratorCard` and `GeneratorListItem` components

#### Fixes
* Bug in `BuildStepsControls` component for 2-step generators
* Bug where `build/selectBuild` wasn't being invoked for 2-step generators
* UI bug where `<BuildLoading />` component wasn't centered on the page

---

### v0.1.6

#### Changes
* `SchemaList` component implements `<draggable>`
* Added `localStorageMediator` to `BlueprintEditor`

---

### v0.1.5

#### Changes
* Bumped `@codotype/types` dependency to `0.2.1`

---

### v0.1.4

#### Changes
* Improved `ProjectForm` component UI
* Consistent UI between `BlueprintEditor` and `ConfigurationEditor` components

#### Fixes
* Added `metaInfo` to Generator `build.vue` component

---

### v0.1.3

#### Changes
* Simplified `Navbar` component
* Updated `GeneratorCard` and `GeneratorListItem` to be compatible with the Nuxt.js app
* Refined `RelationForm` & associated components - still needs a lot more work
* Misc. Driver.js tour refinements

#### Fixes
* More bug fixes in `SortableList` component with `b-dropdown` component from BootstrapVue
* UI icon bug fix in `RelationListItem` component

---

### v0.1.2

#### Changes
* Bumped `@codotype/types` dependency to `0.2.0`
* Bumped `@codotype/util` dependency to `0.4.1`
* UI refinements in `AttributeForm` component

#### Fixes
* More bug fixes in `SortableList` component with `vue-smooth-reflow` library

---

### v0.1.1

#### Changes
* Bumped `vuedraggable` dependency to 2.19
* Lots of UI / UX refinements in `BlueprintEditor` component

#### Fixes
* Bug fixes in `SortableList` component

#### Documentation
* Added `CHANGELOG.md`

---

### v0.1.0

#### Changes
* Published `@codotype/ui` package
