import {
    ConfigurationGroup,
    GroupLayoutVariant,
    ConfigurationGroupProperty,
    PropertyLayoutVariant,
    OptionType,
} from "../../index";
import { syntaxHighlighting } from "./documentation";
import { DataPreviewLayoutVariant } from "../../data-preview";

// // // //

export const BASE_CONFIGURATION_GROUP_PROPERTY: ConfigurationGroupProperty = {
    label: "BASE_PROPERTY",
    identifier: "BASE_PROPERTY",
    type: OptionType.STRING,
    description: "",
    documentation: "",
    layoutVariant: PropertyLayoutVariant.COL_12,
    defaultValue: false,
    icon: "",
    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    filters: [],
    validations: [],
    dataPreview: {
        rules: [],
        variant: DataPreviewLayoutVariant.CODE_DARK,
    },
};

export const gitHubApiOption: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "GitHub API",
    identifier: "github",
    type: OptionType.BOOLEAN,
    description: "Create and update repositories with the GitHub API.",
    defaultValue: false,
    icon: "",
    dropdownOptions: [],
};

export const twitterApiOption: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Twitter API",
    identifier: "twitter",
    type: OptionType.BOOLEAN,
    description: "Read Tweets and user profiles with the Twitter API.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",

    dropdownOptions: [],
};

export const facebookApiOption: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Facebook API",
    identifier: "facebook",
    type: OptionType.BOOLEAN,
    description:
        "Use the Facebook API to read user profiles - including first name, last name, gender, username, link, email, locale, and timezone.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930988/product-logos/facebook-icon-preview-1.png",

    dropdownOptions: [],
};

export const foursquareApiOption: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Foursquare API",
    identifier: "foursquare",
    type: OptionType.BOOLEAN,
    description:
        "Use the Foursquare API to read trending venues and user check-ins.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930927/product-logos/foursquare-512.png",

    dropdownOptions: [],
};

export const instagramApiOption: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Instagram API",
    identifier: "instagram",
    type: OptionType.BOOLEAN,
    description:
        "Use the Instagram API to read user profiles - including username, name, bio, avatar, and recent posts.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930904/product-logos/Instagram_AppIcon_Aug2017.png",

    dropdownOptions: [],
};

export const last_fmApiOption: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Last.fm API",
    identifier: "last_fm",
    type: OptionType.BOOLEAN,
    description:
        "Use the Last.fm API to query data about music artists, albums, tracks, and more.",
    defaultValue: true,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930875/product-logos/last_fm-512.png",

    dropdownOptions: [],
};

export const linkedinApiOption: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "LinkedIn API",
    identifier: "linkedin",
    type: OptionType.BOOLEAN,
    description:
        "Use the LinkedIn API to read user profile information - including name, profile, positions, and connections.",
    defaultValue: true,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930840/product-logos/square-linkedin-512.png",

    dropdownOptions: [],
};

export const steamApiOption: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Steam API",
    identifier: "steam",
    type: OptionType.BOOLEAN,
    description:
        "Use the Steam API to read Player Summaries - including avatars, achievements and owned games.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930764/product-logos/steam-logo-transparent.png",

    dropdownOptions: [],
};

export const stripeApiOption: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Stripe API",
    identifier: "stripe",
    type: OptionType.BOOLEAN,
    description:
        "Use the Stripe API to collect credit card payments through your app.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930739/product-logos/twitter.png",

    dropdownOptions: [],
};

export const paypalApiOption: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "PayPal API",
    identifier: "paypal",
    type: OptionType.BOOLEAN,
    description:
        "Use the PayPal API to authorize and collect payments through your app.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930714/product-logos/paypal-logo.png",

    dropdownOptions: [],
};

export const twilioApiOption: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Twilio API",
    identifier: "twilio",
    type: OptionType.BOOLEAN,
    description:
        "Use the Twilio API to send text messages from your app - requires Twilio App ID and API token.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930682/product-logos/twilio.svg",

    dropdownOptions: [],
};

export const tumblrApiOption: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Tumblr API",
    identifier: "tumblr",
    type: OptionType.BOOLEAN,
    description:
        "Use the Tumblr API with Tumblr.js to read and write content to Tumblr blogs.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930402/product-logos/tumblr-icon-logo-png-transparent.png",

    dropdownOptions: [],
};

