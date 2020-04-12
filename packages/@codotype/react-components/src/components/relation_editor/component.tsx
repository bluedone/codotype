import * as React from "react";
import { SortableListHeader } from "../sortable_list_header";
import {
    Relation,
    DEFAULT_RELATION,
    Schema,
    RelationReference,
    RelationType,
} from "@codotype/types";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { RelationFormModal, RelationInput } from "./RelationFormModal";
import { RelationDeleteModal } from "./RelationDeleteModal";
import { RelationListItem } from "./RelationListItem";
import { RelationForm } from "./RelationForm";
import { RelationListEmpty } from "./RelationListEmpty";

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
    schemas: Schema[];
    selectedSchema: Schema;
    relationReferences: RelationReference[];
    supportedRelationTypes: RelationType[];
    onChange: (updatedAttributes: Relation[]) => void;
}

export function RelationEditor(props: RelationEditorProps) {
    const { selectedSchema, schemas, relationReferences } = props;
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
                    onCancel={() => {
                        setRelationInput(null);
                    }}
                    onSubmit={() => {
                        // Insert new Attribute
                        // TODO - fix this null check, should be removed
                        if (
                            relationInput.id === "" ||
                            relationInput.id === null
                        ) {
                            const newAttribute: Relation = {
                                ...relationInput,
                                id: Math.random().toString(), // TODO - replace with UUID function from @codotype/util
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
                        schema={selectedSchema}
                        schemas={schemas}
                        selectedSchema={selectedSchema}
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
                                        {relationReferences.map(
                                            (
                                                a: RelationReference,
                                                index: number,
                                            ) => {
                                                return (
                                                    <RelationListItem
                                                        key={a.id}
                                                        relation={a}
                                                        selectedSchema={
                                                            props.selectedSchema
                                                        }
                                                        schemas={schemas}
                                                        index={index}
                                                        onClickEdit={(
                                                            relationToBeEdited: RelationReference,
                                                        ) => {
                                                            const relation:
                                                                | Relation
                                                                | undefined = props.relations.find(
                                                                r =>
                                                                    r.id ===
                                                                    relationToBeEdited.sourceRelationId,
                                                            );
                                                            if (
                                                                relation ===
                                                                undefined
                                                            ) {
                                                                return;
                                                            }
                                                            setRelationInput({
                                                                ...relation,
                                                            });
                                                        }}
                                                        onClickDelete={(
                                                            relationToDelete: RelationReference,
                                                        ) => {
                                                            const relation:
                                                                | Relation
                                                                | undefined = props.relations.find(
                                                                r =>
                                                                    r.id ===
                                                                    relationToDelete.sourceRelationId,
                                                            );
                                                            if (
                                                                relation ===
                                                                undefined
                                                            ) {
                                                                return;
                                                            }
                                                            showDeleteModal({
                                                                ...relation,
                                                            });
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
