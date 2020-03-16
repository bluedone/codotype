import {
    OptionType,
    ConfigurationGroupProperty,
    ExperienceRecommendation,
    GeneratorMeta,
} from "../../types";
import { ComponentBuilderConfigurationGroup } from "../../configuration_group_input/__tests__/test_state";

// // // //

export const gitHubApiOption: ConfigurationGroupProperty = {
    label: "GitHub API",
    identifier: "github",
    type: OptionType.BOOLEAN,
    description: "Create and update repositories with the GitHub API.",
    defaultValue: false,
    icon: "",
    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "https://codotype.io",
};

export const twitterApiOption: ConfigurationGroupProperty = {
    label: "Twitter API",
    identifier: "twitter",
    type: OptionType.BOOLEAN,
    description: "Read Tweets and user profiles with the Twitter API.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",

    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "https://dev.twitter.com/rest/public",
};

export const facebookApiOption: ConfigurationGroupProperty = {
    label: "Facebook API",
    identifier: "facebook",
    type: OptionType.BOOLEAN,
    description:
        "Use the Facebook API to read user profiles - including first name, last name, gender, username, link, email, locale, and timezone.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930988/product-logos/facebook-icon-preview-1.png",

    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "https://codotype.io",
};

export const foursquareApiOption: ConfigurationGroupProperty = {
    label: "Foursquare API",
    identifier: "foursquare",
    type: OptionType.BOOLEAN,
    description:
        "Use the Foursquare API to read trending venues and user check-ins.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930927/product-logos/foursquare-512.png",

    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "https://developer.foursquare.com/docs/",
};

export const instagramApiOption: ConfigurationGroupProperty = {
    label: "Instagram API",
    identifier: "instagram",
    type: OptionType.BOOLEAN,
    description:
        "Use the Instagram API to read user profiles - including username, name, bio, avatar, and recent posts.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930904/product-logos/Instagram_AppIcon_Aug2017.png",

    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "https://github.com/teleportd/instagram-node",
};

export const last_fmApiOption: ConfigurationGroupProperty = {
    label: "Last.fm API",
    identifier: "last_fm",
    type: OptionType.BOOLEAN,
    description:
        "Use the Last.fm API to query data about music artists, albums, tracks, and more.",
    defaultValue: true,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930875/product-logos/last_fm-512.png",

    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "https://github.com/jammus/lastfm-node#lastfm-node",
};

export const linkedinApiOption: ConfigurationGroupProperty = {
    label: "LinkedIn API",
    identifier: "linkedin",
    type: OptionType.BOOLEAN,
    description:
        "Use the LinkedIn API to read user profile information - including name, profile, positions, and connections.",
    defaultValue: true,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930840/product-logos/square-linkedin-512.png",

    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "http://developer.linkedin.com/apis",
};

export const steamApiOption: ConfigurationGroupProperty = {
    label: "Steam API",
    identifier: "steam",
    type: OptionType.BOOLEAN,
    description:
        "Use the Steam API to read Player Summaries - including avatars, achievements and owned games.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930764/product-logos/steam-logo-transparent.png",

    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "https://codotype.io",
};

export const stripeApiOption: ConfigurationGroupProperty = {
    label: "Stripe API",
    identifier: "stripe",
    type: OptionType.BOOLEAN,
    description:
        "Use the Stripe API to collect credit card payments through your app.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930739/product-logos/twitter.png",

    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "https://codotype.io",
};

export const paypalApiOption: ConfigurationGroupProperty = {
    label: "PayPal API",
    identifier: "paypal",
    type: OptionType.BOOLEAN,
    description:
        "Use the PayPal API to authorize and collect payments through your app.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930714/product-logos/paypal-logo.png",

    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "https://codotype.io",
};

export const twilioApiOption: ConfigurationGroupProperty = {
    label: "Twilio API",
    identifier: "twilio",
    type: OptionType.BOOLEAN,
    description:
        "Use the Twilio API to send text messages from your app - requires Twilio App ID and API token.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930682/product-logos/twilio.svg",

    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "https://codotype.io",
};

