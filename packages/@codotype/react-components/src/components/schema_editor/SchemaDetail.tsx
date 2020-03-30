import * as React from "react";
import { SchemaPreview } from "./SchemaPreview";
import { AttributeEditor } from "../attribute_editor";
import { RelationEditor } from "../relation_editor";
import { SchemaDetailHeader } from "./SchemaDetailHeader";
import { Schema, Attribute, Relation, Datatype } from "../types";

// // // //

interface SchemaDetailProps {
    schema: Schema;
    onChange: (updatedSchema: Schema) => void;
    onClickEdit: () => void;
    onConfirmDelete: () => void;
}

/**
 * SchemaDetail
 * @param props - see `SchemaDetailProps`
 */
export function SchemaDetail(props: SchemaDetailProps) {
    return (
        <div className="row" style={{ borderLeft: "1px solid lightgrey" }}>
            <div className="col-sm-12">
                <SchemaDetailHeader
                    schema={props.schema}
                    onClickEdit={props.onClickEdit}
                    onConfirmDelete={props.onConfirmDelete}
                />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6">
                <AttributeEditor
                    attributes={props.schema.attributes}
                    supportedDatatypes={[Datatype.STRING, Datatype.NUMERIC]}
                    onChange={(updatedAttributes: Attribute[]) => {
                        // Defines updated schema
                        const updatedSchema: Schema = {
                            ...props.schema,
                            attributes: updatedAttributes,
                        };

                        // Passes into `props.onChange`
                        props.onChange(updatedSchema);
                    }}
                />
            </div>
            <div className="pl-md-0 col-sm-12 col-md-6 col-lg-6">
                <RelationEditor
                    selectedSchema={props.schema}
                    relations={props.schema.relations}
                    supportedDatatypes={[Datatype.STRING, Datatype.NUMERIC]}
                    onChange={(updatedRelations: Relation[]) => {
                        // Defines updated schema
                        const updatedSchema: Schema = {
                            ...props.schema,
                            relations: updatedRelations,
                        };

                        // Passes into `props.onChange`
                        props.onChange(updatedSchema);
                    }}
                />
            </div>
            <div className="col-sm-6">
                <SchemaPreview schema={props.schema} />
            </div>
            <div className="col-sm-6">
                <p>Incoming Relations</p>
            </div>
        </div>
    );
}
