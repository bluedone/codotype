export * from "./documentation";
import { SchemaInput } from "../../schema";

import {
    ComponentBuilderConfigurationProperty,
    ComponentBuilderConfigurationPropertySingleText,
    ComponentBuilderConfigurationPropertySingleDropdown,
    ComponentBuilderConfigurationPropertySingleNumber,
    ComponentBuilderConfigurationPropertyWithInstance01,
    ComponentBuilderConfigurationPropertyWithInstance,
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
import { ConfigurationGroup } from "../../configuration-option-types";
import { ConfigurationProperty } from "../../configuration-property";
import { PluginMetadata } from "../../plugin";
import { Attribute } from "../../attribute";

interface TestState {
    ComponentBuilderConfigurationProperty: ConfigurationProperty;
    ComponentBuilderConfigurationPropertySingleText: ConfigurationProperty;
    ComponentBuilderConfigurationPropertySingleDropdown: ConfigurationProperty;
    ComponentBuilderConfigurationPropertySingleNumber: ConfigurationProperty;
    ComponentBuilderConfigurationPropertyWithInstance01: ConfigurationProperty;
    ComponentBuilderConfigurationPropertyWithInstance: ConfigurationProperty;
    ComponentBuilderConfigurationGroup: ConfigurationGroup;
    LambdaBuilderNameProperty: ConfigurationProperty;
    LambdaLanguageProperty: ConfigurationProperty;
    LambdaBuilderConfigurationGroup: ConfigurationGroup;
    ApiExamplesConfigurationGroup: ConfigurationGroup;
    SideBySideConfigurationGroup: ConfigurationGroup;
    cdkGeneratorMeta: PluginMetadata;
    dummyGeneratorMeta: PluginMetadata;
    userSchema: SchemaInput;
    movieSchema: SchemaInput;
    emailAttribute: Attribute;
    gitHubApiOption: ConfigurationProperty;
    twitterApiOption: ConfigurationProperty;
    facebookApiOption: ConfigurationProperty;
    foursquareApiOption: ConfigurationProperty;
    instagramApiOption: ConfigurationProperty;
    last_fmApiOption: ConfigurationProperty;
    linkedinApiOption: ConfigurationProperty;
    steamApiOption: ConfigurationProperty;
    stripeApiOption: ConfigurationProperty;
    paypalApiOption: ConfigurationProperty;
    twilioApiOption: ConfigurationProperty;
    tumblrApiOption: ConfigurationProperty;
    web_scrapingApiOption: ConfigurationProperty;
    clockwork_smsApiOption: ConfigurationProperty;
    aviaryApiOption: ConfigurationProperty;
    lobApiOption: ConfigurationProperty;
    pinterestApiOption: ConfigurationProperty;
    google_mapsApiOption: ConfigurationProperty;
    chartjsApiOption: ConfigurationProperty;
}

export const testState: TestState = {
    ComponentBuilderConfigurationProperty,
    ComponentBuilderConfigurationPropertySingleText,
    ComponentBuilderConfigurationPropertySingleDropdown,
    ComponentBuilderConfigurationPropertySingleNumber,
    ComponentBuilderConfigurationPropertyWithInstance01,
    ComponentBuilderConfigurationPropertyWithInstance,
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
