import * as React from "react";
import { SchemaPreview } from "./SchemaPreview";
import { AttributeEditor } from "../attribute_editor";
import { RelationEditor } from "../relation_editor";
import { SchemaDetailHeader } from "./SchemaDetailHeader";
import { Schema } from "../types";
// // // //

export function SchemaDetail(props: {
    schema: Schema;
    onConfirmDelete: () => void;
}) {
    return (
        <div className="row" style={{ borderLeft: "1px solid lightgrey" }}>
            <div className="col-sm-12">
                <SchemaDetailHeader
                    schema={props.schema}
                    onConfirmDelete={props.onConfirmDelete}
                />
            </div>

            <div className="col-sm-6">
                <AttributeEditor attributes={props.schema.attributes} />
            </div>
            <div className="col-sm-6">
                <RelationEditor />
            </div>
            <div className="col-sm-6">
                <SchemaPreview />
            </div>
            <div className="col-sm-6">
                <p>Incoming Relations</p>
            </div>
        </div>
    );
}
