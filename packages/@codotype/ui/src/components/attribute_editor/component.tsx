import * as React from "react";
import { SortableListHeader } from "../sortable_list_header";
import {
    Attribute,
    Datatype,
    DEFAULT_ATTRIBUTE,
    SchemaSource,
    AttributeAddon,
    AttributeAddonValue,
    Schema,
    buildTokenCasing
} from "@codotype/core";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { AttributeFormModal, AttributeInput } from "./AttributeFormModal";
import { AttributeDeleteModal } from "./AttributeDeleteModal";
import { AttributeListItem } from "./AttributeListItem";
import { AttributeForm } from "./AttributeForm";
import { AttributeListEmpty } from "./AttributeListEmpty";
import { validateAttribute } from "./validateAttribute";
import { Hotkey } from "../hotkey";

// // // //

// TODO - abstract this into a separate module
export function reorder<T>(
    list: T[],
    startIndex: number,
    endIndex: number,
): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}

// // // //

/**
 * buildDefaultAddonValue
 * Builds the default value for attribute.addons
 * @param addons
 */
export function buildDefaultAddonValue(
    addons: AttributeAddon[],
): AttributeAddonValue {
    const addonValue: AttributeAddonValue = addons.reduce(
        (av: AttributeAddonValue, addon: AttributeAddon) => {
            return {
                ...av,
                [addon.identifier]: addon.defaultValue,
            };
        },
        {},
    );
    return addonValue;
}

/**
 * disableSubmit
 * @param label
 */
export function disableSubmit(params: {
    attributeInput: AttributeInput;
    attributeCollection: Attribute[];
}): boolean {
    return validateAttribute(params).length > 0;
}

/**
 * validateAttribute
 * @param params
 */
// export function validateAttribute(params: {
//     attributeInput: AttributeInput;
//     attributeCollection: Attribute[];
// }): boolean {
//     const { attributeInput, attributeCollection } = params;
//     return (
//         attributeInput.identifiers.label !== "" &&
//         attributeInput.identifiers.snake !== "" &&
//         attributeInput.datatype !== null &&
//         !attributeCollection.some(
//             a => a.identifiers.label === attributeInput.identifiers.label,
//         )
//     );
// }

// // // //

interface AttributeEditorState {
    attributes: Attribute[];
    lastUpdatedAt: null | number;
}

interface AttributeEditorProps {
    attributes: Attribute[];
    addons: AttributeAddon[];
    supportedDatatypes: Datatype[];
    onChange: (updatedAttributes: Attribute[]) => void;
}

