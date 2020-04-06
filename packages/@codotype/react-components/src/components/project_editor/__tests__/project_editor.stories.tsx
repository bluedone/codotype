import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ProjectEditor } from "../component";
import { Project, Schema, SchemaSource, Datatype } from "@codotype/types";
import { buildDefaultProject } from "@codotype/util";
import { Story } from "@src/components/dev";
import { dummyGeneratorMeta } from "./test_state";

// // // //

const dummyProject: Project = buildDefaultProject(dummyGeneratorMeta);

const userSchema: Schema = {
    id: "12345",
    label: "User",
    label_plural: "Users",
    identifier: "user",
    identifier_plural: "users",
    class_name: "User",
    class_name_plural: "Users",
    camel_case: "user",
    camel_case_plural: "users",
    attributes: [],
    relations: [],
    reverse_relations: [],
    locked: false,
    removable: false,
    source: SchemaSource.USER,
    // configuration: {},
};

const movieSchema: Schema = {
    id: "45678",
    label: "string",
    label_plural: "string",
    identifier: "string",
    identifier_plural: "string",
    class_name: "string",
    class_name_plural: "string",
    camel_case: "string",
    camel_case_plural: "string",
    attributes: [
        {
            id: "name-attr",
            label: "Name",
            identifier: "name",
            description: "the name of the user",
            required: true,
            unique: true,
            locked: false,
            datatype: Datatype.STRING,
            default_value: "string",
            datatypeOptions: {},
        },
        {
            id: "email-attr",
            label: "Email",
            identifier: "email",
            description: "the email of the user",
            required: true,
            unique: true,
            locked: false,
            datatype: Datatype.STRING,
            default_value: "string",
            datatypeOptions: {},
        },
    ],
    relations: [],
    locked: false,
    removable: false,
    source: SchemaSource.USER,
    reverse_relations: [],
    // configuration: {},
};

dummyProject.schemas.push(movieSchema);
dummyProject.schemas.push(userSchema);

storiesOf("ProjectEditor", module).add("renders", () => {
    const [project, setProject] = React.useState<Project>(dummyProject);
    return (
        <Story>
            <ProjectEditor
                generator={dummyGeneratorMeta}
                project={project}
                onClickGenerate={() => {
                    console.log("Generate Project!");
                    console.log(project);
                }}
                onResetProject={() => {
                    console.log("RESET PROJECT");
                    console.log(project);
                }}
                onChange={(updatedProject: Project) => {
                    console.log("onChange!");
                    console.log(updatedProject);
                    setProject(updatedProject);
                }}
            />
            <hr />
            <pre>{JSON.stringify(project, null, 4)}</pre>
        </Story>
    );
});
