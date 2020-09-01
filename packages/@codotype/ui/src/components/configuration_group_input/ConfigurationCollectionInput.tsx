import * as React from "react";
import {
    OptionValue,
    ConfigurationGroupProperty,
    TokenPluralization,
    buildConfigurationGroupPropertyValue,
    makeUniqueId,
    DataPreview,
} from "@codotype/core";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { ConfigurationGroupPropertiesInput } from "./ConfigurationGroupPropertiesInput";
import { DataPreviewRenderer } from "../DataPreviewRenderer";

// // // //

interface CollectionItem {
    id: string;
    [key: string]: OptionValue;
}

// // // //

function CollectionItemForm(props: {
    properties: ConfigurationGroupProperty[];
    value: CollectionItem;
    dataPreview: DataPreview;
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
            <DataPreviewRenderer
                data={formValues}
                dataPreview={props.dataPreview}
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
    dataPreview: DataPreview;
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
                                                    <DataPreviewRenderer
                                                        data={collectionItem}
                                                        dataPreview={
                                                            props.dataPreview
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
                                dataPreview={props.dataPreview}
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
                                dataPreview={props.dataPreview}
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