export const web_scrapingApiOption: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Web Scraping API",
    identifier: "web_scraping",
    type: OptionType.BOOLEAN,
    description:
        "Include code for scraping websites using Cheerio.js - a fast, flexible, and lean implementation of core jQuery designed specifically for the server.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930643/product-logos/google-chrome-1326908_960_720.png",

    dropdownOptions: [],
};

export const clockwork_smsApiOption: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Clockwork SMS API",
    identifier: "clockwork_sms",
    type: OptionType.BOOLEAN,
    description:
        "Use the Clockwork SMS API to send and receive SMS through your app.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930520/product-logos/clockwork-sms.png",

    dropdownOptions: [],
};

export const aviaryApiOption: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Aviary API",
    identifier: "aviary",
    type: OptionType.BOOLEAN,
    description: "Use the Aviary API to programatically edit and save images.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930486/product-logos/96px-Aviary_Logo.png",

    dropdownOptions: [],
};

export const lobApiOption: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Lob API",
    identifier: "lob",
    type: OptionType.BOOLEAN,
    description:
        "Use Lob's API for USPS-certified address verification and to programmatically send personalized postcards and letters.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558928124/product-logos/lob-logo.png",

    dropdownOptions: [],
};

export const pinterestApiOption: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Pinterest API",
    identifier: "pinterest",
    type: OptionType.BOOLEAN,
    description: "Use the Pinterest API to TODO TODO",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558928786/product-logos/Pinterest-logo-circle.png",

    dropdownOptions: [],
};

export const google_mapsApiOption: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Google Maps API",
    identifier: "google_maps",
    type: OptionType.BOOLEAN,
    description:
        "Use the Google Maps API to place markers on a map widget inside your app.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558928683/product-logos/1011px-GoogleMaps_logo.svg.png",

    dropdownOptions: [],
};

export const chartjsApiOption: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Chart.js + Alpha Vantage",
    identifier: "chartjs",
    type: OptionType.BOOLEAN,
    description:
        "Include Chart.js visualization with realtime and historical stock data and cryptocurrency feeds through Alpha Vantage",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558928549/product-logos/chartjs-logo.svg",

    dropdownOptions: [],
};

// // // //

export const ComponentBuilderConfigurationGroupProperty: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Component",
    identifier: "components",
    description: "Define the component data",
    type: OptionType.COLLECTION,
    defaultValue: [],
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
    enabled: true,
    required: false,
    allowDisable: false,
    properties: [
        {
            ...BASE_CONFIGURATION_GROUP_PROPERTY,
            label: "Component Name",
            identifier: "componentName",
            description: "Name of the component",
            type: OptionType.STRING,
            defaultValue: "",
        },
        {
            ...BASE_CONFIGURATION_GROUP_PROPERTY,
            label: "Component Slug",
            identifier: "componentSlug",
            description: "Slug of the component",
            type: OptionType.STRING,
            defaultValue: "",
        },
        {
            ...BASE_CONFIGURATION_GROUP_PROPERTY,
            label: "Props",
            identifier: "props",
            description: "",
            dropdownOptions: [],
            type: OptionType.COLLECTION,
            defaultValue: "",
            properties: [
                {
                    ...BASE_CONFIGURATION_GROUP_PROPERTY,
                    label: "Type",
                    identifier: "type",
                    description: "",
                    type: OptionType.DROPDOWN,
                    defaultValue: "",
                    dropdownOptions: [{ label: "String", value: "string" }],
                },
                {
                    ...BASE_CONFIGURATION_GROUP_PROPERTY,
                    label: "Name",
                    identifier: "name",
                    description: "",
                    type: OptionType.STRING,
                    defaultValue: "",
                },
                {
                    ...BASE_CONFIGURATION_GROUP_PROPERTY,
                    label: "Desc",
                    identifier: "desc",
                    description: "",
                    type: OptionType.STRING,
                    defaultValue: "",
                },
            ],
        },
        {
            ...BASE_CONFIGURATION_GROUP_PROPERTY,
            label: "Tests",
            identifier: "tests",
            description: "",
            type: OptionType.INSTANCE,
            defaultValue: "",
            icon: "",
            enabled: true,
            required: false,
            allowDisable: true,
            dropdownOptions: [],
            properties: [
                {
                    ...BASE_CONFIGURATION_GROUP_PROPERTY,
                    label: "Test Type",
                    identifier: "testType",
                    description: "",
                    type: OptionType.DROPDOWN,
                    defaultValue: "",
                    dropdownOptions: [
                        { value: "table", label: "Table Test" },
                        { value: "snapshot", label: "Snapshot Test" },
                    ],
                },
            ],
        },
    ],
};

