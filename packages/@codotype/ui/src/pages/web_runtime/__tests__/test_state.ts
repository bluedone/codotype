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
                    icon:
                        "https://cdn.iconscout.com/icon/free/png-512/google-analytics-2038788-1721678.png",
                    // "https://res.cloudinary.com/codotype/image/upload/v1558928683/product-logos/1011px-GoogleMaps_logo.svg.png",
                    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx7Xw-HR_RZpcBRhG0ysB__H98dKc-MtctZg&usqp=CAU",
                    // "data:image/jpeg;base64,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",
                    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF7qkd3XWQ6KoRIR1V3MVq2T9iWcXy-GfGlQ&usqp=CAU",
                    // "https://www.vhv.rs/dpng/d/78-783199_icon-google-analytics-logo-png-transparent-png.png",
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
                    icon:
                        // "https://cdn1.iconfinder.com/data/icons/hawcons/32/699966-icon-1-cloud-512.png",
                        "https://cdn4.iconfinder.com/data/icons/colicon/24/cloud-512.png",
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
