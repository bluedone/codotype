import * as React from "react";
import {
    OptionValue,
    ConfigurationGroupProperty,
    TokenPluralization,
    buildConfigurationGroupPropertyValue,
    makeUniqueId,
} from "@codotype/core";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { ConfigurationGroupPropertiesInput } from "./ConfigurationGroupPropertiesInput";

// // // //
// DESIGN - template compilation interfaces
// TODO - move into @codotype/core

enum DefinitionOperation {
    defined = "defined",
    contains = "contains",
    equals = "equals",
    starts_with = "starts_with",
    ends_with = "ends_with",
}

enum DefinitionAction {
    block = "block",
    filter = "filter",
    literal = "literal",
    stringTemplate = "stringTemplate",
    replace = "replace",
    index_from_regex_match = "index_from_regex_match",
    index_from_split = "index_from_split",
    uppercase = "uppercase",
    lowercase = "lowercase",
}

enum CollectionTemplateVariant {
    CODE_DARK = "CODE_DARK",
    CODE_LIGHT = "CODE_LIGHT",
    BADGE_LIGHT = "BADGE_LIGHT",
    BADGE_DARK = "BADGE_DARK",
}

interface DefinitionModel {
    // Condition
    sourceProperty: string;
    operation: DefinitionOperation;
    value: string;
    // # Action
    // # TODO - Action should be an object, rather than string attributes
    // # The action = {} attribute can better store a variable number and type of attributes
    // action:     ''
    // applied: false # TODO - definitions should track wether or not they have been applied
    action: {
        type: DefinitionAction;
    };
    template: string;
}

interface CollectionTemplate {
    rules: DefinitionModel[];
    variant: CollectionTemplateVariant;
}

// // // //
// Instances
// TODO - move into @codotype/core

const collectionTemplateForLambdas: CollectionTemplate = {
    rules: [
        {
            sourceProperty: "lambdaName",
            operation: DefinitionOperation.equals,
            value: "",
            action: {
                type: DefinitionAction.literal,
            },
            template: "Please define a Lambda Name",
        },
        {
            sourceProperty: "language",
            operation: DefinitionOperation.equals,
            value: "typescript",
            action: {
                type: DefinitionAction.stringTemplate,
            },
            template:
                "TypeScript Lambda: {{data.lambdaName}} / {{data.language}}",
        },
        {
            sourceProperty: "language",
            operation: DefinitionOperation.equals,
            value: "javascrtip",
            action: {
                type: DefinitionAction.stringTemplate,
            },
            template:
                "Javascript Lambda: {{data.lambdaName}} / {{data.language}}",
        },
    ],
    variant: CollectionTemplateVariant.CODE_DARK,
};

const collectionTemplateForApiActions: CollectionTemplate = {
    rules: [
        {
            sourceProperty: "function_name",
            operation: DefinitionOperation.equals,
            value: "",
            action: {
                type: DefinitionAction.literal,
            },
            template: "",
        },
        {
            sourceProperty: "route",
            operation: DefinitionOperation.equals,
            value: "",
            action: {
                type: DefinitionAction.literal,
            },
            template: "",
        },
        {
            sourceProperty: "scope",
            operation: DefinitionOperation.equals,
            value: "COLLECTION",
            action: {
                type: DefinitionAction.stringTemplate,
            },
            template:
                "{{data.verb}} /api/schema-scope/{{data.route}} -> {{data.function_name}}",
        },
        {
            sourceProperty: "scope",
            operation: DefinitionOperation.equals,
            value: "MODEL",
            action: {
                type: DefinitionAction.stringTemplate,
            },
            template:
                "{{data.verb}} /api/schema-scope/:id/{{data.route}} -> {{data.function_name}}",
        },
    ],
    variant: CollectionTemplateVariant.CODE_DARK,
};

// // // //
// Component + functions

// TODO - move into @codotype/core
function shouldEvalAction(props: {
    rule: DefinitionModel;
    collectionItem: any;
}): boolean {
    const { rule, collectionItem } = props;

    const sourceValue: any = collectionItem[rule.sourceProperty];

    // Handle EQUALS
    if (rule.operation === DefinitionOperation.equals) {
        if (sourceValue === rule.value) {
            return true;
        }
    }

    // Handle DEFINED
    if (rule.operation === DefinitionOperation.defined) {
        if (sourceValue) {
            return true;
        }
    }

    return false;
}

