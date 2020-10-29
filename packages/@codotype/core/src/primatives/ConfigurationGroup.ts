import { ConfigurationGroup } from "..";
import {
    GroupLayoutVariant,
    ConfigurationGroupSection,
    ConfigurationGroupProperty,
} from "../configuration-option-types";

interface ConfigurationGroupBuilderParams {
    label: string;
    identifier: string;
    description: string;
    documentation?: string;
    enabled?: boolean;
    allowDisable?: boolean;
    layoutVariant?: GroupLayoutVariant;
    sections?: ConfigurationGroupSection[];
    properties?: ConfigurationGroupProperty[];
}

export class ConfigurationGroupBuilder implements ConfigurationGroup {
    label: string;
    identifier: string;
    description: string;
    layoutVariant: GroupLayoutVariant = GroupLayoutVariant.LIST;
    sections: ConfigurationGroupSection[] = [];
    properties: ConfigurationGroupProperty[] = [];
    documentation: string = "";
    enabledByDefault: boolean = true;
    allowDisable: boolean = false;

    constructor(params: ConfigurationGroupBuilderParams) {
        this.label = params.label;
        this.identifier = params.identifier;
        this.description = params.description;

        this.layoutVariant = params.layoutVariant || this.layoutVariant;
        this.sections = params.sections || this.sections;
        this.properties = params.properties || this.properties;
        this.documentation = params.documentation || this.documentation;
        this.enabledByDefault =
            params.enabled !== undefined
                ? params.enabled
                : this.enabledByDefault;
        this.allowDisable =
            params.allowDisable !== undefined
                ? params.allowDisable
                : this.allowDisable;
    }
}
