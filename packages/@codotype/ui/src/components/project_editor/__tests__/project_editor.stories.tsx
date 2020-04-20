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
    identifiers: {
        singular: {
            label: "User",
            snake: "user",
            camel: "user",
            pascal: "User",
            kebab: "user",
        },
        plural: {
            label: "Users",
            snake: "users",
            camel: "users",
            pascal: "Users",
            kebab: "users",
        },
    },
    attributes: [],
    relations: [],
    locked: false,
    removable: false,
    source: SchemaSource.USER,
    configuration: {},
};

const movieSchema: Schema = {
    id: "45678",
    identifiers: {
        singular: {
            label: "Movie",
            snake: "movie",
            camel: "movie",
            pascal: "Movie",
            kebab: "movie",
        },
        plural: {
            label: "Movies",
            snake: "movies",
            camel: "movies",
            pascal: "Movies",
            kebab: "movies",
        },
    },
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
    configuration: {},
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
