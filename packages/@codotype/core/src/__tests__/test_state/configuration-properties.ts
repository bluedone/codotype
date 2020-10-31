import {
    ConfigurationGroup,
    GroupLayoutVariant,
    ConfigurationProperty,
    OptionType,
} from "../../index";
import { syntaxHighlighting } from "./documentation";
import { Primatives } from "../../primatives";

// // // //

export const gitHubApiOption: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "github",
        type: OptionType.BOOLEAN,
        defaultValue: false,
        content: {
            label: "GitHub API",
            description: "Create and update repositories with the GitHub API.",
        },
    },
);

export const twitterApiOption: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "twitter",
        type: OptionType.BOOLEAN,
        defaultValue: false,
        content: {
            label: "Twitter API",
            description: "Read Tweets and user profiles with the Twitter API.",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
        },
    },
);

export const facebookApiOption: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "facebook",
        type: OptionType.BOOLEAN,
        defaultValue: false,
        content: {
            label: "Facebook API",
            description:
                "Use the Facebook API to read user profiles - including first name, last name, gender, username, link, email, locale, and timezone.",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558930988/product-logos/facebook-icon-preview-1.png",
        },
    },
);

export const foursquareApiOption: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "foursquare",
        type: OptionType.BOOLEAN,
        defaultValue: false,
        content: {
            label: "Foursquare API",
            description:
                "Use the Foursquare API to read trending venues and user check-ins.",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558930927/product-logos/foursquare-512.png",
        },
    },
);

export const instagramApiOption: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "instagram",
        type: OptionType.BOOLEAN,
        defaultValue: false,
        content: {
            label: "Instagram API",
            description:
                "Use the Instagram API to read user profiles - including username, name, bio, avatar, and recent posts.",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558930904/product-logos/Instagram_AppIcon_Aug2017.png",
        },
    },
);

export const last_fmApiOption: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "last_fm",
        type: OptionType.BOOLEAN,
        defaultValue: true,
        content: {
            label: "Last.fm API",
            description:
                "Use the Last.fm API to query data about music artists, albums, tracks, and more.",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558930875/product-logos/last_fm-512.png",
        },
    },
);

export const linkedinApiOption: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "linkedin",
        type: OptionType.BOOLEAN,
        defaultValue: true,
        content: {
            label: "LinkedIn API",
            description:
                "Use the LinkedIn API to read user profile information - including name, profile, positions, and connections.",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558930840/product-logos/square-linkedin-512.png",
        },
    },
);

export const steamApiOption: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "steam",
        type: OptionType.BOOLEAN,
        defaultValue: false,
        content: {
            label: "Steam API",
            description:
                "Use the Steam API to read Player Summaries - including avatars, achievements and owned games.",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558930764/product-logos/steam-logo-transparent.png",
        },
    },
);

export const stripeApiOption: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "stripe",
        type: OptionType.BOOLEAN,
        defaultValue: false,
        content: {
            label: "Stripe API",
            description:
                "Use the Stripe API to collect credit card payments through your app.",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558930739/product-logos/twitter.png",
        },
    },
);

export const paypalApiOption: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "paypal",
        type: OptionType.BOOLEAN,
        defaultValue: false,
        content: {
            label: "PayPal API",
            description:
                "Use the PayPal API to authorize and collect payments through your app.",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558930714/product-logos/paypal-logo.png",
        },
    },
);

export const twilioApiOption: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "twilio",
        type: OptionType.BOOLEAN,
        defaultValue: false,
        content: {
            label: "Twilio API",
            description:
                "Use the Twilio API to send text messages from your app - requires Twilio App ID and API token.",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558930682/product-logos/twilio.svg",
        },
    },
);

export const tumblrApiOption: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "tumblr",
        type: OptionType.BOOLEAN,
        defaultValue: false,
        content: {
            label: "Tumblr API",
            description:
                "Use the Tumblr API with Tumblr.js to read and write content to Tumblr blogs.",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558930402/product-logos/tumblr-icon-logo-png-transparent.png",
        },
    },
);

export const web_scrapingApiOption: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "web_scraping",
        type: OptionType.BOOLEAN,
        defaultValue: false,
        content: {
            label: "Web Scraping API",
            description:
                "Include code for scraping websites using Cheerio.js - a fast, flexible, and lean implementation of core jQuery designed specifically for the server.",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558930643/product-logos/google-chrome-1326908_960_720.png",
        },
    },
);

