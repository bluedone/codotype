import * as React from "react";
import { SchemaEditButton } from "./SchemaEditButton";
import { SchemaDeleteButton } from "./SchemaDeleteButton";
import { SchemaDeleteModal } from "./SchemaDeleteModal";
import { SchemaInput, ProjectInput } from "@codotype/core";

// // // //

export function SchemaDetailHeader(props: {
    schemaInput: SchemaInput;
    projectInput: ProjectInput;
    schemas: SchemaInput[];
    onClickEdit: () => void;
    onConfirmDelete: () => void;
}) {
    const [showDeleteModal, showModal] = React.useState(false);
    return (
        <div className="row d-flex items-center mb-2">
            <div className="col-lg-10">
                <div className="d-flex items-center">
                    <h4 className="mb-0 text-2xl">
                        {props.schemaInput.identifiers.singular.title}
                        <span className="text-muted ml-2">Schema</span>
                    </h4>
                    <SchemaEditButton
                        schema={props.schemaInput}
                        onClick={props.onClickEdit}
                    />
                </div>
            </div>
            <div className="col-lg-2 d-flex justify-content-end">
                <SchemaDeleteButton
                    projectInput={props.projectInput}
                    schemaInput={props.schemaInput}
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
        </div>
    );
}
