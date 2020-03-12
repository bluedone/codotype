import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ProjectEditor } from "../component";
import {
    ExperienceRecommendation,
    Project,
    Schema,
    GeneratorMeta,
    Datatype,
} from "../../types";
import { buildDefaultProject } from "../buildDefaultProject";
import { Story } from "@src/components/dev";
import {
    ComponentBuilderConfigurationGroup,
    ComponentBuilderConfigurationGroupPropertyWithInstance,
    ComponentBuilderConfigurationGroupPropertySingleNumber,
} from "../../configuration_group_input/__tests__/test_state";

// // // //

const dummyGeneratorMeta: GeneratorMeta = {
    id: "chrome_extension_generator", // unique ID for the generator
    label: "Chrome Extension Generator", // short label for the generator
    description: "A Codotype Generator", // brief description of the generator
    icon: "https://codotype.org/logo.png", // URL to the generator's icon. Must be at least 200x200px
    homepage: "https://codotype.org", // the "homepage" for this generator
    version: "0.1.0", // the current version of the generator
    created_by: "Codotype", // optional (replaces "official")
    tech_tags: [], // an array of strings describing the tech used in the generator
    type_tags: [], // describes the type of codebase produced by this generator
    experience: ExperienceRecommendation.BEGINNER, // an optional tag detailing the level of experience required to use the code produced by the generator
    project_path: "output", // the name of the directory for the generator's output
    schemaConfigurationGroup: {
        configurationGroups: [ComponentBuilderConfigurationGroup],
        supportedDatatypes: [], // The datatypes supported by this generator.Only an array of DATATYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
        supportedRelations: [], // The relation types supported by this generator.Only an array of RELATION_TYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
    },
    configuration_groups: [
        ComponentBuilderConfigurationGroup,
        {
            ...ComponentBuilderConfigurationGroup,
            identifier: "foobar",
            properties: [
                ComponentBuilderConfigurationGroupPropertySingleNumber,
            ],
        },
    ], // an array of OptionGroup objects that expose additional configuration provided by the generator
};

const dummyProject: Project = buildDefaultProject(dummyGeneratorMeta);

const userSchema: Schema = {
    id: "12345",
    tokens: {
        label: "User",
        label_plural: "Users",
        identifier: "user",
        identifier_plural: "users",
    },
    attributes: [],
    relations: [],
    locked: false,
    removable: false,
    source: "USER",
    configuration: {},
};

const movieSchema: Schema = {
    id: "45678",
    tokens: {
        label: "Movie",
        label_plural: "Movies",
        identifier: "movie",
        identifier_plural: "movies",
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
    source: "USER",
    configuration: {},
};

dummyProject.schemas.push(movieSchema);
dummyProject.schemas.push(userSchema);

storiesOf("ProjectEditor", module).add("renders", () => {
    const [project, setProject] = React.useState<Project>(dummyProject);
    return (
        <Story>
            <ProjectEditor
                label={"Label"}
                generator={dummyGeneratorMeta}
                project={project}
                onClickGenerate={() => {
                    console.log("Generate Project!");
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
