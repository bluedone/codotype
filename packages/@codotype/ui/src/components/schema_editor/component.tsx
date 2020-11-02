import * as React from "react";
import { SchemaSelector } from "./SchemaSelector";
import { SchemaDetail } from "./SchemaDetail";
import { SchemaNewButton } from "./SchemaNewButton";
import { DragDropContext } from "react-beautiful-dnd";
import { SchemaFormModal } from "./SchemaFormModal";
import { SchemaForm } from "./SchemaForm";
import {
    Schema,
    TokenPluralization,
    UUID,
    CreatedByValues,
    PluginMetadata,
    buildDefaultConfiguration,
    SchemaInput,
    Primatives,
    ProjectInput,
    RelationInput,
} from "@codotype/core";
import { reorder } from "../attribute_editor/component";
import { validateSchema } from "./validateSchema";

// // // //

interface EditorState {
    schemas: SchemaInput[];
    relations: RelationInput[];
    lastUpdatedAt: null | number;
}

/**
 * SchemaEditorLayout
 * @param props.projectInput
 * @param props.schemas
 * @param props.pluginMetadata
 * @param props.onChange
 */
export function SchemaEditorLayout(props: {
    projectInput: ProjectInput;
    schemas: SchemaInput[];
    pluginMetadata: PluginMetadata;
    onChange: (updatedSchemas: SchemaInput[]) => void;
    onChangeRelations: (updatedRelations: RelationInput[]) => void;
}) {
    const [showModal, setShowModal] = React.useState(false);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [
        newTokenPluralization,
        setNewTokenPluralization,
    ] = React.useState<TokenPluralization | null>(null);
    const [state, setState] = React.useState<EditorState>({
        schemas: props.schemas,
        relations: props.projectInput.relations,
        lastUpdatedAt: null,
    });
    const [selectedSchemaId, setSelectedSchemaId] = React.useState<UUID | null>(
        null,
    );

    // Update state.schemas when props.schemas changes
    React.useEffect(() => {
        setState({ ...state, schemas: props.schemas });
    }, [props.schemas]);

    // Invoke props.onChange when state.schemas has updated
    React.useEffect(() => {
        props.onChange(state.schemas);
    }, [state.lastUpdatedAt]);

    // Sets selectedSchemaId if none is defined
    if (state.schemas[0] && selectedSchemaId == null) {
        setSelectedSchemaId(state.schemas[0].id);
        return null;
    }

    // Defines selectedSchema
    const selectedSchema: SchemaInput | undefined = state.schemas.find(
        (s: SchemaInput) => {
            return s.id === selectedSchemaId;
        },
    );

    // Defines handler for creating new schemas
    function createNewSchema() {
        // Short-circuit if newTokenPluralization is null
        if (newTokenPluralization === null) {
            return;
        }

        // Defines new schema
        const newSchema: SchemaInput = new Primatives.Schema({
            attributes: [
                // TODO - do a proper deep-copy here
                ...props.pluginMetadata.schemaEditorConfiguration
                    .newSchemaDefaults.attributes,
            ],
            locked: false,
            createdBy: CreatedByValues.user,
            identifiers: newTokenPluralization,
            configuration: buildDefaultConfiguration(
                props.pluginMetadata.schemaEditorConfiguration
                    .configurationGroups,
            ),
        });

        // TODO - add a mechanism here to update ProjectInput.relations with a new default RelationInput pulled from PluginMetadata.schema
        // TODO - add a mechanism here to update ProjectInput.relations with a new default RelationInput pulled from PluginMetadata.schema
        // TODO - add a mechanism here to update ProjectInput.relations with a new default RelationInput pulled from PluginMetadata.schema

        // Defines updated schemas, including NEW schema
        const updatedSchemas: SchemaInput[] = [...state.schemas, newSchema];

        // Updates state.schemas with the latest schemas
        setState({
            ...state,
            lastUpdatedAt: Date.now(),
            schemas: updatedSchemas,
        });

        // Select the newly created schema
        setSelectedSchemaId(newSchema.id);

        // Clears newTokenPluralization
        setShowModal(false);
        setNewTokenPluralization(null);
    }

    // Defines handler for updating existing schemas
    function updateExistingSchema() {
        // Short-circuit if newTokenPluralization is null
        if (newTokenPluralization === null) {
            return;
        }

        if (!selectedSchema) {
            return;
        }

        // Defines updatedSchema
        const updatedSchema: SchemaInput = {
            ...selectedSchema,
            identifiers: newTokenPluralization,
        };

        // Defines updated schemas, including NEW schema
        const updatedSchemas: SchemaInput[] = state.schemas.map(
            (s: SchemaInput) => {
                if (s.id === updatedSchema.id) {
                    return updatedSchema;
                }
                return s;
            },
        );

        // Updates state.schemas with the latest schemas
        setState({
            ...state,
            lastUpdatedAt: Date.now(),
            schemas: updatedSchemas,
        });

        // Closes edit modal
        setShowEditModal(false);

        // Clears newTokenPluralization
        setNewTokenPluralization(null);
    }

    // Last check to ensure that selectedSchema _can_ be defined
    // NOTE - this should be simpler + combined with the above
    if (selectedSchema === undefined && state.schemas.length > 0) {
        setSelectedSchemaId(state.schemas[0].id);
    }

    // Show empty state
    if (selectedSchemaId === null || selectedSchema === undefined) {
        // return <SchemaEditorEmptyState />;
        return (
            <div className="row d-flex px-4 py-4 justify-content-center align-items-center">
                <div className="col-sm-8">
                    <div className="card card-body">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-lg-12">
                                <h4>New Schema</h4>

                                <SchemaForm
                                    label={""}
                                    onChange={updatedTokens => {
                                        setNewTokenPluralization(updatedTokens);
                                    }}
                                    onKeydownEnter={() => {
                                        createNewSchema();
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-12 text-right mt-2">
                            <button
                                className="btn btn-primary"
                                disabled={
                                    newTokenPluralization === null ||
                                    newTokenPluralization.singular.title === ""
                                }
                                onClick={() => {
                                    createNewSchema();
                                }}
                            >
                                Create Schema
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Defines onDragEnd callback for <DragDropContext />
    function onDragEnd(result: any) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const updatedSchemas = reorder<SchemaInput>(
            state.schemas,
            result.source.index,
            result.destination.index,
        );

        setState({
            ...state,
            lastUpdatedAt: Date.now(),
            schemas: updatedSchemas,
        });
    }

    // Render schema editor layout
    return (
        <div className="row mt-3">
            <div className="col-lg-4">
                <SchemaNewButton
                    onClick={() => {
                        if (showModal === false) {
                            setShowModal(true);
                        }
                    }}
                />

                {/* Render SchemaForm + SchemaFormModal for CREATE Schema */}
                <SchemaFormModal
                    renderNewTitle
                    show={showModal}
                    handleClose={() => {
                        setShowModal(false);
                    }}
                    onSubmit={() => {
                        createNewSchema();
                    }}
                    errors={validateSchema({
                        schemaCollection: props.schemas,
                        tokenPluralization: newTokenPluralization,
                    })}
                >
                    <SchemaForm
                        label={""}
                        onChange={updatedTokens => {
                            setNewTokenPluralization(updatedTokens);
                        }}
                        onKeydownEnter={() => {
                            createNewSchema();
                        }}
                    />
                </SchemaFormModal>

                <DragDropContext onDragEnd={onDragEnd}>
                    <SchemaSelector
                        schemas={state.schemas}
                        selectedSchemaId={String(selectedSchemaId)}
                        onChange={(updatedSelectedSchema: SchemaInput) => {
                            setSelectedSchemaId(updatedSelectedSchema.id);
                        }}
                    />
                </DragDropContext>
            </div>
            <div className="col-lg-8 pl-3 pl-lg-0 mt-4 mt-lg-0">
                <div className="card card-body shadow-sm">
                    <SchemaDetail
                        schema={selectedSchema}
                        projectInput={props.projectInput}
                        pluginMetadata={props.pluginMetadata}
                        onSelectSchema={(nextSelectedSchemaId: UUID) => {
                            setSelectedSchemaId(nextSelectedSchemaId);
                        }}
                        onChangeRelations={(
                            updatedRelations: RelationInput[],
                        ) => {
                            props.onChangeRelations(updatedRelations);
                        }}
                        onChange={(updatedSchema: SchemaInput) => {
                            // Defines updatedSchemas to include `updatedSchema`
                            const updatedSchemas: SchemaInput[] = state.schemas.map(
                                (s: SchemaInput) => {
                                    if (s.id === selectedSchemaId) {
                                        return updatedSchema;
                                    }
                                    return s;
                                },
                            );

                            // Updates local state
                            setState({
                                ...state,
                                lastUpdatedAt: Date.now(),
                                schemas: updatedSchemas,
                            });
                        }}
                        onClickEdit={() => {
                            setShowEditModal(true);
                        }}
                        onConfirmDelete={() => {
                            // Defines updatedSchemas without `selectedSchema`
                            const updatedSchemas: SchemaInput[] = state.schemas.filter(
                                (s: SchemaInput) => {
                                    return s.id !== selectedSchemaId;
                                },
                            );

                            // Updates local state
                            setState({
                                ...state,
                                lastUpdatedAt: Date.now(),
                                schemas: updatedSchemas,
                            });

                            // Sets selectedSchemaId to null
                            setSelectedSchemaId(null);
                        }}
                    />
                </div>

                {/* Render SchemaForm + SchemaFormModal for UPDATE Schema */}
                <SchemaFormModal
                    show={showEditModal}
                    handleClose={() => {
                        setShowEditModal(false);
                    }}
                    onSubmit={() => {
                        updateExistingSchema();
                    }}
                    errors={validateSchema({
                        schemaCollection: props.schemas,
                        tokenPluralization: newTokenPluralization,
                    })}
                >
                    <SchemaForm
                        label={selectedSchema.identifiers.singular.title}
                        onChange={updatedTokens => {
                            setNewTokenPluralization(updatedTokens);
                        }}
                        onKeydownEnter={() => {
                            updateExistingSchema();
                        }}
                    />
                </SchemaFormModal>
            </div>
        </div>
    );
}
