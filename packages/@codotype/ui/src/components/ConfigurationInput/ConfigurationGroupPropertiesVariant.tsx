import * as React from "react";
import {
    ConfigurationGroup,
    GroupLayoutVariants,
    ConfigurationPropertyDict,
} from "@codotype/core";
import { ConfigurationGroupPropertiesTabs } from "./ConfigurationGroupPropertiesTabs";
import { ConfigurationGroupPropertiesDetail } from "./ConfigurationGroupPropertiesDetail";
import { ConfigurationGroupPropertiesInput } from "./ConfigurationGroupPropertiesInput";
import { ConfigurationGroupPropertiesDocs } from "./ConfigurationGroupPropertiesDocs";
import { MarkdownRenderer } from "../MarkdownRenderer";

// // // //

/**
 * ConfigurationGroupPropertiesVariant
 * @param props.configurationGroup - the ConfigurationGroup whose properties are being rendered
 * @param props.value - the value for props.configurationGroup
 * @param props.onChange - callback to update props.value
 */
export function ConfigurationGroupPropertiesVariant(props: {
    configurationGroup: ConfigurationGroup;
    value: ConfigurationPropertyDict;
    onChange: (updatedVal: ConfigurationPropertyDict) => void;
}) {
    // Pulls configurationGroup and layoutVariant from props
    const { configurationGroup, value } = props;
    const { layoutVariant } = configurationGroup;

    console.log(configurationGroup);

    // Render null for `configurationGroup.allowDisable` and `value.enabled`
    if (configurationGroup.allowDisable && !value.enabled) {
        return null;
    }

    return (
        <React.Fragment>
            {/* Handle GroupLayoutVariants.LIST */}
            {layoutVariant === GroupLayoutVariants.LIST && (
                <ConfigurationGroupPropertiesInput {...props} />
            )}

            {/* Handle GroupLayoutVariants.TABS */}
            {layoutVariant === GroupLayoutVariants.TABS && (
                <ConfigurationGroupPropertiesTabs {...props} />
            )}

            {/* Handle GroupLayoutVariants.TABS */}
            {layoutVariant === GroupLayoutVariants.DOCS && (
                <div>
                    <MarkdownRenderer
                        source={configurationGroup.content.documentation}
                    />
                </div>
            )}

            {/* Handle DOCS_3x9 + DOCS_4x8 + DOCS_6x6 */}
            {[
                GroupLayoutVariants.DOCS_3x9,
                GroupLayoutVariants.DOCS_4x8,
                GroupLayoutVariants.DOCS_6x6,
            ].includes(layoutVariant) && (
                <ConfigurationGroupPropertiesDocs {...props} />
            )}

            {/* Handle DETAIL_3x9 + DETAIL_4x8 + DETAIL_6x6 */}
            {[
                GroupLayoutVariants.DETAIL_3x9,
                GroupLayoutVariants.DETAIL_4x8,
                GroupLayoutVariants.DETAIL_6x6,
            ].includes(layoutVariant) && (
                <ConfigurationGroupPropertiesDetail {...props} />
            )}
        </React.Fragment>
    );
}