export const clockwork_smsApiOption: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "clockwork_sms",
        type: OptionType.BOOLEAN,
        defaultValue: false,
        content: {
            label: "Clockwork SMS API",
            description:
                "Use the Clockwork SMS API to send and receive SMS through your app.",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558930520/product-logos/clockwork-sms.png",
        },
    },
);

export const aviaryApiOption: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "aviary",
        type: OptionType.BOOLEAN,
        defaultValue: false,
        content: {
            label: "Aviary API",
            description:
                "Use the Aviary API to programatically edit and save images.",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558930486/product-logos/96px-Aviary_Logo.png",
        },
    },
);

export const lobApiOption: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "lob",
        type: OptionType.BOOLEAN,
        defaultValue: false,
        content: {
            label: "Lob API",
            description:
                "Use Lob's API for USPS-certified address verification and to programmatically send personalized postcards and letters.",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558928124/product-logos/lob-logo.png",
        },
    },
);

export const pinterestApiOption: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "pinterest",
        type: OptionType.BOOLEAN,
        defaultValue: false,
        content: {
            label: "Pinterest API",
            description: "Use the Pinterest API",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558928786/product-logos/Pinterest-logo-circle.png",
        },
    },
);

export const google_mapsApiOption: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "google_maps",
        type: OptionType.BOOLEAN,
        defaultValue: false,
        content: {
            label: "Google Maps API",
            description:
                "Use the Google Maps API to place markers on a map widget inside your app.",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558928683/product-logos/1011px-GoogleMaps_logo.svg.png",
        },
    },
);

export const chartjsApiOption: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "chartjs",
        type: OptionType.BOOLEAN,
        defaultValue: false,
        content: {
            label: "Chart.js + Alpha Vantage",
            description:
                "Include Chart.js visualization with realtime and historical stock data and cryptocurrency feeds through Alpha Vantage",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558928549/product-logos/chartjs-logo.svg",
        },
    },
);

// // // //

export const ComponentBuilderConfigurationProperty: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "components",
        type: OptionType.COLLECTION,
        defaultValue: [],
        required: false,
        allowDisable: false,
        content: {
            label: "Component",
            description: "Define the component data",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
        },
        properties: [
            new Primatives.ConfigurationProperty({
                identifier: "componentName",
                type: OptionType.STRING,
                defaultValue: "",
                content: {
                    label: "Component Name",
                    description: "Name of the component",
                },
            }),
            new Primatives.ConfigurationProperty({
                identifier: "componentSlug",
                type: OptionType.STRING,
                defaultValue: "",
                content: {
                    label: "Component Slug",
                    description: "Slug of the component",
                },
            }),
            new Primatives.ConfigurationProperty({
                identifier: "props",
                dropdownOptions: [],
                type: OptionType.COLLECTION,
                defaultValue: "",
                content: {
                    label: "Props",
                    description: "",
                },
                properties: [
                    new Primatives.ConfigurationProperty({
                        identifier: "type",
                        type: OptionType.DROPDOWN,
                        defaultValue: "",
                        dropdownOptions: [{ label: "String", value: "string" }],
                        content: {
                            label: "Type",
                            description: "",
                        },
                    }),
                    new Primatives.ConfigurationProperty({
                        identifier: "name",
                        type: OptionType.STRING,
                        defaultValue: "",
                        content: {
                            label: "Name",
                            description: "",
                        },
                    }),
                    new Primatives.ConfigurationProperty({
                        identifier: "desc",
                        type: OptionType.STRING,
                        defaultValue: "",
                        content: {
                            label: "Desc",
                            description: "",
                        },
                    }),
                ],
            }),
            new Primatives.ConfigurationProperty({
                identifier: "tests",
                type: OptionType.INSTANCE,
                // enabledByDefault: true,
                defaultValue: "",
                required: false,
                allowDisable: true,
                dropdownOptions: [],
                content: {
                    label: "Tests",
                    description: "",
                    icon: "",
                },
                properties: [
                    new Primatives.ConfigurationProperty({
                        identifier: "testType",
                        type: OptionType.DROPDOWN,
                        defaultValue: "",
                        dropdownOptions: [
                            { value: "table", label: "Table Test" },
                            { value: "snapshot", label: "Snapshot Test" },
                        ],
                        content: {
                            label: "Test Type",
                            description: "",
                        },
                    }),
                ],
            }),
        ],
    },
);

