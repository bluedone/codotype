import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../Story";
import {
    Relation,
    RelationTypes,
    CreatedByValues,
    testState,
    SchemaInput,
    inflateSchema,
    RelationInput,
    buildRelations,
} from "@codotype/core";
import { RelationEditor } from "../component";
import { supportedRelationTypes } from "./test_state";

const { userSchema } = testState;

// // // //

storiesOf("Components/ProjectEditor/RelationEditor/Layout", module).add(
    "populated",
    () => {
        const [relationInputs, setRelations] = React.useState<RelationInput[]>([
            {
                id: "dummy-relation",
                type: RelationTypes.HAS_ONE,
                createdBy: CreatedByValues.user,
                destinationSchemaID: userSchema.id,
                sourceSchemaID: userSchema.id,
                sourceSchemaAlias: "",
                destinationSchemaAlias: "Parent",
                addons: {},
                locked: false,
                internalNote: "",
            },
        ]);
        const schemaInput: SchemaInput = {
            ...userSchema,
        };

        const relations: Relation[] = buildRelations({
            schemaInputs: [schemaInput],
            relationInputs,
        });

        return (
            <Story>
                <RelationEditor
                    relations={relationInputs}
                    relationReferences={
                        inflateSchema({ schemaInput, relations }).relations
                    }
                    relationAddons={[]}
                    selectedSchema={schemaInput}
                    schemas={[schemaInput]}
                    supportedRelationTypes={supportedRelationTypes}
                    onChange={(updatedRelations: RelationInput[]) => {
                        console.log("RelationEditor - onChange");
                        console.log(updatedRelations);
                        setRelations(updatedRelations);
                    }}
                />

                <hr />
                <pre className="bg-dark px-4 py-4 rounded mt-4 text-light">
                    {JSON.stringify(relations, null, 4)}
                </pre>
            </Story>
        );
    },
);

storiesOf("Components/ProjectEditor/RelationEditor/Layout", module).add(
    "empty",
    () => {
        const [relations, setRelations] = React.useState<RelationInput[]>([]);
        return (
            <Story>
                <RelationEditor
                    relations={relations}
                    selectedSchema={userSchema}
                    relationAddons={[]}
                    relationReferences={
                        inflateSchema({
                            schemaInput: userSchema,
                            relations: [],
                        }).relations // CHORE - add relations here
                    }
                    schemas={[{ ...userSchema, internalNote: "" }]}
                    supportedRelationTypes={supportedRelationTypes}
                    onChange={(updatedRelations: RelationInput[]) => {
                        console.log("RelationEditor - onChange");
                        console.log(updatedRelations);
                        setRelations(updatedRelations);
                    }}
                />

                <hr />
                <pre className="bg-dark px-4 py-4 rounded mt-4 text-light">
                    {JSON.stringify(relations, null, 4)}
                </pre>
            </Story>
        );
    },
);
