import {
    PropertyTypes,
    Primitives,
    PropertyLayoutVariants,
    StringPropertyTransformations,
    PropertyPreviewLayoutVariant,
    PropertyPreviewActionTypes,
    PropertyPreviewConstraintTypes,
} from "@codotype/core";

// // // //

export const ApiActionsProperty = new Primitives.ConfigurationProperty({
    identifier: "actions",
    content: {
        label: "Actions",
    },
    type: PropertyTypes.COLLECTION,
    preview: {
        rules: [
            {
                constraint: {
                    dataProperty: "function_name",
                    type: PropertyPreviewConstraintTypes.equals,
                    value: "",
                },
                action: {
                    type: PropertyPreviewActionTypes.literal,
                    template: "",
                },
            },
            {
                constraint: {
                    dataProperty: "route",
                    type: PropertyPreviewConstraintTypes.equals,
                    value: "",
                },
                action: {
                    type: PropertyPreviewActionTypes.literal,
                    template: "",
                },
            },
            {
                constraint: {
                    dataProperty: "scope",
                    type: PropertyPreviewConstraintTypes.equals,
                    value: "COLLECTION",
                },
                action: {
                    type: PropertyPreviewActionTypes.stringTemplate,
                    template:
                        "{{data.verb}} /api/schema-scope/{{data.route}} -> {{data.function_name}}",
                },
            },
            {
                constraint: {
                    dataProperty: "scope",
                    type: PropertyPreviewConstraintTypes.equals,
                    value: "MODEL",
                },
                action: {
                    type: PropertyPreviewActionTypes.stringTemplate,
                    template:
                        "{{data.verb}} /api/schema-scope/:id/{{data.route}} -> {{data.function_name}}",
                },
            },
        ],
        variant: PropertyPreviewLayoutVariant.CODE_DARK,
    },
    properties: [
        new Primitives.ConfigurationProperty({
            content: {
                label: "Verb",
                description: "Verify",
            },
            identifier: "verb",
            defaultValue: "GET",
            type: PropertyTypes.DROPDOWN,
            layoutVariant: PropertyLayoutVariants.COL_6,
            dropdownOptions: [
                { value: "GET", label: "GET" },
                { value: "POST", label: "POST" },
                { value: "PUT", label: "PUT" },
                { value: "DELETE", label: "DELETE" },
            ],
        }),
        new Primitives.ConfigurationProperty({
            content: {
                label: "Route",
                description: "Route",
            },
            identifier: "route",
            defaultValue: "verify",
            type: PropertyTypes.STRING,
            layoutVariant: PropertyLayoutVariants.COL_6,
            transformations: [
                StringPropertyTransformations.nonumbers,
                StringPropertyTransformations.trimwhitespace,
                StringPropertyTransformations.removewhitespace,
            ],
        }),
        new Primitives.ConfigurationProperty({
            content: {
                label: "Function Name",
                description: "function_name",
            },
            identifier: "function_name",
            defaultValue: "verify",
            layoutVariant: PropertyLayoutVariants.COL_6,
            type: PropertyTypes.STRING,
            transformations: [
                StringPropertyTransformations.camelcase,
                StringPropertyTransformations.nonumbers,
                StringPropertyTransformations.nosymbols,
                StringPropertyTransformations.trimwhitespace,
            ],
        }),
        new Primitives.ConfigurationProperty({
            content: {
                label: "Scope",
                description: "scope",
            },
            identifier: "scope",
            defaultValue: "COLLECTION",
            layoutVariant: PropertyLayoutVariants.COL_6,
            type: PropertyTypes.DROPDOWN,
            dropdownOptions: [
                { value: "COLLECTION", label: "Collection" },
                { value: "MODEL", label: "Model" },
            ],
        }),
    ],
});

export const NestedCollectionProperty = {
    ...ApiActionsProperty,
    identifier: "nested_api_actions",
    properties: [
        ...ApiActionsProperty.properties,
        {
            ...ApiActionsProperty,
            layoutVariant: PropertyLayoutVariants.CARD_COL_12,
        },
    ],
};
