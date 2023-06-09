import {
    ConfigurationGroupSection,
    SectionLayoutVariants,
} from "../configuration-option-types";
import { ConfigurationProperty } from "../configuration-property";
import { Content } from "../content";

// // // //

interface ConfigurationGroupSectionBuilderParams {
    identifier: string;
    content: {
        label: string;
        description?: string;
        documentation?: string;
        icon?: string;
    };
    enabled?: boolean;
    allowDisable?: boolean;
    layoutVariant?: SectionLayoutVariants;
    properties?: ConfigurationProperty[];
}

export class ConfigurationGroupSectionBuilder
    implements ConfigurationGroupSection {
    identifier: string;
    content: Content = {
        label: "",
        description: "",
        documentation: "",
        icon: "",
    };
    properties: ConfigurationProperty[] = [];
    enabledByDefault: boolean = true;
    allowDisable: boolean = false;
    layoutVariant: SectionLayoutVariants = SectionLayoutVariants.LIST;

    constructor(params: ConfigurationGroupSectionBuilderParams) {
        this.identifier = params.identifier;

        // Sets this.content
        this.content = {
            label: params.content.label,
            description: params.content.description || this.content.description,
            documentation:
                params.content.documentation || this.content.documentation,
            icon: params.content.icon || this.content.icon,
        };

        this.properties = params.properties || this.properties;
        this.enabledByDefault =
            params.enabled !== undefined
                ? params.enabled
                : this.enabledByDefault;
        this.allowDisable =
            params.allowDisable !== undefined
                ? params.allowDisable
                : this.allowDisable;
        this.layoutVariant = params.layoutVariant || this.layoutVariant;
    }
}
