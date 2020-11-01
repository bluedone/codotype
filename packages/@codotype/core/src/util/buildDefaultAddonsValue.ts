import { AddonProperty, AddonsValue } from "../schema-editor-addon";

// // // //

/**
 * buildDefaultAddonsValue
 * Builds the default value for AttributeInput.addons or RelationInput.addons
 * @param params.addons - the AddonProperties which the returned AddonsValue will represent
 * @return AddonsValue - the AddonsValue populated from params.addons
 */
export function buildDefaultAddonsValue(params: {
    properties: AddonProperty[];
}): AddonsValue {
    const addonsValue: AddonsValue = params.properties.reduce(
        (av: AddonsValue, addon: AddonProperty) => {
            return {
                ...av,
                [addon.identifier]: addon.defaultValue,
            };
        },
        {},
    );
    return addonsValue;
}
