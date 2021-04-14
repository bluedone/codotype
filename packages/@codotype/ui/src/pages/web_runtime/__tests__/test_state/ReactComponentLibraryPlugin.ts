import { pluginReadme } from "../../../../components/MarkdownRenderer/__tests__/test_state";
import {
    PluginMetadata,
    PropertyTypes,
    Primitives,
    ConfigurationGroup,
    PropertyLayoutVariants,
    ConfigurationProperty,
} from "@codotype/core";

// // // //
// React + TS Component Library Starter

// // // //
// Library Metadata

const libraryMetadata: ConfigurationProperty = new Primitives.ConfigurationProperty(
    {
        identifier: "metadata",
        content: {
            label: "Package Metadata",
            description:
                "Configure the name of your NPM package and the component it exports",
            icon: "",
            documentation: "",
        },
        type: PropertyTypes.INSTANCE,
        layoutVariant: PropertyLayoutVariants.COL_12,
        properties: [
            new Primitives.ConfigurationProperty({
                identifier: "packageName",
                content: {
                    label: "Package Name",
                    description:
                        "What's the name of your component library package?",
                    icon: "",
                    // "https://seeklogo.com/images/J/jest-logo-F9901EBBF7-seeklogo.com.png",
                    documentation: "",
                },
                type: PropertyTypes.STRING,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
            }),
            new Primitives.ConfigurationProperty({
                identifier: "componentName",
                content: {
                    label: "Component Name",
                    description:
                        "What's the name of the React component your library exports?",
                    icon: "",
                    // "https://seeklogo.com/images/J/jest-logo-F9901EBBF7-seeklogo.com.png",
                    documentation: "",
                },
                type: PropertyTypes.STRING,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
            }),
            new Primitives.ConfigurationProperty({
                identifier: "author",
                content: {
                    label: "Author",
                    description: "Who's the author of this component library?",
                    icon: "",
                    // "https://seeklogo.com/images/J/jest-logo-F9901EBBF7-seeklogo.com.png",
                    documentation: "",
                },
                type: PropertyTypes.STRING,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
            }),
            new Primitives.ConfigurationProperty({
                identifier: "license",
                content: {
                    label: "License",
                    description:
                        "Which open-source license would you like to use?",
                    icon: "",
                    documentation: "",
                },
                type: PropertyTypes.DROPDOWN,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
                dropdownOptions: [
                    { value: "mit", label: "MIT" },
                    { value: "gpl", label: "GPL" },
                    { value: "none", label: "None" },
                ],
            }),
        ],
    },
);

// // // //
// Tooling Property

const toolingProperty: ConfigurationProperty = new Primitives.ConfigurationProperty(
    {
        identifier: "tooling",
        content: {
            label: "Tooling",
            description:
                "Configure the tooling for developing your component library",
            icon: "",
            documentation:
                "All logos are property of their respecive copyright holders",
        },
        type: PropertyTypes.INSTANCE,
        layoutVariant: PropertyLayoutVariants.COL_12,
        properties: [
            new Primitives.ConfigurationProperty({
                identifier: "jest",
                content: {
                    label: "Jest",
                    description:
                        "Include Jest environment and snapshot tests for all your components",
                    icon:
                        "https://seeklogo.com/images/J/jest-logo-F9901EBBF7-seeklogo.com.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
            }),
            new Primitives.ConfigurationProperty({
                identifier: "prettier",
                content: {
                    label: "Prettier",
                    description:
                        "Include Prettier .rc files and npm script for code formattting",
                    icon:
                        "https://seeklogo.com/images/P/prettier-logo-D5C5197E37-seeklogo.com.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
                defaultValue: true,
            }),
            new Primitives.ConfigurationProperty({
                identifier: "eslint",
                content: {
                    label: "Eslint",
                    description:
                        "Include ESLint .rc files and npm script for code linting",
                    icon:
                        "https://cdn.freebiesupply.com/logos/large/2x/eslint-logo-png-transparent.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
                defaultValue: true,
            }),
            new Primitives.ConfigurationProperty({
                identifier: "storybook",
                content: {
                    label: "Storybook",
                    description:
                        "Include Storybook environment and stories for all your components",
                    icon:
                        "https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
            }),
            new Primitives.ConfigurationProperty({
                identifier: "vsCodeDir",
                content: {
                    label: "Include .vscode directory",
                    description:
                        "Include a .vscode directory in the root of your project for tuning editor behavior",
                    icon:
                        "https://user-images.githubusercontent.com/674621/71187801-14e60a80-2280-11ea-94c9-e56576f76baf.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
            }),
        ],
    },
);

// // // //
// GitHub Property

const githubProperty: ConfigurationProperty = new Primitives.ConfigurationProperty(
    {
        identifier: "github",
        content: {
            label: "GitHub Settings",
            description:
                "Configure the community files included in your project",
            icon: "",
            documentation: "",
        },
        type: PropertyTypes.INSTANCE,
        layoutVariant: PropertyLayoutVariants.COL_12,
        properties: [
            new Primitives.ConfigurationProperty({
                identifier: "changelog",
                content: {
                    label: "Include CHANGELOG file",
                    description:
                        "Include a CHANGELOG.md file in the root of your project",
                    icon: "",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
            }),
            new Primitives.ConfigurationProperty({
                identifier: "codeOfConduct",
                content: {
                    label: "Include Code of Conduct",
                    description:
                        "Include a CODE_OF_CONDUCT.md file in the root of your project",
                    icon: "",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
            }),
            new Primitives.ConfigurationProperty({
                identifier: "githubDir",
                content: {
                    label: "Include .github directory",
                    description:
                        "Include a .github directory in the root of your project with issue and pull-request templates",
                    icon: "",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
            }),
        ],
    },
);

// // // //
// Library Configuration Group

const libraryConfiguration: ConfigurationGroup = new Primitives.ConfigurationGroup(
    {
        identifier: "libraryConfiguration",
        content: {
            label: "Configuration",
            description:
                "Configure the boilerplate code for your new React component library",
            icon: "",
            documentation: "",
        },
        properties: [toolingProperty, libraryMetadata, githubProperty],
    },
);

// // // //
// Export Plugin
export const ReactComponentLibraryStarterPlugin: PluginMetadata = new Primitives.Plugin(
    {
        identifier: "react-component-library-starter",
        project_path: "react-component-library-starter",
        content: {
            label: "React + TypeScript Component Library Starter",
            description: "React + TypeScript Component Library Starter",
            icon:
                "https://miro.medium.com/max/500/1*cPh7ujRIfcHAy4kW2ADGOw.png",
            documentation: pluginReadme,
        },
        configurationGroups: [libraryConfiguration],
    },
);
