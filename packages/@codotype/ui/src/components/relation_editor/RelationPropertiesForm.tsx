import * as React from "react";
import { Schema, RelationType } from "@codotype/types";
import { RelationDatatypeForm } from "./RelationDatatypeForm";
import { RelationInput } from "./RelationFormModal";

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

    return (
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
                        <div className="form-group mb-2 text-center">
                            <label className="mb-0">
                                {schema.identifiers.singular.label}
                            </label>
                            {/* <small className="form-text text-muted mb-0">{ schema.description }</small> */}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        {/* <div className="btn-group w-100"> */}
                        <RelationDatatypeForm
                            type={relationInput.type}
                            supportedRelationTypes={supportedRelationTypes}
                            onChangeRelationType={(
                                updatedRelationType: RelationType,
                            ) => {
                                console.log("CHANGE TYPE");
                                console.log(updatedRelationType);
                                props.onChange({
                                    ...relationInput,
                                    type: updatedRelationType,
                                });
                            }}
                        />
                        {/* <b-button
                    v-for="relation in filteredRelationTypes"
                    :key="relation.id"
                    @click="setRelationType(relation.id)"
                    size="sm"
                    variant="outline-primary"
                    :className="relation.id === model.type ? 'active' : ''"
                  >
                    <img className='relation-thumbnail' :src=" relation.id === model.type ? 'https://res.cloudinary.com/codotype/image/upload/v1551448517/codotype-icons/' + relation.id.toLowerCase() + '_active' + '.png' : 'https://res.cloudinary.com/codotype/image/upload/v1551448517/codotype-icons/' + relation.id.toLowerCase() + '.png'"/>
                  </b-button> */}
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
    );
}
