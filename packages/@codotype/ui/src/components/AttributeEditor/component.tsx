import * as React from "react";
import { SortableListHeader } from "../SortableListHeader";
import {
    Datatype,
    AttributeAddon,
    AttributeInput,
    Primitives,
    makeUniqueId,
    buildDefaultAddonsValue,
    validateAttribute,
    SchemaInput,
} from "@codotype/core";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { AttributeFormModal } from "./AttributeFormModal";
import { AttributeDeleteModal } from "./AttributeDeleteModal";
import { AttributeListItem } from "./AttributeListItem";
import { AttributeForm } from "./AttributeForm";
import { Hotkey } from "../Hotkey";
import { reorder } from "./reorder";
import { SortableListEmpty } from "../SortableListEmpty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard } from "@fortawesome/free-regular-svg-icons";

// // // //

/**
 * disableSubmit
 * @param label
 */
export function disableSubmit(params: {
    attributeInput: AttributeInput;
    attributeCollection: AttributeInput[];
}): boolean {
    return validateAttribute(params).length > 0;
}

// // // //

interface AttributeEditorState {
    attributes: AttributeInput[];
    lastUpdatedAt: null | number;
}

interface AttributeEditorProps {
    selectedSchema: SchemaInput;
    attributes: AttributeInput[];
    addons: AttributeAddon[];
    supportedDatatypes: Datatype[];
    onChange: (updatedAttributes: AttributeInput[]) => void;
}

export function AttributeEditor(props: AttributeEditorProps) {
    const [state, setState] = React.useState<AttributeEditorState>({
        attributes: props.attributes,
        lastUpdatedAt: null,
    });
    const [attributeInput, setAttributeInput] = React.useState<AttributeInput>(
        new Primitives.AttributeInput({ id: "" }),
    );
    const [
        showingDeleteModal,
        showDeleteModal,
    ] = React.useState<AttributeInput | null>(null);
    const [showingInputModal, showInputModal] = React.useState<boolean>(false);

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
    function saveAttribute(params: {
        saveAndContinue: boolean;
        newAttributeData: AttributeInput;
    }) {
        // Insert new Attribute
        if (
            params.newAttributeData.id === "" ||
            params.newAttributeData.id === null
        ) {
            if (params.newAttributeData.datatype === null) {
                return;
            }

            const newAttributeParams = {
                ...params.newAttributeData,
                id: makeUniqueId(),
                datatype: params.newAttributeData.datatype,
                addons: {
                    ...buildDefaultAddonsValue({
                        properties: props.addons.map(a => a.property),
                    }),
                    ...params.newAttributeData.addons,
                },
            };

            const newAttribute: AttributeInput = new Primitives.AttributeInput(
                newAttributeParams,
            );

            setState({
                lastUpdatedAt: Date.now(),
                attributes: [...props.attributes, newAttribute],
            });

            setAttributeInput(new Primitives.AttributeInput({ id: "" }));
            if (params.saveAndContinue) {
                setTimeout(() => {
                    setAttributeInput(
                        new Primitives.AttributeInput({ id: "" }),
                    );
                }, 150);
                return;
            }

            showInputModal(false);
            return;
        }

        // Update existing attribute
        setState({
            lastUpdatedAt: Date.now(),
            attributes: props.attributes.map((a: AttributeInput) => {
                if (a.id === params.newAttributeData.id) {
                    return params.newAttributeData;
                }
                return a;
            }),
        });
        setAttributeInput(new Primitives.AttributeInput({ id: "" }));
    }

    // // // //

    return (
        <div
            className="card"
            style={{
                borderBottom: "none",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
            }}
        >
            <SortableListHeader
                label="Attributes"
                tooltip={
                    <p>
                        <FontAwesomeIcon icon={faKeyboard} className="pr-2" />
                        <span className="font-light">{"SHIFT + A"}</span>
                    </p>
                }
                locked={props.selectedSchema.locked}
                onClick={() => {
                    const newAttribute: AttributeInput = new Primitives.AttributeInput(
                        { id: "" },
                    );
                    setAttributeInput(newAttribute);
                    showInputModal(true);
                }}
            />
            {/* Renders AttributeFormModal */}
            <AttributeFormModal
                attributeInput={attributeInput}
                show={showingInputModal}
                disableSubmit={disableSubmit({
                    attributeInput,
                    attributeCollection: props.attributes,
                })}
                errors={validateAttribute({
                    attributeInput,
                    attributeCollection: props.attributes,
                })}
                onCancel={() => {
                    showInputModal(false);
                    // Leave a lil' room for the Modal-Close UI animation!
                    setTimeout(() => {
                        setAttributeInput(
                            new Primitives.AttributeInput({ id: "" }),
                        );
                    }, 300);
                }}
                onSubmit={({ saveAndContinue }) => {
                    saveAttribute({
                        saveAndContinue,
                        newAttributeData: {
                            ...attributeInput,
                        },
                    });
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
                        saveAttribute({
                            saveAndContinue: true,
                            newAttributeData: attributeInput,
                        });
                    }}
                    addons={props.addons}
                    supportedDatatypes={props.supportedDatatypes}
                />
            </AttributeFormModal>

            {props.attributes.length > 0 && (
                <React.Fragment>
                    <AttributeDeleteModal
                        show={showingDeleteModal !== null}
                        onClose={() => showDeleteModal(null)}
                        onConfirm={() => {
                            if (showingDeleteModal !== null) {
                                setState({
                                    attributes: props.attributes.filter(
                                        (a: AttributeInput) => {
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

                            const updatedAttributes = reorder<AttributeInput>(
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
                                        className="flex flex-col pl-0 mb-0 rounded-none"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {props.attributes.map(
                                            (
                                                a: AttributeInput,
                                                index: number,
                                            ) => {
                                                return (
                                                    <AttributeListItem
                                                        key={a.id}
                                                        attribute={a}
                                                        index={index}
                                                        addons={props.addons}
                                                        onClickEdit={(
                                                            attributeToBeEdited: AttributeInput,
                                                        ) => {
                                                            setAttributeInput({
                                                                ...attributeToBeEdited,
                                                            });
                                                            showInputModal(
                                                                true,
                                                            );
                                                        }}
                                                        onClickDelete={(
                                                            attributeToDelete: AttributeInput,
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
                <SortableListEmpty
                    title="No Attributes added yet"
                    body="Define properties on this data model"
                    cta="Add Attribute"
                    onClick={() => {
                        const newAttribute: AttributeInput = new Primitives.AttributeInput(
                            { id: "" },
                        );
                        setAttributeInput(newAttribute);
                        showInputModal(true);
                    }}
                />
            )}
            <Hotkey
                keyName="shift+a"
                onKeyDown={() => {
                    const newAttribute: AttributeInput = new Primitives.AttributeInput(
                        { id: "" },
                    );
                    setAttributeInput(newAttribute);
                    showInputModal(true);
                }}
            />
        </div>
    );
}
