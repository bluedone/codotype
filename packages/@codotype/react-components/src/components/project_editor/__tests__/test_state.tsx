import { ExperienceRecommendation, GeneratorMeta } from "@codotype/types";
import {
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
    ComponentBuilderConfigurationGroup,
} from "../../configuration_group_input/__tests__/test_state";
import { syntaxHighlighting } from "../../markdown_renderer/__tests__/test_state";

// // // //

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
        {
            ...ComponentBuilderConfigurationGroup,
            label: "Architecture Configuration",
            identifier: "component_builder_side_by_side",
            variant: "SIDEBYSIDE",
            description:
                "Configure the server architecture of your application",
            documentation: syntaxHighlighting,
            properties: [twitterApiOption],
        },
        ComponentBuilderConfigurationGroup,
    ], // an array of OptionGroup objects that expose additional configuration provided by the generator
};
