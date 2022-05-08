import * as React from "react";
import { SortableListHeader } from "../SortableListHeader";
import {
    SchemaInput,
    Relation,
    RelationInput,
    RelationType,
    Primitives,
    RelationAddon,
} from "@codotype/core";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { RelationFormModal } from "./RelationFormModal";
import { RelationDeleteModal } from "./RelationDeleteModal";
import { RelationListItem } from "./RelationListItem";
import { RelationForm } from "./RelationForm";
import { reorder } from "../AttributeEditor/reorder";
import { SortableListEmpty } from "../SortableListEmpty";
import { validateRelation } from "./validateRelation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard } from "@fortawesome/free-solid-svg-icons";

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
    relations: RelationInput[];
    lastUpdatedAt: null | number;
}

interface RelationEditorProps {
    // TODO - update this to accept project + projectInput + pluginMetadata?
    relations: RelationInput[];
    schemas: SchemaInput[];
    selectedSchema: SchemaInput;
    relationReferences: Relation[];
    relationAddons: RelationAddon[];
    supportedRelationTypes: RelationType[];
    onChange: (updatedAttributes: RelationInput[]) => void;
}

export function RelationEditor(props: RelationEditorProps) {
    const {
        selectedSchema,
        relationAddons,
        schemas,
        relationReferences,
    } = props;
    const [state, setState] = React.useState<RelationEditorState>({
        relations: props.relations,
        lastUpdatedAt: null,
    });
    const [relationInput, setRelationInput] = React.useState<RelationInput>(
        new Primitives.Relation({
            id: "",
            sourceSchemaID: props.selectedSchema.id,
        }),
    );
    const [showingInputModal, showInputModal] = React.useState(false);
    const [
        showingDeleteModal,
        showDeleteModal,
    ] = React.useState<RelationInput | null>(null);

    // Sets props.relations when props.relations changes
    React.useEffect(() => {
        setState({ ...state, relations: props.relations });
    }, [props.relations]);

    // Fires off props.onChange
    React.useEffect(() => {
        props.onChange(state.relations);
    }, [state.lastUpdatedAt]);

    // // // //

    const showEmptyState: boolean =
        props.relations.filter(
            r => r.sourceSchemaID === props.selectedSchema.id,
        ).length === 0;

    const errors = validateRelation({
        relationInput,
        relationCollection: props.relations,
    });

    return (
        <div
            className="card border-gray-200 rounded-2xl"
            style={{
                borderTop: "none",
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
            }}
        >
            <SortableListHeader
                label="Relations"
                locked={props.selectedSchema.locked}
                onClick={() => {
                    setRelationInput(
                        new Primitives.Relation({
                            id: "",
                            sourceSchemaID: props.selectedSchema.id,
                        }),
                    );
                    showInputModal(true);
                }}
                rounded={false}
            />

            {/* Renders RelationFormModal */}
            <RelationFormModal
                relationInput={relationInput}
                show={showingInputModal}
                disableSubmit={
                    disableSubmit(relationInput) || errors.length > 0
                }
                errors={errors}
                onCancel={() => {
                    showInputModal(false);

                    setTimeout(() => {
                        setRelationInput(
                            new Primitives.Relation({
                                id: "",
                                sourceSchemaID: props.selectedSchema.id,
                            }),
                        );
                    }, 300);
                }}
                onSubmit={() => {
                    // Short-circuit if validation fails
                    if (errors.length > 0) {
                        return;
                    }

                    // Insert new Relation
                    if (relationInput.id === "") {
                        const newRelation: RelationInput = new Primitives.Relation(
                            {
                                sourceSchemaID: relationInput.sourceSchemaID,
                                destinationSchemaID:
                                    relationInput.destinationSchemaID,
                                sourceSchemaAlias:
                                    relationInput.sourceSchemaAlias,
                                destinationSchemaAlias:
                                    relationInput.destinationSchemaAlias,
                                type: relationInput.type,
                            },
                        );

                        setState({
                            lastUpdatedAt: Date.now(),
                            relations: [...props.relations, newRelation],
                        });
                        setRelationInput(
                            new Primitives.Relation({
                                id: "",
                                sourceSchemaID: props.selectedSchema.id,
                            }),
                        );
                        showInputModal(false);
                        return;
                    }

                    // Update existing relation
                    setState({
                        lastUpdatedAt: Date.now(),
                        relations: props.relations.map((a: RelationInput) => {
                            if (a.id === relationInput.id) {
                                return relationInput;
                            }
                            return a;
                        }),
                    });
                    setRelationInput(
                        new Primitives.Relation({
                            id: "",
                            sourceSchemaID: props.selectedSchema.id,
                        }),
                    );
                    showInputModal(false);
                }}
            >
                <RelationForm
                    relations={props.relations}
                    schema={selectedSchema}
                    relationAddons={props.relationAddons}
                    schemas={schemas}
                    selectedSchema={selectedSchema}
                    relationInput={relationInput}
                    onChange={(updatedRelationInput: RelationInput) => {
                        setRelationInput(updatedRelationInput);
                    }}
                    supportedRelationTypes={props.supportedRelationTypes}
                />
            </RelationFormModal>

            {!showEmptyState && (
                <React.Fragment>
                    <RelationDeleteModal
                        show={showingDeleteModal !== null}
                        onClose={() => showDeleteModal(null)}
                        onConfirm={() => {
                            if (showingDeleteModal !== null) {
                                setState({
                                    relations: props.relations.filter(
                                        (a: RelationInput) => {
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

                            const updatedRelations = reorder<RelationInput>(
                                props.relations,
                                result.source.index,
                                result.destination.index,
                            );

                            // Invoke props.onChange directly, prevents multiple re-renders
                            props.onChange(updatedRelations);
                        }}
                    >
                        <Droppable droppableId="relation-list">
                            {(provided: any) => {
                                return (
                                    <ul
                                        // className="list-group rounded-none"
                                        className="shadow rounded-2xl overflow-hidden rounded-tl-none rounded-tr-none"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {relationReferences.map(
                                            (a: Relation, index: number) => {
                                                return (
                                                    <RelationListItem
                                                        key={a.id}
                                                        relation={a}
                                                        addons={
                                                            props.relationAddons
                                                        }
                                                        selectedSchema={
                                                            props.selectedSchema
                                                        }
                                                        schemas={schemas}
                                                        index={index}
                                                        onClickEdit={(
                                                            relationToBeEdited: Relation,
                                                        ) => {
                                                            const relation:
                                                                | RelationInput
                                                                | undefined = props.relations.find(
                                                                r =>
                                                                    r.id ===
                                                                    relationToBeEdited.sourceRelationInputID,
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
                                                            showInputModal(
                                                                true,
                                                            );
                                                        }}
                                                        onClickDelete={(
                                                            relationToDelete: Relation,
                                                        ) => {
                                                            const relation:
                                                                | RelationInput
                                                                | undefined = props.relations.find(
                                                                r =>
                                                                    r.id ===
                                                                    relationToDelete.sourceRelationInputID,
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
            {/* TODO - handle schema.locked state here */}
            {showEmptyState && (
                <SortableListEmpty
                    title="No Relations added yet"
                    body="Define references between data models"
                    cta="Add Relation"
                    locked={props.selectedSchema.locked}
                    onClick={() => {
                        setRelationInput(
                            new Primitives.Relation({
                                id: "",
                                sourceSchemaID: props.selectedSchema.id,
                            }),
                        );
                        showInputModal(true);
                    }}
                />
            )}
        </div>
    );
}
