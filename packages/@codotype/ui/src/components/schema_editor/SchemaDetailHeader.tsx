import * as React from "react";
import { SchemaEditButton } from "./SchemaEditButton";
import { SchemaDeleteButton } from "./SchemaDeleteButton";
import { SchemaDeleteModal } from "./SchemaDeleteModal";
import { Schema } from "@codotype/types";

// // // //

export function SchemaDetailHeader(props: {
    schema: Schema;
    schemas: Schema[];
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
                            {/* {props.schema.identifiers.singular.label} Schema */}
                            {props.schema.identifiers.singular.label}
                        </h4>
                        <SchemaEditButton
                            schema={props.schema}
                            onClick={props.onClickEdit}
                        />
                    </div>
                </div>
                <div className="col-lg-2 d-flex justify-content-end">
                    <SchemaDeleteButton
                        schema={props.schema}
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
            <div className="row mb-2 mt-2">
                <div className="col-lg-12">
                    <p className="text-muted">
                        Describe the{" "}
                        <strong>
                            {props.schema.identifiers.singular.label} Schema
                        </strong>{" "}
                        with <strong>Attributes</strong> and{" "}
                        <strong>Relations</strong>
                    </p>
                    {/* <hr /> */}
                </div>
            </div>
        </React.Fragment>
    );
}
