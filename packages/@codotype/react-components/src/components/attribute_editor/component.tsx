import * as React from "react";
import { SortableListHeader } from "../sortable_list_header";
import { Attribute, Datatype, DEFAULT_ATTRIBUTE } from "@codotype/types";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { AttributeFormModal, AttributeInput } from "./AttributeFormModal";
import { AttributeDeleteModal } from "./AttributeDeleteModal";
import { AttributeListItem } from "./AttributeListItem";
import { AttributeForm } from "./AttributeForm";
import { AttributeListEmpty } from "./AttributeListEmpty";
import uniqueId from "lodash.uniqueid";

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
 * disableSubmit
 * @param label
 */
export function disableSubmit(attributeInput: AttributeInput): boolean {
    return (
        attributeInput.label === "" ||
        attributeInput.identifier === "" ||
        attributeInput.datatype === null
    );
}

// // // //

interface AttributeEditorState {
    attributes: Attribute[];
    lastUpdatedAt: null | number;
}

interface AttributeEditorProps {
    attributes: Attribute[];
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

    return (
        <div className="card">
            <SortableListHeader
                label="Attributes"
                onClick={() => {
                    setAttributeInput({
                        id: DEFAULT_ATTRIBUTE.id,
                        label: DEFAULT_ATTRIBUTE.label,
                        identifier: DEFAULT_ATTRIBUTE.identifier,
                        required: DEFAULT_ATTRIBUTE.required,
                        unique: DEFAULT_ATTRIBUTE.unique,
                        description: DEFAULT_ATTRIBUTE.description,
                        datatype: DEFAULT_ATTRIBUTE.datatype,
                        default_value: DEFAULT_ATTRIBUTE.datatype,
                        datatypeOptions: DEFAULT_ATTRIBUTE.datatypeOptions,
                        locked: DEFAULT_ATTRIBUTE.locked,
                    });
                }}
            />

            {/* Renders AttributeFormModal */}
            {attributeInput !== null && (
                <AttributeFormModal
                    attributeInput={attributeInput}
                    show={attributeInput !== null}
                    disableSubmit={disableSubmit(attributeInput)}
                    // disableSubmit={false}
                    onCancel={() => {
                        setAttributeInput(null);
                    }}
                    onSubmit={() => {
                        setAttributeInput(null);
                        // Insert new Attribute
                        if (attributeInput.id === "") {
                            const newAttribute: Attribute = {
                                ...attributeInput,
                                id: uniqueId("ATTR_"),
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
                                if (a.id === attributeInput.id) {
                                    return attributeInput;
                                }
                                return a;
                            }),
                        });
                        setAttributeInput(null);
                    }}
                >
                    <AttributeForm
                        attributes={props.attributes}
                        attributeInput={attributeInput}
                        onChange={(updatedAttributeInput: AttributeInput) => {
                            setAttributeInput(updatedAttributeInput);
                        }}
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
        </div>
    );
}
