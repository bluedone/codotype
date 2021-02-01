import {
    ProjectInput,
    Datatypes,
    CreatedByValues,
    PluginMetadata,
    testState,
    // makeIdentifier,
    // ATTRIBUTE_ADDON_REQUIRED,
    // ATTRIBUTE_ADDON_NULLABLE,
    // ATTRIBUTE_ADDON_PRIMARY_KEY,
    RelationTypes,
    PropertyTypes,
    Primatives,
    GroupLayoutVariants,
    PropertyLayoutVariants,
    StringPropertyTransformations,
    PropertyPreviewLayoutVariant,
    PropertyPreviewActionTypes,
    PropertyPreviewConstraintTypes,
    buildDefaultProjectInput,
    buildTokenCasing,
    buildTokenPluralization,
    buildDefaultConfiguration,
    AttributeAddon,
    AddonPropertyInlineIcons,
    ConfigurationGroup,
    ConfigurationProperty,
} from "@codotype/core";

// // // //
// React + Next + TS Website Starter

// // // //
// Landing Page
const landingPageConfigurationGroup: ConfigurationGroup = new Primatives.ConfigurationGroup(
    {
        identifier: "home",
        content: {
            label: "Landing Page",
            description: "Configure the landing page of your website",
            icon: "",
            documentation: "",
        },
        properties: [
            new Primatives.ConfigurationProperty({
                identifier: "pricingSection",
                content: {
                    label: "Pricing Section",
                    description: "Include Pricing section on your landing page",
                    icon: "",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
            new Primatives.ConfigurationProperty({
                identifier: "contactSection",
                content: {
                    label: "Contact Section",
                    description: "Include Contact section on your landing page",
                    icon: "",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
        ],
    },
);

// // // //
// Analytics
const analyticsConfigurationGroup: ConfigurationGroup = new Primatives.ConfigurationGroup(
    {
        identifier: "analytics",
        content: {
            label: "Analytics",
            description: "Configure the analytics of your website",
            icon: "",
            documentation: "",
        },
        properties: [
            new Primatives.ConfigurationProperty({
                identifier: "googleAnalytics",
                content: {
                    label: "Include Google Analytics",
                    description: "Include Google Analytics in your website",
                    icon: "",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
        ],
    },
);

// // // //
// SEO
const seoConfigurationGroup: ConfigurationGroup = new Primatives.ConfigurationGroup(
    {
        identifier: "seo",
        content: {
            label: "SEO",
            description: "Configure the SEO of your website",
            icon: "",
            documentation: "",
        },
        properties: [
            new Primatives.ConfigurationProperty({
                identifier: "jsonLD",
                content: {
                    label: "Include JSON-LD Metadata",
                    description:
                        "Include JSON-LD metadata for each of your pages",
                    icon: "",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
        ],
    },
);

// // // //
// Hosting
const hostingConfigurationGroup: ConfigurationGroup = new Primatives.ConfigurationGroup(
    {
        identifier: "hosting",
        content: {
            label: "Hosting",
            description: "Configure the hosting of your website",
            icon: "",
            documentation: "",
        },
        properties: [
            new Primatives.ConfigurationProperty({
                identifier: "platform",
                content: {
                    label: "Platform",
                    description: "How would you like to host your website?",
                    icon: "",
                    documentation: "",
                },
                type: PropertyTypes.DROPDOWN,
                defaultValue: "vercel",
                dropdownOptions: [
                    { label: "Vercel", value: "vercel" },
                    { label: "Netlify", value: "netlify" },
                    { label: "Docker", value: "docker" },
                    { label: "GitHub Pages", value: "github_pages" },
                    { label: "None", value: "none" },
                ],
            }),
        ],
    },
);

// // // //
// Export Plugin
export const NextJsWebsiteStarterPlugin: PluginMetadata = new Primatives.Plugin(
    {
        id: "react-next-ts-website-starter",
        project_path: "react-next-ts-starter",
        content: {
            label: "React + Next + TypeScript Website Starter",
            description: "React + Next + TypeScript Website Starter",
            icon: "",
            documentation: "",
        },
        configurationGroups: [
            landingPageConfigurationGroup,
            seoConfigurationGroup,
            analyticsConfigurationGroup,
            hostingConfigurationGroup,
        ],
    },
);
