import {
    ConfigurationGroupSection,
    ConfigurationGroupProperty,
    SectionLayoutVariant,
} from "../configuration-option-types";

interface ConfigurationGroupSectionBuilderParams {
    label: string;
    identifier: string;
    description: string;
    documentation?: string;
    enabled?: boolean;
    allowDisable?: boolean;
    layoutVariant?: SectionLayoutVariant;
    properties?: ConfigurationGroupProperty[];
}

export class ConfigurationGroupSectionBuilder
    implements ConfigurationGroupSection {
    label: string;
    identifier: string;
    description: string;
    properties: ConfigurationGroupProperty[] = [];
    documentation: string = "";
    enabled: boolean = true;
    allowDisable: boolean = false;
    layoutVariant: SectionLayoutVariant = SectionLayoutVariant.LIST;

    constructor(params: ConfigurationGroupSectionBuilderParams) {
        this.label = params.label;
        this.identifier = params.identifier;
        this.description = params.description;

        this.properties = params.properties || this.properties;
        this.documentation = params.documentation || this.documentation;
        this.enabled =
            params.enabled !== undefined ? params.enabled : this.enabled;
        this.allowDisable =
            params.allowDisable !== undefined
                ? params.allowDisable
                : this.allowDisable;
        this.layoutVariant = params.layoutVariant || this.layoutVariant;
    }
}
