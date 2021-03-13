import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SchemaEditorLayout } from "../component";
import { Story } from "../../Story";
import {
    buildDefaultProjectInput,
    ProjectInput,
    Datatypes,
    normalizeProjectInput,
} from "@codotype/core";
import { NextMongoStarter } from "../../../pages/web_runtime/__tests__/test_state";

// // // //

storiesOf("Components/ProjectEditor/SchemaEditor", module).add(
    "renders",
    () => {
        const [projectInput, setProjectInput] = React.useState(
            buildDefaultProjectInput(NextMongoStarter),
        );
        return (
            <Story>
                <SchemaEditorLayout
                    projectInput={projectInput}
                    pluginMetadata={NextMongoStarter}
                    onChange={updatedProjectInput => {
                        console.log("onChange");
                        console.log(updatedProjectInput);
                        setProjectInput(updatedProjectInput);
                    }}
                />
            </Story>
        );
    },
);

// // // //

function Navbar() {
    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="hidden lg:block h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                alt="Workflow"
                            />
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Dashboard
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Projects
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

// https://gist.github.com/cdesch/2f8de645cad1d83aa251c0a20b0f7097
// :primary_key
// :string
// :text
// :integer
// :float
// :decimal
// :datetime
// :timestamp
// :time
// :date
// :binary
// :boolean
const mapDataTypeRails: { [key: string]: string } = {
    [Datatypes.STRING]: "string",
    [Datatypes.INT]: "integer",
    [Datatypes.TEXT]: "text",
    [Datatypes.FLOAT]: "float",
    [Datatypes.DECIMAL]: "decimal",
    [Datatypes.DATETIME]: "datetime",
    [Datatypes.TIMESTAMP]: "timestamp",
    [Datatypes.TIME]: "time",
    [Datatypes.DATE]: "date",
    [Datatypes.BINARY]: "binary",
    [Datatypes.BOOLEAN]: "boolean",
};

function RailsGenerateCommand(props: { projectInput: ProjectInput }) {
    // const { projectInput } = props;
    const projectInput = normalizeProjectInput(props);
    const commands = projectInput.schemas.map(s => {
        const name: string = s.identifiers.singular.pascal;
        const attributes: string = s.attributes
            .filter(a => {
                return a.identifiers.snake !== "_id";
            })
            .map(a => {
                return `${a.identifiers.snake}:${
                    mapDataTypeRails[String(a.datatype)]
                }`;
            })
            .join(" ");

        const relations: string = s.relations
            .map(r => {
                return `${r.identifiers.destination.alias.singular.snake}:references`;
            })
            .join(" ");
        return `rails generate scaffold ${name} ${attributes} ${relations}`;
    });
    return <pre>{commands.join("\n")}</pre>;
}

storiesOf("Components/ProjectEditor/SchemaEditor", module).add(
    "micro-app (powered by codotype)",
    () => {
        const [projectInput, setProjectInput] = React.useState(
            buildDefaultProjectInput(NextMongoStarter),
        );
        const [showingEditor, setShowingEditor] = React.useState(true);
        return (
            <div
                className={
                    "h-full min-h-full pb-32 dark bg-gray-800 text-gray-100"
                }
            >
                <Navbar />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full dark:bg-gray-800 bg-gray-100 dark:text-gray-200">
                    <div className="flex justify-end">
                        {!showingEditor && (
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setShowingEditor(true);
                                }}
                            >
                                Show Editor
                            </button>
                        )}
                        {showingEditor && (
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setShowingEditor(false);
                                }}
                            >
                                Show rails-generate command
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1">
                        <div className="col-span-1">
                            {showingEditor && (
                                <SchemaEditorLayout
                                    projectInput={projectInput}
                                    pluginMetadata={NextMongoStarter}
                                    onChange={updatedProjectInput => {
                                        console.log("onChange");
                                        console.log(updatedProjectInput);
                                        setProjectInput(updatedProjectInput);
                                    }}
                                />
                            )}

                            {!showingEditor && (
                                <RailsGenerateCommand
                                    projectInput={projectInput}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    },
);