export const ComponentBuilderConfigurationGroupPropertySingleText: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Component Name",
    identifier: "componentName",
    description: "Name of the component",
    type: OptionType.STRING,
    defaultValue: "",
    icon: "",
    enabled: true,
    required: false,
    allowDisable: false,
};

export const ComponentBuilderConfigurationGroupPropertySingleDropdown: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Dropdown Test",
    identifier: "dropdownTest",
    description: "Dropdown Testing",
    type: OptionType.DROPDOWN,
    defaultValue: "",
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
    dropdownOptions: [
        {
            value: "OPTION_01",
            label: "One",
        },
        { value: "OPTION_02", label: "Two" },
    ],
};

export const ComponentBuilderConfigurationGroupPropertySingleNumber: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Number Test",
    identifier: "numberTest",
    description:
        "This is a number for testing. Don't overthink it. It's just a number. I'll should pull some configuration options from an existing generator to populate this placeholder.",
    type: OptionType.NUMBER,
    defaultValue: "",
    icon: "",
    dropdownOptions: [],
};

export const ComponentBuilderConfigurationGroupPropertyWithInstance01: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "RandomInstanceTest",
    identifier: "random_instance",
    description: "",
    type: OptionType.INSTANCE,
    defaultValue: "",
    icon: "",
    enabled: true,
    required: false,
    allowDisable: true,
    dropdownOptions: [],
    properties: [ComponentBuilderConfigurationGroupPropertySingleDropdown],
};

export const ComponentBuilderConfigurationGroupPropertyWithInstance: ConfigurationGroupProperty = {
    ...BASE_CONFIGURATION_GROUP_PROPERTY,
    label: "Tests",
    identifier: "tests",
    description: "",
    type: OptionType.INSTANCE,
    defaultValue: "",
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
    enabled: true,
    required: false,
    allowDisable: true,
    properties: [
        ComponentBuilderConfigurationGroupPropertySingleDropdown,
        ComponentBuilderConfigurationGroupPropertySingleText,
        {
            ...BASE_CONFIGURATION_GROUP_PROPERTY,
            label: "Nested Instance",
            identifier: "nested_instance",
            description: "",
            type: OptionType.INSTANCE,
            defaultValue: "",
            properties: [
                ComponentBuilderConfigurationGroupPropertySingleText,
                ComponentBuilderConfigurationGroupPropertySingleDropdown,
                ComponentBuilderConfigurationGroupPropertyWithInstance01,
            ],
        },
    ],
};

export const ComponentBuilderConfigurationGroup: ConfigurationGroup = {
    label: "Component Generator",
    identifier: "components_group",
    description: "Generate React components",
    documentation: "Generate React components",
    enabled: true,
    allowDisable: false,
    layoutVariant: GroupLayoutVariant.LIST,
    sections: [],
    properties: [
        ComponentBuilderConfigurationGroupPropertySingleText,
        ComponentBuilderConfigurationGroupPropertySingleNumber,
        ComponentBuilderConfigurationGroupPropertySingleDropdown,
        ComponentBuilderConfigurationGroupPropertyWithInstance,
        // ComponentBuilderConfigurationGroupProperty,
    ],
};

export const ApiExamplesConfigurationGroup: ConfigurationGroup = {
    label: "API Examples",
    identifier: "api_examples",
    description: "Configurate API examples for the Application",
    documentation: syntaxHighlighting,
    enabled: true,
    allowDisable: false,
    layoutVariant: GroupLayoutVariant.LIST,
    sections: [],
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
    label: "Architecture Configuration",
    identifier: "component_builder_side_by_side",
    layoutVariant: GroupLayoutVariant.DOCS_3x9,
    description: "Configure the server architecture of your application",
    documentation: syntaxHighlighting,
    properties: [twitterApiOption],
};
