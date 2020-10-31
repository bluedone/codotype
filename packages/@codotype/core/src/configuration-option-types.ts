import { ConfigurationProperty } from "./configuration-property";

// // // //

// LIST - lists all the properties. Documentation renders in a modal.
// DOCS - Half documentation, half properties. Documentation renders in-line.
// DETAIL - main/detail layout. Documentation renders in a modal.
export enum SectionLayoutVariant {
    LIST = "LIST",
    DOCS_3x9 = "DOCS_3x9",
    DOCS_4x8 = "DOCS_4x8",
    DOCS_6x6 = "DOCS_6x6",
    DETAIL_3x9 = "DETAIL_3x9",
    DETAIL_4x8 = "DETAIL_4x8",
    DETAIL_6x6 = "DETAIL_6x6",
}

// Defines the LayoutVariant type that's ONLY used for ConfigurationGroup
// TABS - Renders a Tab for each ConfigurationGroupSection
export enum GroupLayoutVariant {
    TABS = "TABS",
    LIST = "LIST",
    DOCS_3x9 = "DOCS_3x9",
    DOCS_4x8 = "DOCS_4x8",
    DOCS_6x6 = "DOCS_6x6",
    DETAIL_3x9 = "DETAIL_3x9",
    DETAIL_4x8 = "DETAIL_4x8",
    DETAIL_6x6 = "DETAIL_6x6",
}

// // // //

// TODO - replace most of this with....? wtf
interface ConfigurationBase {
    identifier: string;
    content: {
        label: string;
        icon: string;
        description: string;
        documentation: string; // Markdown
    };
    enabledByDefault: boolean;
    allowDisable: boolean;
}

// // // //

/**
 * ConfigurationGroupSection
 * Defines values for ConfigurationGroup.sections
 * Encapsulates a section of the configuration that can hold many properties
 * Many sections can be encapsulated together in a ConfigurationGroup,
 * and many ConfigurationGroups in a Generator or SchemaEditorConfiguration
 */
export interface ConfigurationGroupSection extends ConfigurationBase {
    layoutVariant: SectionLayoutVariant;
    properties: ConfigurationProperty[];
}

// // // //

// TODO - rename ConfigurationGroup?
export interface ConfigurationGroup extends ConfigurationBase {
    layoutVariant: GroupLayoutVariant;
    sections: ConfigurationGroupSection[];
    properties: ConfigurationProperty[];
}
