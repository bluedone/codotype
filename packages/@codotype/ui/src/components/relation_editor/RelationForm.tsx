import { RelationPropertiesForm } from "./RelationPropertiesForm";
import { Relation, RelationType, Schema } from "@codotype/core";
import * as React from "react";
import { RelationInput } from "./RelationFormModal";

// // // //

/**
 * RelationFormProps
 * `relationInput` - the `Attribute` currently being edited
 * `supportedRelationTypes` - the unique IDs of supported datatypes made available in the form
 */
interface RelationFormProps {
    selectedSchema: Schema;
    schema: Schema;
    schemas: Schema[];
    relations: Relation[];
    relationInput: RelationInput;
    supportedRelationTypes: RelationType[];
    onChange: (updatedRelationInput: RelationInput) => void;
}

/**
 * RelationForm
 * @param props - see `RelationFormProps`
 */
export function RelationForm(props: RelationFormProps) {
    const { relationInput, supportedRelationTypes } = props;

    if (supportedRelationTypes[0] && !relationInput.type) {
        props.onChange({ ...relationInput, type: supportedRelationTypes[0] });
        return null;
    }

    return (
        <div className="row">
            <div className="col-lg-12">
                <RelationPropertiesForm
                    relationInput={props.relationInput}
                    supportedRelationTypes={props.supportedRelationTypes}
                    schema={props.schema}
                    schemas={props.schemas}
                    onChange={(updatedRelationInput: RelationInput) => {
                        props.onChange({
                            ...relationInput,
                            ...updatedRelationInput,
                        });
                    }}
                />
            </div>
        </div>
    );
}
