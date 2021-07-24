import { ConfigurationProperty } from "./configuration-property";
import { Content } from "./content";

// // // //

// LIST - lists all the properties. Documentation renders in a modal.
// DOCS - All documentation, no properties
// DOCS_6x6 - Half documentation, half properties. Documentation renders in-line.
// DETAIL - main/detail layout. Documentation renders in a modal.
export enum SectionLayoutVariants {
    LIST = "LIST",
    DOCS = "DOCS",
    DOCS_3x9 = "DOCS_3x9",
    DOCS_4x8 = "DOCS_4x8",
    DOCS_6x6 = "DOCS_6x6",
    DETAIL_3x9 = "DETAIL_3x9",
    DETAIL_4x8 = "DETAIL_4x8",
    DETAIL_6x6 = "DETAIL_6x6",
}

// Defines the LayoutVariant type that's ONLY used for ConfigurationGroup
// TABS - Renders a Tab for each ConfigurationGroupSection
export enum GroupLayoutVariants {
    TABS = "TABS",
    LIST = "LIST",
    DOCS = "DOCS",
    DOCS_3x9 = "DOCS_3x9",
    DOCS_4x8 = "DOCS_4x8",
    DOCS_6x6 = "DOCS_6x6",
    DETAIL_3x9 = "DETAIL_3x9",
    DETAIL_4x8 = "DETAIL_4x8",
    DETAIL_6x6 = "DETAIL_6x6",
}

interface ConfigurationBase {
    identifier: string;
    content: Content;
    enabledByDefault: boolean;
    allowDisable: boolean;
}

/**
 * ConfigurationGroupSection
 * Defines values for ConfigurationGroup.sections
 * Encapsulates a section of the configuration that can hold many properties
 * Many sections can be encapsulated together in a ConfigurationGroup,
 * and many ConfigurationGroups in a Plugin or SchemaEditorConfiguration
 */
export interface ConfigurationGroupSection extends ConfigurationBase {
    layoutVariant: SectionLayoutVariants;
    properties: ConfigurationProperty[];
}

// // // //

export interface ConfigurationGroup extends ConfigurationBase {
    layoutVariant: GroupLayoutVariants;
    sections: ConfigurationGroupSection[];
    properties: ConfigurationProperty[];
}
