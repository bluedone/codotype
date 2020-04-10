import * as React from "react";
import { SortableListHeader } from "../sortable_list_header";
import {
    Relation,
    DEFAULT_RELATION,
    Schema,
    RelationType,
} from "@codotype/types";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { RelationFormModal, RelationInput } from "./RelationFormModal";
import { RelationDeleteModal } from "./RelationDeleteModal";
import { RelationListItem } from "./RelationListItem";
import { RelationForm } from "./RelationForm";
import { RelationListEmpty } from "./RelationListEmpty";
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
export function disableSubmit(relationInput: RelationInput): boolean {
    return relationInput.type === null;
}

// // // //

interface RelationEditorState {
    relations: Relation[];
    lastUpdatedAt: null | number;
}

interface RelationEditorProps {
    relations: Relation[];
    selectedSchema: Schema;
    supportedRelationTypes: RelationType[];
    onChange: (updatedAttributes: Relation[]) => void;
}

export function RelationEditor(props: RelationEditorProps) {
    const [state, setState] = React.useState<RelationEditorState>({
        relations: props.relations,
        lastUpdatedAt: null,
    });
    const [
        relationInput,
        setRelationInput,
    ] = React.useState<RelationInput | null>(null);
    const [
        showingDeleteModal,
        showDeleteModal,
    ] = React.useState<Relation | null>(null);

    // Sets props.relations when props.relations changes
    React.useEffect(() => {
        setState({ ...state, relations: props.relations });
    }, [props.relations]);

    // Fires off props.onChange
    React.useEffect(() => {
        props.onChange(state.relations);
    }, [state.lastUpdatedAt]);

    // // // //

    return (
        <div className="card">
            <SortableListHeader
                label="Relations"
                onClick={() => {
                    setRelationInput({ ...DEFAULT_RELATION });
                }}
            />

            {/* Renders RelationFormModal */}
            {relationInput !== null && (
                <RelationFormModal
                    relationInput={relationInput}
                    show={relationInput !== null}
                    disableSubmit={disableSubmit(relationInput)}
                    // disableSubmit={false}
                    onCancel={() => {
                        setRelationInput(null);
                    }}
                    onSubmit={() => {
                        setRelationInput(null);
                        // Insert new Attribute
                        if (relationInput.id === "") {
                            const newAttribute: Relation = {
                                ...relationInput,
                                id: uniqueId("ATTR_"),
                            };
                            setState({
                                lastUpdatedAt: Date.now(),
                                relations: [...props.relations, newAttribute],
                            });
                            setRelationInput(null);
                            return;
                        }

                        // Update existing relation
                        setState({
                            lastUpdatedAt: Date.now(),
                            relations: props.relations.map((a: Relation) => {
                                if (a.id === relationInput.id) {
                                    return relationInput;
                                }
                                return a;
                            }),
                        });
                        setRelationInput(null);
                    }}
                >
                    <RelationForm
                        relations={props.relations}
                        relationInput={relationInput}
                        onChange={(updatedRelationInput: RelationInput) => {
                            setRelationInput(updatedRelationInput);
                        }}
                        supportedRelationTypes={props.supportedRelationTypes}
                    />
                </RelationFormModal>
            )}

            {props.relations.length > 0 && (
                <React.Fragment>
                    <RelationDeleteModal
                        show={showingDeleteModal !== null}
                        onClose={() => showDeleteModal(null)}
                        onConfirm={() => {
                            if (showingDeleteModal !== null) {
                                setState({
                                    relations: props.relations.filter(
                                        (a: Relation) => {
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

                            const updatedAttributes = reorder<Relation>(
                                props.relations,
                                result.source.index,
                                result.destination.index,
                            );

                            // Invoke props.onChange directly, prevents multiple re-renders
                            props.onChange(updatedAttributes);
                        }}
                    >
                        <Droppable droppableId="relation-list">
                            {(provided: any) => {
                                return (
                                    <ul
                                        className="list-group list-group-flush"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {props.relations.map(
                                            (a: Relation, index: number) => {
                                                return (
                                                    <RelationListItem
                                                        key={a.id}
                                                        relation={a}
                                                        selectedSchema={
                                                            props.selectedSchema
                                                        }
                                                        index={index}
                                                        onClickEdit={(
                                                            relationToBeEdited: Relation,
                                                        ) => {
                                                            setRelationInput({
                                                                ...relationToBeEdited,
                                                            });
                                                        }}
                                                        onClickDelete={(
                                                            relationToDelete: Relation,
                                                        ) => {
                                                            showDeleteModal(
                                                                relationToDelete,
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
            {props.relations.length === 0 && (
                <RelationListEmpty
                    onClick={() => {
                        setRelationInput({ ...DEFAULT_RELATION });
                    }}
                />
            )}
        </div>
    );
}
