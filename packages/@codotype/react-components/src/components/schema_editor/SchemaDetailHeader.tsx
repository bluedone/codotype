import * as React from "react";
import { SchemaEditButton } from "./SchemaEditButton";
import { SchemaDeleteButton } from "./SchemaDeleteButton";
import { SchemaDeleteModal } from "./SchemaDeleteModal";
import { Schema } from "../types";

// // // //

export function SchemaDetailHeader(props: {
    schema: Schema;
    onClickEdit: () => void;
    onConfirmDelete: () => void;
}) {
    const [showDeleteModal, showModal] = React.useState(false);
    return (
        <div className="row mb-2">
            <div className="col-lg-10">
                <h4 className="mb-0">
                    {props.schema.tokens.label} Schema
                    <SchemaEditButton
                        schema={props.schema}
                        onClick={props.onClickEdit}
                    />
                </h4>
            </div>
            <div className="col-lg-2 d-flex justify-content-end">
                <SchemaDeleteButton
                    schema={props.schema}
                    onClick={() => showModal(true)}
                />

                <SchemaDeleteModal
                    show={showDeleteModal}
                    onClose={() => showModal(false)}
                    onConfirmDelete={() => {
                        showModal(false);
                        props.onConfirmDelete();
                    }}
                />
            </div>
            <div className="col-lg-12">
                <small className="text-muted">
                    Describe the{" "}
                    <strong>{props.schema.tokens.label} Schema</strong> with{" "}
                    <strong>Attributes</strong> and <strong>Relations</strong>
                </small>
                {/* <hr /> */}
            </div>
        </div>
    );
}
