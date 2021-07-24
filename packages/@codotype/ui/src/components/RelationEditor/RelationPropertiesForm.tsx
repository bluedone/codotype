import * as React from "react";
import { RelationDatatypeForm } from "./RelationDatatypeForm";
import {
    SchemaInput,
    RelationType,
    RELATION_META,
    sanitizeTitle,
    buildRelation,
    RelationInput,
    RelationTypes,
} from "@codotype/core";
import { RelationBadge } from "./RelationBadge";

// // // //

function getSourceLabel(props: {
    schema: SchemaInput;
    relationInput: RelationInput;
}): string {
    const { relationInput, schema } = props;
    if (relationInput.type === RelationTypes.HAS_AND_BELONGS_TO_MANY) {
        return schema.identifiers.plural.title;
    }
    return schema.identifiers.singular.title;
}

function getDestinationLabel(props: {
    schema: SchemaInput;
    relationInput: RelationInput;
}): string {
    const { relationInput, schema } = props;
    if (
        [
            RelationTypes.HAS_AND_BELONGS_TO_MANY,
            RelationTypes.TO_MANY,
            RelationTypes.HAS_MANY,
            // @ts-ignore
        ].includes(relationInput.type)
    ) {
        return schema.identifiers.plural.title;
    }
    return schema.identifiers.singular.title;
}

// // // //

/**
 * RelationPropertiesFormProps
 * CHORE - annotate remaining props
 */
interface RelationPropertiesFormProps {
    schema: SchemaInput;
    schemas: SchemaInput[];
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

    // Defines relationInput.destinationSchemaID if it's not present
    if (relationInput.destinationSchemaID === "" && schemas.length > 0) {
        props.onChange({
            ...relationInput,
            destinationSchemaID: schemas[0].id,
        });
    }

    // Locates destination schema
    const destinationSchema = schemas.find(
        s => s.id === relationInput.destinationSchemaID,
    );

    return (
        <React.Fragment>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                    <div className="mb-0 text-blue-500 text-center">
                        <label className="mb-0">
                            {schema.identifiers.singular.title}
                        </label>
                        <p className="text-sm text-blue-500">
                            Where the relational data is stored
                        </p>
                        <select
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={relationInput.sourceSchemaID}
                            onChange={e => {
                                props.onChange({
                                    ...relationInput,
                                    sourceSchemaID: e.currentTarget.value,
                                });
                            }}
                        >
                            {schemas
                                .filter(s => s.locked === false)
                                .map(s => (
                                    <option key={s.id} value={s.id}>
                                        {getSourceLabel({
                                            schema: s,
                                            relationInput,
                                        })}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div className="col-span-4">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12">
                            <div className="mb-0 text-center mb-0">
                                <label className="mb-0">
                                    {RELATION_META[relationInput.type].label}
                                </label>
                                <p className="text-sm text-muted mb-0">
                                    {
                                        RELATION_META[relationInput.type]
                                            .description
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grud grid-cols-12 gap-4">
                        <div className="col-span-12">
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

                <div className="col-span-4">
                    <div className="mb-0 text-center">
                        <label className="mb-0 text-indigo-500">
                            Related Schema
                        </label>
                        <div className="text-sm text-indigo-500">
                            Schema referenced by this relation
                        </div>
                        <select
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={relationInput.destinationSchemaID}
                            onChange={e => {
                                props.onChange({
                                    ...relationInput,
                                    destinationSchemaID: e.currentTarget.value,
                                });
                            }}
                        >
                            {schemas.map(s => (
                                <option key={s.id} value={s.id}>
                                    {getDestinationLabel({
                                        schema: s,
                                        relationInput,
                                    })}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                    <input
                        className="form-control mt-3"
                        placeholder="Source Schema Alias"
                        value={relationInput.sourceSchemaAlias}
                        onChange={e => {
                            props.onChange({
                                ...relationInput,
                                sourceSchemaAlias: sanitizeTitle(
                                    e.currentTarget.value,
                                ),
                            });
                        }}
                    />
                </div>
                <div
                    className="col-span-4 text-center"
                    style={{ visibility: "hidden" }}
                />
                <div className="col-span-4">
                    <input
                        className="form-control mt-3"
                        placeholder="Destination Schema Alias"
                        value={relationInput.destinationSchemaAlias}
                        onChange={e => {
                            props.onChange({
                                ...relationInput,
                                destinationSchemaAlias: sanitizeTitle(
                                    e.currentTarget.value,
                                ),
                            });
                        }}
                    />
                </div>
            </div>
            {destinationSchema !== undefined && (
                <div className="grid grid-cols-1">
                    <div className="col-span-1 mt-3">
                        <hr />
                    </div>
                    <div className="col-span-1">
                        <div className="flex justify-center my-3">
                            <RelationBadge
                                direction="out"
                                relation={buildRelation({
                                    sourceSchema: props.schema,
                                    relationInput: relationInput,
                                    destinationSchema: destinationSchema,
                                })}
                                slim={true}
                            />
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}
