import { pluginReadme } from "../../../../components/MarkdownRenderer/stories/test_state";
import {
    PluginMetadata,
    PropertyTypes,
    Primitives,
    ConfigurationGroup,
    PropertyLayoutVariants,
    GroupLayoutVariants,
} from "@codotype/core";

// // // //
// React + Next + TS Website Starter

// // // //
// Landing Page
const landingPageConfigurationGroup: ConfigurationGroup = new Primitives.ConfigurationGroup(
    {
        // identifier: "home",
        // content: {
        //     label: "Landing Page",
        //     description: "Configure the landing page of your website",
        //     icon: "",
        //     documentation: "",
        // },
        identifier: "example-properties",
        content: {
            label: "Example Properties",
            description: "Example properties supported by Codotype",
            icon: "",
            documentation: "",
        },
        layoutVariant: GroupLayoutVariants.DETAIL_4x8,
        properties: [
            new Primitives.ConfigurationProperty({
                identifier: "boolean",
                content: {
                    label: "Boolean Property",
                    description:
                        "Boolean properties can be used to turn specific features on or off",
                    icon: "",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
            }),
            new Primitives.ConfigurationProperty({
                identifier: "text",
                content: {
                    label: "Text Property",
                    description:
                        "Text properties can be used to populate string values in your boilerplate code",
                    icon: "",
                    documentation: "",
                },
                type: PropertyTypes.STRING,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
            }),
            new Primitives.ConfigurationProperty({
                identifier: "number",
                content: {
                    label: "Number Property",
                    description:
                        "Number properties can be used to populate numeric values in your boilerplate code",
                    icon: "",
                    documentation: "",
                },
                type: PropertyTypes.NUMBER,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
            }),
            new Primitives.ConfigurationProperty({
                identifier: "dropdown",
                content: {
                    label: "Dropdown Property",
                    description:
                        "Dropdown properties can be used to select predefined values to change your boilerplate code",
                    icon: "",
                    documentation: "",
                },
                type: PropertyTypes.DROPDOWN,
                selectOptions: [{ value: "one", label: "One" }],
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
            }),

            new Primitives.ConfigurationProperty({
                identifier: "radio_group",
                content: {
                    label: "Radio Group Property",
                    description: "Radio Group properties behave like Dropdowns",
                    icon:
                        // "https://cdn1.iconfinder.com/data/icons/hawcons/32/699966-icon-1-cloud-512.png",
                        "https://cdn4.iconfinder.com/data/icons/colicon/24/cloud-512.png",
                    documentation: "",
                },
                type: PropertyTypes.RADIO_GROUP,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
                defaultValue: "vercel",
                selectOptions: [
                    {
                        label: "Vercel",
                        value: "vercel",
                        description: "This is the vercel description",
                        documentation: "",
                        icon:
                            "https://assets.pipedream.net/s.v0/app_1xohRm/logo/orig",
                    },
                    {
                        label: "Netlify",
                        value: "netlify",
                        description: "This is the netlify description",
                        documentation: "",
                        icon:
                            "https://www.netlify.com/img/press/logos/logomark.png",
                    },
                    {
                        label: "GitHub Pages",
                        value: "github_pages",
                        description: "This is the github_pages description",
                        documentation: "",
                        icon:
                            "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
                    },
                    {
                        label: "None",
                        value: "none",
                        description: "This is the none description",
                        documentation: "",
                        icon: "",
                    },
                ],
            }),

            new Primitives.ConfigurationProperty({
                identifier: "instance",
                content: {
                    label: "Instance",
                    description:
                        "Instance properties can be used define nested key / value configuration",
                    icon: "",
                    documentation: "",
                },
                type: PropertyTypes.INSTANCE,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
                properties: [
                    new Primitives.ConfigurationProperty({
                        identifier: "text",
                        content: {
                            label: "Text Property",
                            description:
                                "Text properties can be used to populate string values in your boilerplate code",
                            icon: "",
                            documentation: "",
                        },
                        type: PropertyTypes.STRING,
                    }),
                    new Primitives.ConfigurationProperty({
                        identifier: "boolean",
                        content: {
                            label: "Boolean Property",
                            description:
                                "Boolean properties can be used to turn specific features on or off",
                            icon: "",
                            documentation: "",
                        },
                        type: PropertyTypes.BOOLEAN,
                    }),
                ],
            }),
            new Primitives.ConfigurationProperty({
                identifier: "collection",
                content: {
                    label: "Collection",
                    description:
                        "Collection properties can be used define an array of nested key / value objects",
                    icon: "",
                    documentation: "",
                },
                type: PropertyTypes.COLLECTION,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
                properties: [
                    new Primitives.ConfigurationProperty({
                        identifier: "text",
                        content: {
                            label: "Text Property",
                            description:
                                "Text properties can be used to populate string values in your boilerplate code",
                            icon: "",
                            documentation: "",
                        },
                        type: PropertyTypes.STRING,
                    }),
                ],
            }),
        ],
    },
);

// // // //
// Analytics
const analyticsConfigurationGroup: ConfigurationGroup = new Primitives.ConfigurationGroup(
    {
        identifier: "analytics",
        content: {
            label: "Analytics",
            description: "Configure the analytics of your website",
            icon: "",
            documentation: "https://www.github.com/codotype",
        },
        properties: [
            new Primitives.ConfigurationProperty({
                identifier: "googleAnalytics",
                content: {
                    label: "Include Google Analytics",
                    description: "Include Google Analytics in your website",
                    icon:
                        "https://cdn.iconscout.com/icon/free/png-512/google-analytics-2038788-1721678.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
            new Primitives.ConfigurationProperty({
                identifier: "hotjar",
                content: {
                    label: "Hotjar Analytics",
                    description: "Include Hotjar Analytics in your website",
                    icon:
                        "https://cdn2.hubspot.net/hubfs/2069462/Hotjar_Flame-1-1.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
        ],
    },
);

// // // //
// Tooling
const toolingConfigurationGroup: ConfigurationGroup = new Primitives.ConfigurationGroup(
    {
        identifier: "tooling",
        content: {
            label: "Tooling",
            description: "Configure the tooling of your codebase",
            icon: "",
            documentation: "",
        },
        properties: [
            new Primitives.ConfigurationProperty({
                identifier: "jest",
                content: {
                    label: "Include Jest",
                    description:
                        "Include Jest environment and snapshot tests for all your components",
                    icon:
                        "https://seeklogo.com/images/J/jest-logo-F9901EBBF7-seeklogo.com.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
            new Primitives.ConfigurationProperty({
                identifier: "prettier",
                content: {
                    label: "Include Prettier",
                    description:
                        "Include Prettier .rc files and npm script for code formattting",
                    icon:
                        "https://seeklogo.com/images/P/prettier-logo-D5C5197E37-seeklogo.com.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
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
                defaultValue: true,
            }),
            new Primitives.ConfigurationProperty({
                identifier: "storybook",
                content: {
                    label: "Include Storybook",
                    description:
                        "Include Storybook environment and stories for all your components",
                    icon:
                        "https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
        ],
    },
);

// // // //
// SEO
const seoConfigurationGroup: ConfigurationGroup = new Primitives.ConfigurationGroup(
    {
        identifier: "seo",
        content: {
            label: "SEO",
            description: "Configure the SEO of your website",
            icon: "",
            documentation: "",
        },
        properties: [
            new Primitives.ConfigurationProperty({
                identifier: "twitter",
                content: {
                    label: "Twitter",
                    description:
                        "Include meta tags linking your website to a Twitter handle",
                    icon:
                        "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
            new Primitives.ConfigurationProperty({
                identifier: "opengraph",
                content: {
                    label: "OpenGraph",
                    description:
                        "Include OpenGraph meta tags for pretty previews when sharing your site on social media",
                    icon: "https://ogp.me/logo.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
            new Primitives.ConfigurationProperty({
                identifier: "sitemap",
                content: {
                    label: "Sitemap",
                    description:
                        "Include dynamic sitemap with your exported code",
                    // icon: "https://blog.atj.me/assets/sitemap.png",
                    icon:
                        "https://i.pinimg.com/originals/8e/d4/21/8ed42172785c5f144d5df49998c00cd7.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
            new Primitives.ConfigurationProperty({
                identifier: "jsonLD",
                content: {
                    label: "Include JSON-LD Metadata",
                    description:
                        "Include JSON-LD metadata for each of your pages",
                    icon:
                        // "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/JSON_vector_logo.svg/1200px-JSON_vector_logo.svg.png",
                        // "https://www.innocreate.com/wp-content/uploads/2017/07/jsonlogo-300x300.png",
                        "https://dinacon.ch/wp-content/uploads/sites/4/2018/05/rdf-icon-with-shadow.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
        ],
    },
);

// // // //
// Hosting
const hostingConfigurationGroup: ConfigurationGroup = new Primitives.ConfigurationGroup(
    {
        identifier: "hosting",
        content: {
            label: "Hosting",
            description: "Configure the hosting of your website",
            icon: "",
            documentation: `
### Note
- This will prevent you from using your app until you setup an API key to authenticate with Google and assign it to its corresponding environment variable in the \`env.local\` file included in the codebase.

- [Setup Google API Key](https://google.com)

- [Setup Microsoft API Key](https://google.com)

- [Setup Apple API Key](https://google.com)

- [Setup Slack API Key](https://google.com)

- [Setup GitHub API Key](https://google.com)

`,
        },
        layoutVariant: GroupLayoutVariants.DOCS_6x6,
        properties: [
            new Primitives.ConfigurationProperty({
                identifier: "platform",
                content: {
                    label: "Platform",
                    description: "How would you like to host your website?",
                    icon:
                        // "https://cdn1.iconfinder.com/data/icons/hawcons/32/699966-icon-1-cloud-512.png",
                        "https://cdn4.iconfinder.com/data/icons/colicon/24/cloud-512.png",
                    documentation: "",
                },
                type: PropertyTypes.DROPDOWN,
                // type: PropertyTypes.RADIO_GROUP,
                layoutVariant: PropertyLayoutVariants.CARD_COL_12,
                defaultValue: "vercel",
                selectOptions: [
                    {
                        label: "Vercel",
                        value: "vercel",
                        description: "This is the vercel description",
                        documentation: "",
                        icon:
                            "https://assets.pipedream.net/s.v0/app_1xohRm/logo/orig",
                    },
                    {
                        label: "Netlify",
                        value: "netlify",
                        description: "This is the netlify description",
                        documentation: "",
                        icon:
                            "https://www.netlify.com/img/press/logos/logomark.png",
                    },
                    {
                        label: "GitHub Pages",
                        value: "github_pages",
                        description: "This is the github_pages description",
                        documentation: "",
                        icon:
                            "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
                    },
                    {
                        label: "None",
                        value: "none",
                        description: "This is the none description",
                        documentation: "",
                        icon: "",
                    },
                ],
            }),
        ],
    },
);

// // // //
// Export Plugin
export const NextJsWebsiteStarterPlugin: PluginMetadata = new Primitives.Plugin(
    {
        identifier: "react-next-ts-website-starter",
        project_path: "react-next-ts-starter",
        content: {
            label: "React + Next + TypeScript Starter",
            description:
                "Website starter kit built with React.js, Next.js, TypeScript, TailwindCSS, and Storybook",
            icon:
                "https://miro.medium.com/max/500/1*cPh7ujRIfcHAy4kW2ADGOw.png",
            documentation: pluginReadme,
        },
        configurationGroups: [
            // landingPageConfigurationGroup,
            toolingConfigurationGroup,
            seoConfigurationGroup,
            analyticsConfigurationGroup,
            hostingConfigurationGroup,
        ],
    },
);

// // // //
// Export alternative variation of same plugin using grouped properties

const toolingProperty = new Primitives.ConfigurationProperty({
    identifier: "tooling",
    content: {
        label: "Tooling",
        description: "What tooling would you like to use?",
        icon: "",
        documentation: "",
    },
    type: PropertyTypes.INSTANCE,
    layoutVariant: PropertyLayoutVariants.COL_12,
    defaultValue: {},
    selectOptions: [],
    properties: [
        ...toolingConfigurationGroup.properties.map(p => {
            return {
                ...p,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
            };
        }),
    ],
});

const analyticsProperty = new Primitives.ConfigurationProperty({
    identifier: "analytics",
    content: {
        label: "Analytics",
        description: "Which SEO features would you like?",
        icon: "",
        documentation: "",
    },
    type: PropertyTypes.INSTANCE,
    layoutVariant: PropertyLayoutVariants.COL_12,
    defaultValue: {},
    selectOptions: [],
    properties: [
        ...analyticsConfigurationGroup.properties.map(p => {
            return {
                ...p,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
            };
        }),
    ],
});

const seoProperty = new Primitives.ConfigurationProperty({
    identifier: "seo",
    content: {
        label: "SEO",
        description: "Which SEO features would you like?",
        icon: "",
        documentation: "",
    },
    type: PropertyTypes.INSTANCE,
    layoutVariant: PropertyLayoutVariants.COL_12,
    defaultValue: {},
    selectOptions: [],
    properties: [
        ...seoConfigurationGroup.properties.map(p => {
            return {
                ...p,
                layoutVariant: PropertyLayoutVariants.CARD_COL_6,
            };
        }),
    ],
});

const hostingProperty = new Primitives.ConfigurationProperty({
    identifier: "hosting",
    content: {
        label: "Hosting",
        description: "What hosting would you like to use?",
        icon: "",
        documentation: "",
    },
    type: PropertyTypes.INSTANCE,
    layoutVariant: PropertyLayoutVariants.COL_12,
    defaultValue: {},
    selectOptions: [],
    properties: [
        ...hostingConfigurationGroup.properties.map(p => {
            return {
                ...p,
                layoutVariant: PropertyLayoutVariants.CARD_COL_12,
            };
        }),
    ],
});

// Other properties:
// - Marketing - Mailchip
// - Customer Engagement - Intercom
// - Customer Engagement - Segment (Customer Data Platform)
// - Analytics - Fullstory
export const proConfigurationGroup: ConfigurationGroup = new Primitives.ConfigurationGroup(
    {
        identifier: "pro",
        content: {
            label: "Upgrade to Pro",
            description: "Unlock new features with our premium offering",
            icon: "",
            documentation: `
![Upgrade to Pro](https://camo.githubusercontent.com/e735a3acc1db419090b889d35a4e004fc6245f5245fbda199adc325e39b88bec/68747470733a2f2f692e696d6775722e636f6d2f444c586c64726e2e706e67)
            `,
        },
        properties: [],
        layoutVariant: GroupLayoutVariants.DOCS,
    },
);

export const NextJsWebsiteStarterPluginVariant: PluginMetadata = new Primitives.Plugin(
    {
        identifier: "react-next-ts-website-starter-variant",
        project_path: "react-next-ts-starter",
        content: {
            label: "React + Next + TypeScript Starter",
            description:
                "Website starter kit built with React.js, Next.js, TypeScript, TailwindCSS, and Storybook",
            icon:
                "https://miro.medium.com/max/500/1*cPh7ujRIfcHAy4kW2ADGOw.png",
            documentation: pluginReadme,
        },
        configurationGroups: [
            {
                ...toolingConfigurationGroup,
                identifier: "configure",
                content: {
                    label: "Configure",
                    description: "Configure your boilerplate code",
                    icon: "",
                    documentation: "",
                },
                properties: [
                    toolingProperty,
                    analyticsProperty,
                    seoProperty,
                    hostingProperty,
                ],
            },
            landingPageConfigurationGroup,
            proConfigurationGroup,
        ],
    },
);
