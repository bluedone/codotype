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
    SchemaSource,
    GeneratorMeta,
} from "@codotype/types";
import { reorder } from "../attribute_editor/component";
import { buildDefaultConfiguration } from "@codotype/util";
import { validateSchema } from "./validateSchema";

// // // //

interface EditorState {
    schemas: Schema[];
    lastUpdatedAt: null | number;
}

/**
 * SchemaEditorLayout
 * @param props.schemas
 * @param props.onChange
 */
export function SchemaEditorLayout(props: {
    schemas: Schema[];
    generatorMeta: GeneratorMeta;
    onChange: (updatedSchemas: Schema[]) => void;
}) {
    const [showModal, setShowModal] = React.useState(false);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [
        newTokenPluralization,
        setNewTokenPluralization,
    ] = React.useState<TokenPluralization | null>(null);
    const [state, setState] = React.useState<EditorState>({
        schemas: props.schemas,
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
    const selectedSchema: Schema | undefined = state.schemas.find(
        (s: Schema) => {
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
        const newSchema: Schema = {
            id: Math.random().toString(), // TODO - replace with UUID function from util
            attributes: [],
            relations: [],
            removable: true,
            locked: false,
            source: SchemaSource.USER,
            identifiers: newTokenPluralization,
            configuration: buildDefaultConfiguration(
                props.generatorMeta.schemaEditorConfiguration
                    .configurationGroups,
            ),
        };

        // Defines updated schemas, including NEW schema
        const updatedSchemas: Schema[] = [...state.schemas, newSchema];

        // Updates state.schemas with the latest schemas
        setState({
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
        const updatedSchema: Schema = {
            ...selectedSchema,
            identifiers: newTokenPluralization,
        };

        // Defines updated schemas, including NEW schema
        const updatedSchemas: Schema[] = state.schemas.map((s: Schema) => {
            if (s.id === updatedSchema.id) {
                return updatedSchema;
            }
            return s;
        });

        // Updates state.schemas with the latest schemas
        setState({
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
            <div className="rowm px-4 py-4">
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
                                newTokenPluralization.singular.label === ""
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

        const updatedSchemas = reorder<Schema>(
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
                        setShowModal(true);
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
                        onChange={(updatedSelectedSchema: Schema) => {
                            setSelectedSchemaId(updatedSelectedSchema.id);
                        }}
                    />
                </DragDropContext>
            </div>
            <div className="col-lg-8 pl-md-0">
                <div
                    className="card card-body shadow-sm"
                    // style={{ borderLeft: "6px solid #4e92fc" }}
                >
                    <SchemaDetail
                        schema={selectedSchema}
                        schemas={state.schemas}
                        generatorMeta={props.generatorMeta}
                        onSelectSchema={(nextSelectedSchemaId: UUID) => {
                            setSelectedSchemaId(nextSelectedSchemaId);
                        }}
                        onChange={(updatedSchema: Schema) => {
                            // Defines updatedSchemas to include `updatedSchema`
                            const updatedSchemas: Schema[] = state.schemas.map(
                                (s: Schema) => {
                                    if (s.id === selectedSchemaId) {
                                        return updatedSchema;
                                    }
                                    return s;
                                },
                            );

                            // Updates local state
                            setState({
                                lastUpdatedAt: Date.now(),
                                schemas: updatedSchemas,
                            });
                        }}
                        onClickEdit={() => {
                            setShowEditModal(true);
                        }}
                        onConfirmDelete={() => {
                            // Defines updatedSchemas without `selectedSchema`
                            const updatedSchemas: Schema[] = state.schemas.filter(
                                (s: Schema) => {
                                    return s.id !== selectedSchemaId;
                                },
                            );

                            // Updates local state
                            setState({
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
                        label={selectedSchema.identifiers.singular.label}
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
