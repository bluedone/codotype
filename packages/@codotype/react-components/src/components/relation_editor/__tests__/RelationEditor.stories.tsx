import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "@src/components/dev";
import { Relation } from "../@codotype/types";
import { RelationEditor } from "../component";
import {
    relationExample01,
    relationExample02,
    supportedDatatypes,
    userSchema,
} from "./test_state";

// // // //

storiesOf("RelationEditor/Layout", module).add("populated", () => {
    const [relations, setRelations] = React.useState<Relation[]>([
        relationExample01,
        relationExample02,
    ]);
    return (
        <Story>
            <RelationEditor
                relations={relations}
                selectedSchema={userSchema}
                supportedDatatypes={supportedDatatypes}
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
                supportedDatatypes={supportedDatatypes}
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
