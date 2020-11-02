import * as React from "react";
import { SchemaEditButton } from "./SchemaEditButton";
import { SchemaDeleteButton } from "./SchemaDeleteButton";
import { SchemaDeleteModal } from "./SchemaDeleteModal";
import { SchemaInput, Schema } from "@codotype/core";

// // // //

export function SchemaDetailHeader(props: {
    schemaInput: SchemaInput;
    schemas: SchemaInput[];
    onClickEdit: () => void;
    onConfirmDelete: () => void;
}) {
    const [showDeleteModal, showModal] = React.useState(false);
    return (
        <React.Fragment>
            <div className="row d-flex align-items-center">
                <div className="col-lg-10">
                    <div className="d-flex align-items-center">
                        <h4 className="mb-0">
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
                        schemaInput={props.schemaInput}
                        schemas={props.schemas}
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
            <div className="row mb-2">
                <div className="col-lg-12">
                    <hr />
                </div>
            </div>
        </React.Fragment>
    );
}
