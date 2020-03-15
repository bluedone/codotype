import * as React from "react";
import { SchemaPreview } from "./SchemaPreview";
import { AttributeEditor } from "../attribute_editor";
import { RelationEditor } from "../relation_editor";
import { SchemaDetailHeader } from "./SchemaDetailHeader";
import { Schema } from "../types";

// // // //

export function SchemaDetail(props: {
    schema: Schema;
    onClickEdit: () => void;
    onConfirmDelete: () => void;
}) {
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
                <AttributeEditor attributes={props.schema.attributes} />
            </div>
            <div className="pl-md-0 col-sm-12 col-md-6 col-lg-6">
                <RelationEditor />
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
