import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "@src/components/dev";
import { Relation, RelationType, Schema, SchemaSource, inflateSchema } from "@codotype/core";
import { RelationEditor } from "../component";
import {
    relationExample01,
    supportedRelationTypes,
    userSchema,
} from "./test_state";

// // // //

storiesOf("RelationEditor/Layout", module).add("populated", () => {
    const [relations, setRelations] = React.useState<Relation[]>([
        relationExample01,
    ]);
    const schema: Schema = {
        ...userSchema,
        relations: [
            {
                id: "dummy-relation",
                type: RelationType.HAS_ONE,
                required: false,
                source: SchemaSource.USER,
                destinationSchemaId: userSchema.id,
                sourceSchemaAlias: "",
                destinationSchemaAlias: "Parent",
            },
        ],
    };
    return (
        <Story>
            <RelationEditor
                relations={relations}
                relationReferences={
                    inflateSchema({ schema, schemas: [schema] }).relations
                }
                selectedSchema={schema}
                schemas={[schema]}
                supportedRelationTypes={supportedRelationTypes}
                onChange={(updatedRelations: Relation[]) => {
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

storiesOf("RelationEditor/Layout", module).add("empty", () => {
    const [relations, setRelations] = React.useState<Relation[]>([]);
    return (
        <Story>
            <RelationEditor
                relations={relations}
                selectedSchema={userSchema}
                relationReferences={
                    inflateSchema({ schema: userSchema, schemas: [userSchema] })
                        .relations
                }
                schemas={[userSchema]}
                supportedRelationTypes={supportedRelationTypes}
                onChange={(updatedRelations: Relation[]) => {
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
