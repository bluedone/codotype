import * as React from "react";
import { SortableListHeader } from "../SortableListHeader";
import {
    SchemaInput,
    Relation,
    RelationInput,
    RelationType,
    Primatives,
} from "@codotype/core";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { RelationFormModal } from "./RelationFormModal";
import { RelationDeleteModal } from "./RelationDeleteModal";
import { RelationListItem } from "./RelationListItem";
import { RelationForm } from "./RelationForm";
import { RelationListEmpty } from "./RelationListEmpty";
import { reorder } from "../AttributeEditor/reorder";
import { Hotkey } from "../Hotkey";

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
    relations: RelationInput[];
    schemas: SchemaInput[];
    selectedSchema: SchemaInput;
    relationReferences: Relation[];
    supportedRelationTypes: RelationType[];
    onChange: (updatedAttributes: RelationInput[]) => void;
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

    return (
        <div
            className="card"
            style={{
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
            }}
        >
            <Hotkey
                keyName="shift+r"
                onKeyDown={() => {
                    setRelationInput(new Primatives.Relation({ id: "" }));
                }}
            />

            <SortableListHeader
                tooltip={"shift+r"}
                label="Relations"
                onClick={() => {
                    setRelationInput(
                        new Primatives.Relation({
                            id: "",
                            sourceSchemaID: props.selectedSchema.id,
                        }),
                    );
                }}
                rounded={false}
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
                        // Insert new Relation
                        if (
                            relationInput.id === ""
                        ) {
                            const newRelation: RelationInput = new Primatives.Relation(
                                {
                                    sourceSchemaID:
                                        relationInput.sourceSchemaID,
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
                            setRelationInput(null);
                            return;
                        }

                        // Update existing relation
                        setState({
                            lastUpdatedAt: Date.now(),
                            relations: props.relations.map(
                                (a: RelationInput) => {
                                    if (a.id === relationInput.id) {
                                        return relationInput;
                                    }
                                    return a;
                                },
                            ),
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
                                        className="list-group list-group-flush"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {relationReferences.map(
                                            (a: Relation, index: number) => {
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
            {showEmptyState && (
                <RelationListEmpty
                    onClick={() => {
                        setRelationInput(new Primatives.Relation({ id: "", sourceSchemaID: props.selectedSchema.id }));
                    }}
                />
            )}
        </div>
    );
}