export const tumblrApiOption: ConfigurationGroupProperty = {
    label: "Tumblr API",
    identifier: "tumblr",
    type: OptionType.BOOLEAN,
    description:
        "Use the Tumblr API with Tumblr.js to read and write content to Tumblr blogs.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930402/product-logos/tumblr-icon-logo-png-transparent.png",

    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "https://www.tumblr.com/docs/en/api/v2#blog_methods",
};

export const web_scrapingApiOption: ConfigurationGroupProperty = {
    label: "Web Scraping API",
    identifier: "web_scraping",
    type: OptionType.BOOLEAN,
    description:
        "Include code for scraping websites using Cheerio.js - a fast, flexible, and lean implementation of core jQuery designed specifically for the server.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930643/product-logos/google-chrome-1326908_960_720.png",

    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "https://github.com/cheeriojs/cheerio",
};

export const clockwork_smsApiOption: ConfigurationGroupProperty = {
    label: "Clockwork SMS API",
    identifier: "clockwork_sms",
    type: OptionType.BOOLEAN,
    description:
        "Use the Clockwork SMS API to send and receive SMS through your app.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930520/product-logos/clockwork-sms.png",

    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "https://codotype.io",
};

export const aviaryApiOption: ConfigurationGroupProperty = {
    label: "Aviary API",
    identifier: "aviary",
    type: OptionType.BOOLEAN,
    description: "Use the Aviary API to programatically edit and save images.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558930486/product-logos/96px-Aviary_Logo.png",

    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "https://codotype.io",
};

export const lobApiOption: ConfigurationGroupProperty = {
    label: "Lob API",
    identifier: "lob",
    type: OptionType.BOOLEAN,
    description:
        "Use Lob's API for USPS-certified address verification and to programmatically send personalized postcards and letters.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558928124/product-logos/lob-logo.png",

    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "https://lob.com/",
};

export const pinterestApiOption: ConfigurationGroupProperty = {
    label: "Pinterest API",
    identifier: "pinterest",
    type: OptionType.BOOLEAN,
    description: "Use the Pinterest API to TODO TODO",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558928786/product-logos/Pinterest-logo-circle.png",

    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "https://codotype.io",
};

export const google_mapsApiOption: ConfigurationGroupProperty = {
    label: "Google Maps API",
    identifier: "google_maps",
    type: OptionType.BOOLEAN,
    description:
        "Use the Google Maps API to place markers on a map widget inside your app.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558928683/product-logos/1011px-GoogleMaps_logo.svg.png",

    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "https://codotype.io",
};

export const chartjsApiOption: ConfigurationGroupProperty = {
    label: "Chart.js + Alpha Vantage",
    identifier: "chartjs",
    type: OptionType.BOOLEAN,
    description:
        "Include Chart.js visualization with realtime and historical stock data and cryptocurrency feeds through Alpha Vantage",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558928549/product-logos/chartjs-logo.svg",

    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "https://www.alphavantage.co/documentation/",
};

export const dummyGeneratorMeta: GeneratorMeta = {
    id: "chrome_extension_generator", // unique ID for the generator
    label: "Chrome Extension Generator", // short label for the generator
    description: "A Codotype Generator", // brief description of the generator
    icon: "https://codotype.org/logo.png", // URL to the generator's icon. Must be at least 200x200px
    homepage: "https://codotype.org", // the "homepage" for this generator
    version: "0.1.0", // the current version of the generator
    created_by: "Codotype", // optional (replaces "official")
    tech_tags: [], // an array of strings describing the tech used in the generator
    type_tags: [], // describes the type of codebase produced by this generator
    experience: ExperienceRecommendation.BEGINNER, // an optional tag detailing the level of experience required to use the code produced by the generator
    project_path: "output", // the name of the directory for the generator's output
    schemaConfigurationGroup: {
        configurationGroups: [ComponentBuilderConfigurationGroup],
        supportedDatatypes: [], // The datatypes supported by this generator.Only an array of DATATYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
        supportedRelations: [], // The relation types supported by this generator.Only an array of RELATION_TYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
    },
    configuration_groups: [
        {
            ...ComponentBuilderConfigurationGroup,
            label: "API Examples",
            identifier: "api_examples",
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
        },
        ComponentBuilderConfigurationGroup,
    ], // an array of OptionGroup objects that expose additional configuration provided by the generator
};