export const ComponentBuilderConfigurationPropertySingleText: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "componentName",
        type: OptionType.STRING,
        defaultValue: "",
        // enabledByDefault: true,
        required: false,
        allowDisable: false,
        content: {
            label: "Component Name",
            description: "Name of the component",
            icon: "",
        },
    },
);

export const ComponentBuilderConfigurationPropertySingleDropdown: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "dropdownTest",
        type: OptionType.DROPDOWN,
        defaultValue: "",
        dropdownOptions: [
            {
                value: "OPTION_01",
                label: "One",
            },
            { value: "OPTION_02", label: "Two" },
        ],
        content: {
            label: "Dropdown Test",
            description: "Dropdown Testing",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
        },
    },
);

export const ComponentBuilderConfigurationPropertySingleNumber: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "numberTest",
        type: OptionType.NUMBER,
        defaultValue: "",
        dropdownOptions: [],
        content: {
            label: "Number Test",
            description:
                "This is a number for testing. Don't overthink it. It's just a number. I'll should pull some configuration options from an existing generator to populate this placeholder.",
        },
    },
);

export const ComponentBuilderConfigurationPropertyWithInstance01: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "random_instance",
        type: OptionType.INSTANCE,
        defaultValue: "",
        // enabledByDefault: true,
        required: false,
        allowDisable: true,
        dropdownOptions: [],
        properties: [ComponentBuilderConfigurationPropertySingleDropdown],
        content: {
            label: "RandomInstanceTest",
            description: "",
        },
    },
);

export const ComponentBuilderConfigurationPropertyWithInstance: ConfigurationProperty = new Primatives.ConfigurationProperty(
    {
        identifier: "tests",
        content: {
            label: "Tests",
            description: "",
            icon:
                "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
        },
        type: OptionType.INSTANCE,
        defaultValue: "",
        // enabledByDefault: true,
        required: false,
        allowDisable: true,
        properties: [
            ComponentBuilderConfigurationPropertySingleDropdown,
            ComponentBuilderConfigurationPropertySingleText,
            new Primatives.ConfigurationProperty({
                identifier: "nested_instance",
                type: OptionType.INSTANCE,
                defaultValue: "",
                content: {
                    label: "Nested Instance",
                    description: "",
                },
                properties: [
                    ComponentBuilderConfigurationPropertySingleText,
                    ComponentBuilderConfigurationPropertySingleDropdown,
                    ComponentBuilderConfigurationPropertyWithInstance01,
                ],
            }),
        ],
    },
);

export const ComponentBuilderConfigurationGroup: ConfigurationGroup = {
    identifier: "components_group",
    enabledByDefault: true,
    allowDisable: false,
    layoutVariant: GroupLayoutVariant.LIST,
    sections: [],
    content: {
        label: "Component Generator",
        description: "Generate React components",
        documentation: "Generate React components",
        icon: "",
    },
    properties: [
        ComponentBuilderConfigurationPropertySingleText,
        ComponentBuilderConfigurationPropertySingleNumber,
        ComponentBuilderConfigurationPropertySingleDropdown,
        ComponentBuilderConfigurationPropertyWithInstance,
        // ComponentBuilderConfigurationProperty,
    ],
};

export const ApiExamplesConfigurationGroup: ConfigurationGroup = {
    identifier: "api_examples",
    enabledByDefault: true,
    allowDisable: false,
    layoutVariant: GroupLayoutVariant.LIST,
    sections: [],
    content: {
        label: "API Examples",
        description: "Configurate API examples for the Application",
        documentation: syntaxHighlighting,
        icon: "",
    },
    properties: [
        gitHubApiOption,
        twitterApiOption,
        facebookApiOption,
        foursquareApiOption,
        instagramApiOption,
        last_fmApiOption,
        linkedinApiOption,
        steamApiOption,
        stripeApiOption,
        paypalApiOption,
        twilioApiOption,
        tumblrApiOption,
        web_scrapingApiOption,
        clockwork_smsApiOption,
        aviaryApiOption,
        lobApiOption,
        pinterestApiOption,
        google_mapsApiOption,
        chartjsApiOption,
    ],
};

export const SideBySideConfigurationGroup: ConfigurationGroup = {
    ...ComponentBuilderConfigurationGroup,
    identifier: "component_builder_side_by_side",
    content: {
        ...ComponentBuilderConfigurationGroup.content,
        label: "Architecture Configuration",
        description: "Configure the server architecture of your application",
        documentation: syntaxHighlighting,
    },
    layoutVariant: GroupLayoutVariant.DOCS_3x9,
    properties: [twitterApiOption],
};
