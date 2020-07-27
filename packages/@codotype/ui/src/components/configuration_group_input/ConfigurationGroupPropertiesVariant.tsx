import * as React from "react";
import {
    ConfigurationGroup,
    GroupLayoutVariant,
    OptionValueInstance,
} from "@codotype/types";
import { ConfigurationGroupPropertiesTabs } from "./ConfigurationGroupPropertiesTabs";
import { ConfigurationGroupPropertiesDetail } from "./ConfigurationGroupPropertiesDetail";
import { ConfigurationGroupPropertiesInput } from "./ConfigurationGroupPropertiesInput";
import { ConfigurationGroupPropertiesDocs } from "./ConfigurationGroupPropertiesDocs";

// // // //

/**
 * ConfigurationGroupPropertiesVariant
 * @param props.configurationGroup - the ConfigurationGroup whose properties are being rendered
 * @param props.value - the value for props.configurationGroup
 * @param props.onChange - callback to update props.value
 */
export function ConfigurationGroupPropertiesVariant(props: {
    configurationGroup: ConfigurationGroup;
    value: OptionValueInstance;
    onChange: (updatedVal: OptionValueInstance) => void;
}) {
    // Pulls configurationGroup and layoutVariant from props
    const { configurationGroup, value } = props;
    const { layoutVariant } = configurationGroup;

    // Render null for `configurationGroup.allowDisable` and `value.enabled`
    if (configurationGroup.allowDisable && !value.enabled) {
        return null;
    }

    return (
        <React.Fragment>
            {/* Handle GroupLayoutVariant.LIST */}
            {layoutVariant === GroupLayoutVariant.LIST && (
                <ConfigurationGroupPropertiesInput {...props} />
            )}

            {/* Handle GroupLayoutVariant.TABS */}
            {layoutVariant === GroupLayoutVariant.TABS && (
                <ConfigurationGroupPropertiesTabs {...props} />
            )}

            {/* Handle DOCS_3x9 + DOCS_4x8 + DOCS_6x6 */}
            {[
                GroupLayoutVariant.DOCS_3x9,
                GroupLayoutVariant.DOCS_4x8,
                GroupLayoutVariant.DOCS_6x6,
            ].includes(layoutVariant) && (
                <ConfigurationGroupPropertiesDocs {...props} />
            )}

            {/* Handle DETAIL_3x9 + DETAIL_4x8 + DETAIL_6x6 */}
            {[
                GroupLayoutVariant.DETAIL_3x9,
                GroupLayoutVariant.DETAIL_4x8,
                GroupLayoutVariant.DETAIL_6x6,
            ].includes(layoutVariant) && (
                <ConfigurationGroupPropertiesDetail
                    configurationGroup={configurationGroup}
                />
            )}
        </React.Fragment>
    );
}
