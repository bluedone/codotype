export enum Datatype {
    // Standard datatypes
    STRING = "STRING", // Postgres, MongoDB
    TEXT = "TEXT", // Postgres, MongoDB (Equiv. to String)
    INTEGER = "INTEGER", // Postgres, MongoDB
    BIGINT = "BIGINT", // Postgres
    FLOAT = "FLOAT", // Postgres
    DECIMAL = "DECIMAL", // Postgres
    NUMERIC = "NUMERIC", // Postgres
    BOOLEAN = "BOOLEAN", // Postgres, MongoDB
    DATE = "DATE", // Postgres, MongoDB
    TIME = "TIME", // Postgres
    DATETIME = "DATETIME", // Postgres
    TIMESTAMP = "TIMESTAMP", // MongoDB
    BINARY = "BINARY", // Postgres, MongoDB
    JSON = "JSON", // Postgres
    JSONB = "JSONB", // Postgres
    OBJECT = "OBJECT", // MongoDB

    // Array datatypes
    STRING_ARRAY = "STRING_ARRAY", // Postgres, MongoDB
    TEXT_ARRAY = "TEXT_ARRAY", // Postgres, MongoDB (Equiv. to String)
    INTEGER_ARRAY = "INTEGER_ARRAY", // Postgres, MongoDB
    BIGINT_ARRAY = "BIGINT_ARRAY", // Postgres
    FLOAT_ARRAY = "FLOAT_ARRAY", // Postgres
    DECIMAL_ARRAY = "DECIMAL_ARRAY", // Postgres
    NUMERIC_ARRAY = "NUMERIC_ARRAY", // Postgres
    BOOLEAN_ARRAY = "BOOLEAN_ARRAY", // Postgres, MongoDB
    DATE_ARRAY = "DATE_ARRAY", // Postgres, MongoDB
    TIME_ARRAY = "TIME_ARRAY", // Postgres
    DATETIME_ARRAY = "DATETIME_ARRAY", // Postgres
    TIMESTAMP_ARRAY = "TIMESTAMP_ARRAY", // MongoDB

    // Special Datatypes
    SINGLE_FILE = "SINGLE_FILE",
    SINGLE_IMAGE = "SINGLE_IMAGE",
}

export enum OptionType {
    STRING = "STRING",
    NUMBER = "NUMBER",
    BOOLEAN = "BOOLEAN",
    DROPDOWN = "DROPDOWN",
    MULTI_DROPDOWN = "MULTI_DROPDOWN",
    COLLECTION = "COLLECTION",
    INSTANCE = "INSTANCE",
}

export type OptionValue =
    | string
    | string[]
    | number
    | number[]
    | boolean
    | OptionValueInstance
    | OptionValueInstance[]
    | null;

export type OptionValueInstance =
    | OptionValueInstanceStandard
    | OptionValueInstanceAllowDisable;

interface OptionValueInstanceStandard {
    [key: string]: OptionValue;
}

interface OptionValueInstanceAllowDisable {
    enabled: boolean;
    value: {
        [key: string]: OptionValue;
    };
}

export interface DropdownOption {
    label: string;
    value: string;
}

export interface ConfigurationGroupProperty {
    label: string;
    identifier: string;
    description: string;
    icon: string;
    type: OptionType;
    defaultValue: OptionValue;
    required: boolean;
    enabled: boolean;
    allowDisable: boolean;
    properties: ConfigurationGroupProperty[];
    dropdownOptions: DropdownOption[];
}

export interface ConfigurationGroup {
    label: string;
    identifier: string;
    description: string;
    documentation: string; // Markdown
    enabled: boolean;
    allowDisable: boolean;
    scope: string; // enum
    variant: "LIST" | "SIDEBYSIDE"; // TODO - enum + rename!
    properties: ConfigurationGroupProperty[];
}

export interface ProjectConfiguration {
    [key: string]: OptionValueInstance;
}

export interface Attribute {
    id: string;
    label: string;
    identifier: string;
    description: string;
    required: boolean;
    unique: boolean;
    datatype: Datatype | null;
    default_value: null | string | boolean | number;
    datatypeOptions: { [key: string]: any };
    locked: boolean;
}

export interface Relation {
    id: string;
    label: string;
    identifier: string;
    description: string;
    required: boolean;
    unique: boolean;
    datatype: Datatype | null;
    default_value: null | string | boolean | number;
    datatypeOptions: { [key: string]: any };
    locked: boolean;
}

export interface Schema {
    // id: null | string;
    id: string;
    locked: boolean;
    source: string; // SchemaSource enum;
    removable: boolean;
    tokens: any; // SchemaTokenCasing;
    attributes: Attribute[];
    relations: Relation[];
    configuration: ProjectConfiguration;
    // reverse_relations: any[]; <--- these are _derived_, a computed value - doesn't need to be stored
}

export interface Project {
    label: string;
    generatorId: string;
    generatorVersion: string;
    configuration: ProjectConfiguration;
    schemas: Schema[];
}

export enum ExperienceRecommendation {
    BEGINNER = "beginner",
    JUNIOR = "junior",
    INTERMEDIATE = "intermediate",
    EXPERT = "expert",
}

export interface SchemaConfigurationGroup {
    configurationGroups: any[]; // ConfigurationGroup
    // defaultSchemas: any; // a Schemas array containing default schemas to load with the project.Learn more about default schema behavior here
    supportedDatatypes: any[]; // The datatypes supported by this generator.Only an array of DATATYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
    supportedRelations: any[]; // The relation types supported by this generator.Only an array of RELATION_TYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
}

export interface GeneratorMeta {
    id: string; // unique ID for the generator
    label: string; // short label for the generator
    description: string; // brief description of the generator
    icon: string; // URL to the generator's icon. Must be at least 200x200px
    homepage: string; // the "homepage" for this generator
    version: string; // the current version of the generator
    created_by: string; // optional (replaces "official")
    tech_tags: any; // an array of strings describing the tech used in the generator
    type_tags: any; // describes the type of codebase produced by this generator
    experience: ExperienceRecommendation; // an optional tag detailing the level of experience required to use the code produced by the generator
    project_path: string; // the name of the directory for the generator's output
    schemaConfigurationGroup: SchemaConfigurationGroup;
    configuration_groups: ConfigurationGroup[]; // an array of OptionGroup objects that expose additional configuration provided by the generator
    // All of this gets merged into configuration groups
    // defaultSchemas: any; // a Schemas array containing default schemas to load with the project.Learn more about default schema behavior here
    // defaultConfiguration: any; // object that can provide optional defaults / examples for each ConfigurationGroup.This is where you can supply default Addon data for different ConfigurationGroups
    // supportedDatatypes: any; // The datatypes supported by this generator.Only an array of DATATYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
    // supportedRelations: any; // The relation types supported by this generator.Only an array of RELATION_TYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
}
