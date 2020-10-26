export * from "./documentation";
import { SchemaInput } from "../../schema";

import {
    ComponentBuilderConfigurationGroupProperty,
    ComponentBuilderConfigurationGroupPropertySingleText,
    ComponentBuilderConfigurationGroupPropertySingleDropdown,
    ComponentBuilderConfigurationGroupPropertySingleNumber,
    ComponentBuilderConfigurationGroupPropertyWithInstance01,
    ComponentBuilderConfigurationGroupPropertyWithInstance,
    ComponentBuilderConfigurationGroup,
    LambdaBuilderNameProperty,
    LambdaLanguageProperty,
    LambdaBuilderConfigurationGroup,
    ApiExamplesConfigurationGroup,
    SideBySideConfigurationGroup,
    cdkGeneratorMeta,
    userSchema,
    movieSchema,
    emailAttribute,
    dummyGeneratorMeta,
} from "./test_state";
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
} from "./configuration-properties";
import {
    ConfigurationGroupProperty,
    ConfigurationGroup,
} from "../../configuration-option-types";
import { PluginMetadata } from "../../plugin";
import { Attribute } from "../../attribute";

interface TestState {
    ComponentBuilderConfigurationGroupProperty: ConfigurationGroupProperty;
    ComponentBuilderConfigurationGroupPropertySingleText: ConfigurationGroupProperty;
    ComponentBuilderConfigurationGroupPropertySingleDropdown: ConfigurationGroupProperty;
    ComponentBuilderConfigurationGroupPropertySingleNumber: ConfigurationGroupProperty;
    ComponentBuilderConfigurationGroupPropertyWithInstance01: ConfigurationGroupProperty;
    ComponentBuilderConfigurationGroupPropertyWithInstance: ConfigurationGroupProperty;
    ComponentBuilderConfigurationGroup: ConfigurationGroup;
    LambdaBuilderNameProperty: ConfigurationGroupProperty;
    LambdaLanguageProperty: ConfigurationGroupProperty;
    LambdaBuilderConfigurationGroup: ConfigurationGroup;
    ApiExamplesConfigurationGroup: ConfigurationGroup;
    SideBySideConfigurationGroup: ConfigurationGroup;
    cdkGeneratorMeta: PluginMetadata;
    dummyGeneratorMeta: PluginMetadata;
    userSchema: SchemaInput;
    movieSchema: SchemaInput;
    emailAttribute: Attribute;
    gitHubApiOption: ConfigurationGroupProperty;
    twitterApiOption: ConfigurationGroupProperty;
    facebookApiOption: ConfigurationGroupProperty;
    foursquareApiOption: ConfigurationGroupProperty;
    instagramApiOption: ConfigurationGroupProperty;
    last_fmApiOption: ConfigurationGroupProperty;
    linkedinApiOption: ConfigurationGroupProperty;
    steamApiOption: ConfigurationGroupProperty;
    stripeApiOption: ConfigurationGroupProperty;
    paypalApiOption: ConfigurationGroupProperty;
    twilioApiOption: ConfigurationGroupProperty;
    tumblrApiOption: ConfigurationGroupProperty;
    web_scrapingApiOption: ConfigurationGroupProperty;
    clockwork_smsApiOption: ConfigurationGroupProperty;
    aviaryApiOption: ConfigurationGroupProperty;
    lobApiOption: ConfigurationGroupProperty;
    pinterestApiOption: ConfigurationGroupProperty;
    google_mapsApiOption: ConfigurationGroupProperty;
    chartjsApiOption: ConfigurationGroupProperty;
}

export const testState: TestState = {
    ComponentBuilderConfigurationGroupProperty,
    ComponentBuilderConfigurationGroupPropertySingleText,
    ComponentBuilderConfigurationGroupPropertySingleDropdown,
    ComponentBuilderConfigurationGroupPropertySingleNumber,
    ComponentBuilderConfigurationGroupPropertyWithInstance01,
    ComponentBuilderConfigurationGroupPropertyWithInstance,
    ComponentBuilderConfigurationGroup,
    LambdaBuilderNameProperty,
    LambdaLanguageProperty,
    LambdaBuilderConfigurationGroup,
    ApiExamplesConfigurationGroup,
    SideBySideConfigurationGroup,
    dummyGeneratorMeta,
    cdkGeneratorMeta,
    userSchema,
    movieSchema,
    emailAttribute,
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
};