export function AttributeEditor(props: AttributeEditorProps) {
    const [state, setState] = React.useState<AttributeEditorState>({
        attributes: props.attributes,
        lastUpdatedAt: null,
    });
    const [
        attributeInput,
        setAttributeInput,
    ] = React.useState<AttributeInput | null>(null);
    const [
        showingDeleteModal,
        showDeleteModal,
    ] = React.useState<Attribute | null>(null);

    // Sets props.attributes when props.attributes changes
    React.useEffect(() => {
        setState({ ...state, attributes: props.attributes });
    }, [props.attributes]);

    // Fires off props.onChange
    React.useEffect(() => {
        props.onChange(state.attributes);
    }, [state.lastUpdatedAt]);

    // // // //
    // Defines saveAttribute function
    function saveAttribute(params: { attributeInput: AttributeInput }) {
        // Insert new Attribute
        if (params.attributeInput.id === "") {
            const newAttribute: Attribute = {
                ...params.attributeInput,
                addons: {
                    ...buildDefaultAddonValue(props.addons),
                    ...params.attributeInput.addons,
                },
                // TODO - replace with UUID function from @codotype/core
                id: Math.random().toString(),
            };
            setState({
                lastUpdatedAt: Date.now(),
                attributes: [...props.attributes, newAttribute],
            });
            setAttributeInput(null);
            return;
        }

        // Update existing attribute
        setState({
            lastUpdatedAt: Date.now(),
            attributes: props.attributes.map((a: Attribute) => {
                if (a.id === params.attributeInput.id) {
                    return params.attributeInput;
                }
                return a;
            }),
        });
        setAttributeInput(null);
    }

    // // // //

    return (
        <div className="card">
            <SortableListHeader
                label="Attributes"
                tooltip="shift+a"
                onClick={() => {
                    setAttributeInput({
                        id: DEFAULT_ATTRIBUTE.id,
                        datatype: DEFAULT_ATTRIBUTE.datatype,
                        defaultValue: DEFAULT_ATTRIBUTE.datatype,
                        identifiers: buildTokenCasing(
                            DEFAULT_ATTRIBUTE.identifiers.label,
                        ),
                        internalNote: DEFAULT_ATTRIBUTE.internalNote,
                        locked: DEFAULT_ATTRIBUTE.locked,
                        source: SchemaSource.USER,
                        addons: {},
                    });
                }}
            />
            {/* Renders AttributeFormModal */}
            {attributeInput !== null && (
                <AttributeFormModal
                    attributeInput={attributeInput}
                    show={attributeInput !== null}
                    disableSubmit={disableSubmit({
                        attributeInput,
                        attributeCollection: props.attributes,
                    })}
                    errors={validateAttribute({
                        attributeInput,
                        attributeCollection: props.attributes,
                    })}
                    onCancel={() => {
                        setAttributeInput(null);
                    }}
                    onSubmit={() => {
                        saveAttribute({ attributeInput });
                    }}
                >
                    <AttributeForm
                        attributes={props.attributes}
                        attributeInput={attributeInput}
                        onChange={(updatedAttributeInput: AttributeInput) => {
                            setAttributeInput(updatedAttributeInput);
                        }}
                        onKeydownEnter={() => {
                            if (
                                disableSubmit({
                                    attributeInput,
                                    attributeCollection: props.attributes,
                                })
                            ) {
                                return;
                            }
                            // Save attribute on keydown "Enter"
                            saveAttribute({ attributeInput });
                        }}
                        addons={props.addons}
                        supportedDatatypes={props.supportedDatatypes}
                    />
                </AttributeFormModal>
            )}
            {props.attributes.length > 0 && (
                <React.Fragment>
                    <AttributeDeleteModal
                        show={showingDeleteModal !== null}
                        onClose={() => showDeleteModal(null)}
                        onConfirm={() => {
                            if (showingDeleteModal !== null) {
                                setState({
                                    attributes: props.attributes.filter(
                                        (a: Attribute) => {
                                            return (
                                                a.id !== showingDeleteModal.id
                                            );
                                        },
                                    ),
                                    lastUpdatedAt: Date.now(),
                                });
                            }

                            showDeleteModal(null);
                        }}
                    />

                    <DragDropContext
                        onDragEnd={result => {
                            if (!result.destination) {
                                return;
                            }

                            if (
                                result.destination.index === result.source.index
                            ) {
                                return;
                            }

                            const updatedAttributes = reorder<Attribute>(
                                props.attributes,
                                result.source.index,
                                result.destination.index,
                            );

                            // Invoke props.onChange directly, prevents multiple re-renders
                            props.onChange(updatedAttributes);
                        }}
                    >
                        <Droppable droppableId="attribute-list">
                            {(provided: any) => {
                                return (
                                    <ul
                                        className="list-group list-group-flush"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {props.attributes.map(
                                            (a: Attribute, index: number) => {
                                                return (
                                                    <AttributeListItem
                                                        key={a.id}
                                                        attribute={a}
                                                        index={index}
                                                        onClickEdit={(
                                                            attributeToBeEdited: Attribute,
                                                        ) => {
                                                            setAttributeInput({
                                                                ...attributeToBeEdited,
                                                            });
                                                        }}
                                                        onClickDelete={(
                                                            attributeToDelete: Attribute,
                                                        ) => {
                                                            showDeleteModal(
                                                                attributeToDelete,
                                                            );
                                                        }}
                                                    />
                                                );
                                            },
                                        )}
                                        {provided.placeholder}
                                    </ul>
                                );
                            }}
                        </Droppable>
                    </DragDropContext>
                </React.Fragment>
            )}
            {/* Render empty state */}
            {props.attributes.length === 0 && (
                <AttributeListEmpty
                    onClick={() => {
                        setAttributeInput({ ...DEFAULT_ATTRIBUTE });
                    }}
                />
            )}
            <Hotkey
                keyName="shift+a"
                onKeyDown={() => {
                    setAttributeInput({
                        id: DEFAULT_ATTRIBUTE.id,
                        datatype: DEFAULT_ATTRIBUTE.datatype,
                        defaultValue: DEFAULT_ATTRIBUTE.datatype,
                        identifiers: buildTokenCasing(
                            DEFAULT_ATTRIBUTE.identifiers.label,
                        ),
                        internalNote: DEFAULT_ATTRIBUTE.internalNote,
                        locked: DEFAULT_ATTRIBUTE.locked,
                        source: SchemaSource.USER,
                        addons: {},
                    });
                }}
            />
        </div>
    );
}