// TODO - move into @codotype/core
// TODO - update this to handle string values
function evalAction(props: {
    rule: DefinitionModel;
    collectionItem: any;
}): string {
    const { rule, collectionItem } = props;

    // Handle LITERAL
    if (rule.action.type === DefinitionAction.literal) {
        return rule.template;
    }

    // Handle STRING_TEMPLATE
    if (rule.action.type === DefinitionAction.stringTemplate) {
        let templateString = rule.template;
        let templateFragments: string[] = [];

        // if (templateString.includes("{{"))
        const startFragments = templateString.split("{{");
        for (const s of startFragments) {
            // console.log(s);
            if (s.includes("}}")) {
                const subFragments = s.split("}}");
                subFragments.forEach(sf => {
                    if (sf !== "") {
                        templateFragments.push(sf);
                    }
                });
            } else {
                templateFragments.push(s);
            }
        }

        const finalFragments: string[] = [];
        templateFragments.forEach(tf => {
            let finalFragment = "";
            Object.keys(collectionItem).forEach(key => {
                if (tf.includes(`data.${key}`)) {
                    // finalFragments.push(collectionItem[key])
                    finalFragment = collectionItem[key];
                }
            });
            if (finalFragment) {
                finalFragments.push(finalFragment);
            } else {
                finalFragments.push(tf);
            }
        });

        // console.log("finalFragments");
        // console.log(finalFragments);
        return finalFragments.join("");
    }

    // Empty return statement
    return "";
}

// TODO - move into @codotype/core
// TODO - rename as `applyDataPreviewTemplate`
function applyCollectionTemplate(props: {
    collectionItem: any;
    collectionTemplate: CollectionTemplate;
}): string {
    const { collectionItem, collectionTemplate } = props;

    // Defines variable for return value
    let returnValue: null | string = null;

    collectionTemplate.rules.forEach((rule: DefinitionModel) => {
        // Skip others if returnValue is already defined
        if (returnValue !== null) {
            return;
        }

        // Handle EQUALS
        if (shouldEvalAction({ rule, collectionItem })) {
            returnValue = evalAction({ rule, collectionItem });
        }
    });

    // return "Template Goes Here";
    return returnValue || "";
}

// TODO - verify against `previewTemplate`
// TODO - rename as `TemplateRenderer?
export function CollectionTemplateRenderer(props: {
    collectionItem: any; // TODO - type for this
    collectionTemplate: CollectionTemplate;
}) {
    const { collectionTemplate } = props;
    const { variant } = collectionTemplate;
    const compiledTemplate = applyCollectionTemplate(props);

    if (compiledTemplate === "") {
        return null;
    }

    // Handle CollectionTemplateVariant
    if (variant === CollectionTemplateVariant.CODE_DARK) {
        return (
            <pre className="mb-0 py-1 px-2 bg-dark text-light rounded">
                {compiledTemplate}
            </pre>
        );
    }

    if (variant === CollectionTemplateVariant.CODE_LIGHT) {
        return (
            <pre className="mb-0 py-1 px-2 bg-light border-dark text-dark rounded border border-dark">
                {compiledTemplate}
            </pre>
        );
    }

    if (variant === CollectionTemplateVariant.BADGE_DARK) {
        return (
            <span className="px-2 py-1 bg-dark text-light rounded">
                {compiledTemplate}
            </span>
        );
    }

    if (variant === CollectionTemplateVariant.BADGE_LIGHT) {
        return (
            <span className="px-2 py-1 bg-light text-dark rounded border border-dark">
                {compiledTemplate}
            </span>
        );
    }

    // return <pre>{JSON.stringify(props.collectionItem, null, 4)}</pre>;
    return <pre>{compiledTemplate}</pre>;
}

// // // //

interface CollectionItem {
    id: string;
    [key: string]: OptionValue;
}

// // // //

