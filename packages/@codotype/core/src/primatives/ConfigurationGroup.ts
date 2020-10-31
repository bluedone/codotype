import { ConfigurationGroup } from "..";
import {
    GroupLayoutVariant,
    ConfigurationGroupSection,
    ConfigurationProperty,
} from "../configuration-option-types";
import { Content } from "../content";

interface ConfigurationGroupBuilderParams {
    identifier: string;
    content: {
        label: string;
        description: string;
        documentation?: string;
        icon?: string;
    };
    enabled?: boolean;
    allowDisable?: boolean;
    layoutVariant?: GroupLayoutVariant;
    sections?: ConfigurationGroupSection[];
    properties?: ConfigurationProperty[];
}

export class ConfigurationGroupBuilder implements ConfigurationGroup {
    identifier: string;
    content: Content = {
        label: "",
        description: "",
        documentation: "",
        icon: "",
    };
    layoutVariant: GroupLayoutVariant = GroupLayoutVariant.LIST;
    sections: ConfigurationGroupSection[] = [];
    properties: ConfigurationProperty[] = [];
    enabledByDefault: boolean = true;
    allowDisable: boolean = false;

    constructor(params: ConfigurationGroupBuilderParams) {
        this.identifier = params.identifier;

        // Sets this.content
        this.content = {
            label: params.content.label,
            description: params.content.description || this.content.description,
            documentation:
                params.content.documentation || this.content.documentation,
            icon: params.content.icon || this.content.icon,
        };

        this.layoutVariant = params.layoutVariant || this.layoutVariant;
        this.sections = params.sections || this.sections;
        this.properties = params.properties || this.properties;
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
