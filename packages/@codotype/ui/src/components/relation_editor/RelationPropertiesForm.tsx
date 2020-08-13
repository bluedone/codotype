import * as React from "react";
import { RelationDatatypeForm } from "./RelationDatatypeForm";
import { RelationInput } from "./RelationFormModal";
import { Schema, RelationType, RELATION_META, sanitizeLabel, buildRelationReference } from "@codotype/core";
import { RelationBadge } from "./RelationBadge";

// // // //

/**
 * RelationPropertiesFormProps
 * TODO - annotate remaining props
 */
interface RelationPropertiesFormProps {
    schema: Schema;
    schemas: Schema[];
    relationInput: RelationInput;
    onChange: (updatedRelationInput: RelationInput) => void;
    supportedRelationTypes: RelationType[];
}

/**
 * RelationPropertiesForm
 * @param props - see `RelationPropertiesFormProps`
 */
export function RelationPropertiesForm(props: RelationPropertiesFormProps) {
    const { schema, schemas, relationInput, supportedRelationTypes } = props;

    // Defines relationInput.destinationSchemaId if it's not present
    if (relationInput.destinationSchemaId === "" && schemas.length > 0) {
        props.onChange({
            ...relationInput,
            destinationSchemaId: schemas[0].id,
        });
    }

    // Locates destination schema
    const destinationSchema = props.schemas.find(
        s => s.id === relationInput.destinationSchemaId,
    );

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-lg-4">
                    <div className="form-group text-primary text-center">
                        <label className="mb-0">
                            {schema.identifiers.singular.label}
                        </label>
                        <small className="form-text text-primary">
                            Where the relational data is stored
                        </small>
                        <input
                            type="text"
                            className="form-control border-primary text-primary"
                            disabled
                            value={schema.identifiers.singular.label}
                        />
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group text-center mb-0">
                                <label className="mb-0">
                                    {RELATION_META[relationInput.type].label}
                                </label>
                                <small className="form-text text-muted mb-0">
                                    {
                                        RELATION_META[relationInput.type]
                                            .description
                                    }
                                </small>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <RelationDatatypeForm
                                type={relationInput.type}
                                supportedRelationTypes={supportedRelationTypes}
                                onChangeRelationType={(
                                    updatedRelationType: RelationType,
                                ) => {
                                    props.onChange({
                                        ...relationInput,
                                        type: updatedRelationType,
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="form-group text-center">
                        <label className="mb-0 text-info">Related Schema</label>
                        <small className="form-text text-info">
                            Schema referenced by this relation
                        </small>
                        <select
                            className="form-control border-info text-info"
                            v-model="model.related_schema_id"
                            value={relationInput.destinationSchemaId}
                            onChange={e => {
                                console.log("onChange related schema");
                                props.onChange({
                                    ...relationInput,
                                    destinationSchemaId: e.currentTarget.value,
                                });
                            }}
                        >
                            {/* TODO - use correct pluralization here depending on relationInput.type */}
                            {schemas.map(s => (
                                <option key={s.id} value={s.id}>
                                    {s.identifiers.plural.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <input
                        className="form-control"
                        placeholder="Source Schema Alias"
                        value={relationInput.sourceSchemaAlias}
                        onChange={e => {
                            props.onChange({
                                ...relationInput,
                                sourceSchemaAlias: sanitizeLabel(
                                    e.currentTarget.value,
                                ),
                            });
                        }}
                    />
                </div>
                <div
                    className="col-sm-4 text-center"
                    style={{ visibility: "hidden" }}
                />
                <div className="col-sm-4">
                    <input
                        className="form-control"
                        placeholder="Destination Schema Alias"
                        value={relationInput.destinationSchemaAlias}
                        onChange={e => {
                            props.onChange({
                                ...relationInput,
                                destinationSchemaAlias: sanitizeLabel(
                                    e.currentTarget.value,
                                ),
                            });
                        }}
                    />
                </div>
            </div>
            {destinationSchema !== undefined && (
                <div className="row">
                    <div className="col-lg-12">
                        <hr />
                    </div>
                    <div className="col-lg-12 text-center">
                        <RelationBadge
                            direction="out"
                            relation={buildRelationReference({
                                relation: relationInput,
                                sourceSchema: props.schema,
                                destinationSchema: destinationSchema,
                            })}
                            slim={false}
                        />
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}
