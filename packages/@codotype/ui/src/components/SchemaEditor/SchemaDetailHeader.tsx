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
        <div className="grid grid-cols-2 mb-2">
            <div className="">
                <div className="flex items-center">
                    <h4 className="mb-0 text-2xl">
                        {props.schemaInput.identifiers.singular.title}
                        {/* <span className="ml-1 text-gradient bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500"> */}
                        <span className="ml-1 text-indigo-500">Data Model</span>
                    </h4>
                    <SchemaEditButton
                        schema={props.schemaInput}
                        onClick={props.onClickEdit}
                    />
                </div>
            </div>
            <div className="flex justify-end">
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
