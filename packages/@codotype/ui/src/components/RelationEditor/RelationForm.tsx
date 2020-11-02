import { RelationPropertiesForm } from "./RelationPropertiesForm";
import { RelationInput, RelationType, SchemaInput } from "@codotype/core";
import * as React from "react";

// // // //

/**
 * RelationFormProps
 * `relationInput` - the `Attribute` currently being edited
 * `supportedRelationTypes` - the unique IDs of supported datatypes made available in the form
 */
interface RelationFormProps {
    selectedSchema: SchemaInput;
    schema: SchemaInput;
    schemas: SchemaInput[];
    relations: RelationInput[];
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
