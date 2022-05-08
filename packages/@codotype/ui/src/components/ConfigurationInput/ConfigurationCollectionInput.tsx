import * as React from "react";
import {
    ConfigurationPropertyValue,
    ConfigurationProperty,
    TokenPluralization,
    buildConfigurationPropertyValue,
    makeUniqueId,
    PropertyPreview,
} from "@codotype/core";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { ConfigurationGroupPropertiesInput } from "./ConfigurationGroupPropertiesInput";
import { PropertyPreviewRenderer } from "../PropertyPreviewRenderer";

// // // //

interface CollectionItem {
    id: string;
    [key: string]: ConfigurationPropertyValue;
}

// // // //

function CollectionItemForm(props: {
    properties: ConfigurationProperty[];
    value: CollectionItem;
    dataPreview: PropertyPreview;
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
        <div className="card card-body rounded-lg">
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
            <PropertyPreviewRenderer
                data={formValues}
                propertyPreview={props.dataPreview}
            />
            <hr />

            <div className="flex justify-end">
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
    properties: ConfigurationProperty[];
    value: ConfigurationPropertyValue;
    identifiers: TokenPluralization;
    propertyPreview: PropertyPreview;
    onChange: (updatedVal: ConfigurationPropertyValue) => void;
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
                    [property.identifier]: buildConfigurationPropertyValue(
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
                                className="btn w-full btn-primary"
                                onClick={() => {
                                    setEditCollectionItem(null);
                                    setNewCollectionItem(
                                        buildNewCollectionItem(),
                                    );
                                }}
                            >
                                New {identifiers.singular.title}
                            </button>

                            <ul className="flex flex-col pl-0 mb-0 rounded mt-3">
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
                                                <div className="flex justify-between">
                                                    <PropertyPreviewRenderer
                                                        data={collectionItem}
                                                        propertyPreview={
                                                            props.propertyPreview
                                                        }
                                                    />
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
                                        No {identifiers.plural.title} defined
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
                                dataPreview={props.propertyPreview}
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
                                dataPreview={props.propertyPreview}
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
