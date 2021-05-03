import * as React from "react";
import { Modal } from "../Modal";
import { ProjectInput } from "@codotype/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
const download = require("downloadjs");

// // // //

/**
 * downloadProject
 * Donwloads the Project as a JSON file
 */
function downloadProject(projectInput: ProjectInput) {
    // Defines filename
    const filename = `codotype-project-${
        projectInput.identifiers.snake
    }-${Date.now()}.json`;

    // Defines JSON string
    const jsonString: string = JSON.stringify(projectInput, null, 4);

    // Downloads file
    download(jsonString, filename, "application/json");
}

// TODO - this is a great idea - should it just be its own plugin...?
function downloadCodotypePrimitives(projectInput: ProjectInput) {
    let primitivesExport = [
        `import {
            Datatypes,
            RelationTypes,
            Primitives,
            buildTokenCasing,
            buildTokenPluralization,
            ProjectInput
        } from "@codotype/core"`,

        // Add Data models
        ...projectInput.schemas.map(s => {
            // Gets attributes
            let attrLines = [
                `attributes: [`,
                ...s.attributes.map(a => {
                    return `
            new Primitives.AttributeInput({
                identifiers: buildTokenCasing("${a.identifiers.title}"),
                datatype: Datatypes.${a.datatype},
            }),
            `;
                }),
                `],`,
            ];

            return `
        const ${s.identifiers.singular.camel}DataModel = new Primitives.Schema({
            identifiers: buildTokenPluralization("${
                s.identifiers.singular.title
            }"),
            ${attrLines.join("\n")}
        }),
        `;
        }),

        // Add Project
        `const ${projectInput.identifiers.camel}Project: ProjectInput = {
            id: "${projectInput.id}",
            pluginID: "${projectInput.pluginID}",
            pluginVersion: "${projectInput.pluginVersion}",
            identifiers: buildTokenCasing("${projectInput.identifiers.title}"),
            configuration: {},
            schemas: [
        `,

        // Add data models defined above
        ...projectInput.schemas.map(s => {
            return `${s.identifiers.singular.camel}DataModel,`;
        }),

        // Close Data models
        `],`,
        `relations: [`,
        // Add relations
        ...projectInput.relations.map(r => {
            const sourcePrimitive = projectInput.schemas.find(
                s => s.id === r.sourceSchemaID,
            );
            const destinationPrimitive = projectInput.schemas.find(
                s => s.id === r.destinationSchemaID,
            );
            return `
            new Primitives.Relation(
                {
                    sourceSchemaID: ${sourcePrimitive?.identifiers.singular.camel}DataModel.id,
                    destinationSchemaID: ${destinationPrimitive?.identifiers.singular.camel}DataModel.id,
                    sourceSchemaAlias: "${r.sourceSchemaAlias}",
                    destinationSchemaAlias: "${r.destinationSchemaAlias}",
                    type: RelationTypes.${r.type},
                },
            ),
            `;
        }),
        `],`,
        `}`,
    ];

    // Defines filename
    const filename = `codotype-project-primitives-${
        projectInput.identifiers.snake
    }-${Date.now()}.ts`;
    download(primitivesExport.join("\n"), filename, "application/json");
}

// // // //

/**
 * ProjectExportModal
 * @param props.show
 * @param props.projectInput
 * @param props.onHide
 */
export function ProjectExportModal(props: {
    show: boolean;
    projectInput: ProjectInput;
    onHide: () => void;
}) {
    const { show, projectInput, onHide } = props;
    return (
        <Modal show={show} onHide={() => onHide()}>
            <div className="p-5">
                <h3 className="text-2xl select-none">Export Project</h3>

                <p className="form-text text-muted mb-2">
                    Export a Codotype Project stored as a .JSON file
                </p>

                <small className="text-muted">
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                    The exported JSON file can be re-imported into the Codotype
                    web UI, or used directly with the
                    <a
                        href="https://github.com/codotype/codotype"
                        target="_blank"
                    >
                        Codotype CLI
                    </a>
                </small>

                {projectInput.schemas.length > 0 && (
                    <div className="text-muted text-sm mt-4">
                        <button
                            className="outline-none focus:outline-none text-indigo-400 hover:text-indigo-500"
                            onClick={() => {
                                downloadCodotypePrimitives(projectInput);
                                onHide();
                            }}
                        >
                            Click here
                        </button>{" "}
                        to export a TypeScript file including the Codotype
                        Primitives for the current Data Models in the editor.
                    </div>
                )}
            </div>

            <div className="modal-footer-tw">
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        downloadProject(projectInput);
                        onHide();
                    }}
                >
                    Export Project
                </button>

                <button className="modal-close-btn" onClick={() => onHide()}>
                    Cancel
                </button>
            </div>
        </Modal>
    );
}
