import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../Story";
import {
    Relation,
    testState,
    SchemaInput,
    inflateSchema,
    RelationInput,
} from "@codotype/core";
import { RelationEditor } from "../component";
import { relationExample01, supportedRelationTypes } from "./test_state";

const { userSchema } = testState;

// // // //

storiesOf("ProjectEditor/RelationEditor/Layout", module).add(
    "populated",
    () => {
        const [relations, setRelations] = React.useState<RelationInput[]>([
            relationExample01,
        ]);
        const schemaInput: SchemaInput = {
            ...userSchema,
            internalNote: "", // TODO - fix this...
        };

        // TODO - fix this...
        // const relationsInputs: RelationInput = [
        //     {
        //         id: "dummy-relation",
        //         type: RelationTypes.HAS_ONE,
        //         createdBy: CreatedByValues.user,
        //         destinationSchemaID: userSchema.id,
        //         sourceSchemaID: userSchema.id,
        //         sourceSchemaAlias: "",
        //         destinationSchemaAlias: "Parent",
        //         addons: {},
        //         locked: false,
        //     },
        // ]

        return (
            <Story>
                <RelationEditor
                    relations={relations}
                    relationReferences={
                        inflateSchema({ schemaInput, relations: [] }).relations
                    }
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

storiesOf("ProjectEditor/RelationEditor/Layout", module).add("empty", () => {
    const [relations, setRelations] = React.useState<RelationInput[]>([]);
    return (
        <Story>
            <RelationEditor
                relations={relations}
                selectedSchema={userSchema}
                relationReferences={
                    inflateSchema({ schemaInput: userSchema, relations: [] }) // TODO - add relations here
                        .relations
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
});
