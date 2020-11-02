import * as React from "react";
import { SchemaPreview } from "./SchemaPreview";
import { AttributeEditor } from "../attribute_editor";
import { RelationEditor } from "../relation_editor";
import { SchemaDetailHeader } from "./SchemaDetailHeader";
import {
    inflateSchema,
    Schema,
    PluginMetadata,
    UUID,
    SchemaInput,
    AttributeInput,
    ConfigurationValue,
    ProjectInput,
    buildRelations,
    RelationInput,
} from "@codotype/core";
import { ConfigurationGroupSelector } from "./ConfigurationGroupSelector";
import { SchemaIncomingRelations } from "./SchemaIncomingRelations";

// // // //

interface SchemaDetailProps {
    schema: SchemaInput;
    projectInput: ProjectInput;
    pluginMetadata: PluginMetadata;
    onChange: (updatedSchema: SchemaInput) => void;
    onClickEdit: () => void;
    onConfirmDelete: () => void;
    onSelectSchema: (nextSelectedSchemaId: UUID) => void;
    onChangeRelations: (updatedRelations: RelationInput[]) => void;
}

/**
 * SchemaDetail
 * @param props - see `SchemaDetailProps`
 */
export function SchemaDetail(props: SchemaDetailProps) {
    const inflatedSchema: Schema = inflateSchema({
        schemaInput: props.schema,
        relations: buildRelations({
            schemaInputs: props.projectInput.schemas,
            relationInputs: props.projectInput.relations,
        }),
    });

    const { schemaEditorConfiguration } = props.pluginMetadata;

    return (
        <div className="row">
            <div className="col-sm-12">
                <SchemaDetailHeader
                    schemaInput={props.schema}
                    schemas={props.projectInput.schemas}
                    onClickEdit={props.onClickEdit}
                    onConfirmDelete={props.onConfirmDelete}
                />
            </div>

            <div className="col-sm-12">
                <ConfigurationGroupSelector
                    configuration={props.schema.configuration}
                    configurationGroups={
                        schemaEditorConfiguration.configurationGroups
                    }
                    onChange={(updatedConfiguration: ConfigurationValue) => {
                        props.onChange({
                            ...props.schema,
                            configuration: updatedConfiguration,
                        });
                    }}
                >
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <AttributeEditor
                                attributes={props.schema.attributes}
                                supportedDatatypes={
                                    schemaEditorConfiguration.supportedDatatypes
                                }
                                addons={
                                    schemaEditorConfiguration.attributeAddons
                                }
                                onChange={(
                                    updatedAttributes: AttributeInput[],
                                ) => {
                                    // Defines updated schema
                                    const updatedSchema: SchemaInput = {
                                        ...props.schema,
                                        attributes: updatedAttributes,
                                    };

                                    // Passes into `props.onChange`
                                    props.onChange(updatedSchema);
                                }}
                            />
                            {/* <hr /> */}
                            <RelationEditor
                                selectedSchema={props.schema}
                                relationReferences={inflatedSchema.relations}
                                schemas={props.projectInput.schemas}
                                relations={props.projectInput.relations}
                                supportedRelationTypes={
                                    props.pluginMetadata
                                        .schemaEditorConfiguration
                                        .supportedRelationTypes
                                }
                                onChange={(
                                    updatedRelations: RelationInput[],
                                ) => {
                                    props.onChangeRelations(updatedRelations);
                                }}
                            />
                        </div>
                        <div className="pl-md-0 col-sm-6 mt-3 mt-lg-0">
                            <SchemaPreview
                                schemaInput={props.schema}
                                projectInput={props.projectInput}
                            />
                            <hr />
                            <SchemaIncomingRelations
                                inflatedSchema={inflatedSchema}
                                onSelectSchema={props.onSelectSchema}
                            />
                        </div>
                    </div>
                </ConfigurationGroupSelector>
            </div>
        </div>
    );
}