function CollectionItemForm(props: {
    properties: ConfigurationGroupProperty[];
    value: CollectionItem;
    onSubmit: (updatedCollectionItem: CollectionItem) => void;
    onCancel: () => void;
}) {
    // TODO - make sure to define a default value here
    const [formValues, setFormValues] = React.useState<CollectionItem>(
        props.value,
    );

    // Updates formValues state when props.value changes
    // TODO - make sure to define a default value here
    React.useEffect(() => {
        setFormValues({
            ...props.value,
        });
    }, [props.value.id]);

    return (
        <div className="card card-body">
            <ConfigurationGroupPropertiesInput
                properties={props.properties}
                onChange={updatedValue => {
                    setFormValues({
                        ...formValues,
                        ...updatedValue,
                    });
                }}
                value={formValues}
            />

            <hr />

            {/* TEST COLLECTION EDITOR */}
            <CollectionTemplateRenderer
                collectionItem={formValues}
                collectionTemplate={collectionTemplateForApiActions}
            />

            <hr />
            <div className="d-flex justify-content-end">
                <button
                    className="btn btn-success"
                    onClick={() => {
                        props.onSubmit(formValues);
                    }}
                >
                    Submit
                </button>

                <button
                    className="btn btn-secondary ml-2"
                    onClick={() => {
                        props.onCancel();
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

// // // //

interface ConfigurationCollectionInputProps {
    properties: ConfigurationGroupProperty[];
    // label: string;
    value: OptionValue;
    identifiers: TokenPluralization;
    onChange: (updatedVal: OptionValue) => void;
}

export function ConfigurationCollectionInput(
    props: ConfigurationCollectionInputProps,
) {
    const { identifiers } = props;

    // Stores the current value of the collection
    // TODO - remove any type here
    const [collectionValue, setCollectionValue] = React.useState<any>(
        props.value,
    );

    // Invokes props.onChange when collectionValue changes
    React.useEffect(() => {
        props.onChange(collectionValue);
    }, [collectionValue]);

    // Invokes props.onChange when collectionValue changes
    React.useEffect(() => {
        setNewCollectionItem(null);
        setEditCollectionItem(null);
        setCollectionValue(props.value);
    }, [props.value]);

    // New + Edit hooks
    const [
        newCollectionItem,
        setNewCollectionItem,
    ] = React.useState<CollectionItem | null>(null);
    const [
        editCollectionItem,
        setEditCollectionItem,
    ] = React.useState<CollectionItem | null>(null);

    // TODO - should this be abstracted outside the component?
    function buildNewCollectionItem() {
        return props.properties.reduce(
            (val, property) => {
                return {
                    ...val,
                    [property.identifier]: buildConfigurationGroupPropertyValue(
                        property,
                    ),
                };
            },
            { id: "" },
        );
    }

    const showList = editCollectionItem === null && newCollectionItem === null;

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="row">
                    {showList && (
                        <div className="col-sm-12">
                            <button
                                className="btn btn-block btn-primary"
                                onClick={() => {
                                    setEditCollectionItem(null);
                                    setNewCollectionItem(
                                        buildNewCollectionItem(),
                                    );
                                }}
                            >
                                New {identifiers.singular.label}
                            </button>

                            <ul className="list-group mt-3">
                                {collectionValue.map(
                                    (
                                        collectionItem: CollectionItem,
                                        i: number,
                                    ) => {
                                        return (
                                            <li
                                                key={String(i)}
                                                className={classnames(
                                                    "list-group-item list-group-item-action",
                                                    {
                                                        active:
                                                            editCollectionItem !==
                                                                null &&
                                                            collectionItem.id ===
                                                                editCollectionItem.id,
                                                    },
                                                )}
                                                onClick={() => {
                                                    setNewCollectionItem(null);
                                                    setEditCollectionItem(
                                                        collectionItem,
                                                    );
                                                }}
                                            >
                                                <div className="d-flex justify-content-between">
                                                    <CollectionTemplateRenderer
                                                        collectionItem={
                                                            collectionItem
                                                        }
                                                        collectionTemplate={
                                                            collectionTemplateForApiActions
                                                        }
                                                    />
                                                    {/* <pre className="bg-dark text-light rounded p-2 mb-0">
                                                        {JSON.stringify(
                                                            collectionItem,
                                                        )}
                                                    </pre> */}
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={e => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            const updatedCollection = collectionValue.filter(
                                                                (
                                                                    c: CollectionItem,
                                                                ) =>
                                                                    c.id !==
                                                                    collectionItem.id,
                                                            );
                                                            setCollectionValue(
                                                                updatedCollection,
                                                            );
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrashAlt}
                                                        />
                                                    </button>
                                                </div>
                                            </li>
                                        );
                                    },
                                )}

                                {collectionValue.length === 0 && (
                                    <li className="list-group-item">
                                        No {identifiers.plural.label} defined
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                    <div className="col-sm-12">
                        {newCollectionItem !== null && (
                            <CollectionItemForm
                                value={newCollectionItem}
                                properties={props.properties}
                                onSubmit={updatedCollectionItem => {
                                    // Updates collectionValue
                                    setCollectionValue([
                                        ...collectionValue,
                                        {
                                            ...updatedCollectionItem,
                                            id: makeUniqueId(),
                                        },
                                    ]);

                                    // Clears newCollectionItem
                                    setNewCollectionItem(null);
                                }}
                                onCancel={() => {
                                    setNewCollectionItem(null);
                                }}
                            />
                        )}

                        {editCollectionItem !== null && (
                            <CollectionItemForm
                                value={editCollectionItem}
                                properties={props.properties}
                                onSubmit={updatedCollectionItem => {
                                    // Updates collectionValue
                                    setCollectionValue(
                                        // @ts-ignore
                                        collectionValue.map(c => {
                                            if (
                                                c.id === editCollectionItem.id
                                            ) {
                                                return updatedCollectionItem;
                                            }
                                            return c;
                                        }),
                                    );

                                    // Clears newCollectionItem
                                    setEditCollectionItem(null);
                                }}
                                onCancel={() => {
                                    setEditCollectionItem(null);
                                }}
                            />
                        )}
                    </div>
                    {/* <pre>{JSON.stringify(props.configurationGroup, null, 4)}</pre> */}
                </div>
            </div>
        </div>
    );
}
