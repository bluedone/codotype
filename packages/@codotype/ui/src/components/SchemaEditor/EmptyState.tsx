import { PluginMetadata, ProjectInput } from "@codotype/core";
import * as React from "react";
import { SchemaForm } from "./SchemaForm";

// // // //

/**
 * EmptyState
 * EmptyState for the SchemaEditor
 */
export function EmptyState(props: {
    plugin: PluginMetadata;
    disabled: boolean;
    onNewTokenChange: (updatedTokens: any) => void;
    onKeydownEnter: () => void;
    onSubmit: () => void;
    onSelectExampleProject: (exampleProjectInput: ProjectInput) => void;
}) {
    const {
        disabled,
        onNewTokenChange,
        onKeydownEnter,
        onSubmit,
        plugin,
    } = props;

    // Define flag dictating whether or not to render the ExampleProject picker
    const hasExampleProjects = plugin.exampleProjects.length > 0;

    const dataModelForm = (
        <div className="card card-body rounded-lg shadow-xl">
            <div className="grid grid-cols-12">
                <div className="col-span-12">
                    <h4 className="mb-0 text-2xl flex">New Data Model</h4>

                    <SchemaForm
                        label={""}
                        onChange={updatedTokens => {
                            onNewTokenChange(updatedTokens);
                        }}
                        onKeydownEnter={() => {
                            onKeydownEnter();
                        }}
                    />
                </div>
            </div>
            <div className="col-span-12 text-right mt-2">
                <button
                    className="btn btn-lg btn-primary"
                    disabled={disabled}
                    onClick={() => {
                        onSubmit();
                    }}
                >
                    Create Data Model
                </button>
            </div>
        </div>
    );

    // Render ExampleProjects Picker if hasExampleProjects is true
    if (hasExampleProjects) {
        return (
            <div className="flex py-4 justify-center items-center">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <h3 className="text-2xl text-center mb-4">
                            Start with an example project...
                        </h3>

                        <div className="card card-body rounded-lg shadow-xl">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12">
                                    <h4 className="mb-3 text-2xl flex">
                                        Example Projects
                                    </h4>
                                    <div className="divide-y divide-gray-400 border border-gray-400 rounded-2xl overflow-hidden">
                                        {plugin.exampleProjects.map(
                                            projectInput => {
                                                return (
                                                    <button
                                                        className="flex justify-between w-full bg-white hover:bg-gray-100 px-4 py-4"
                                                        onClick={() => {
                                                            props.onSelectExampleProject(
                                                                projectInput,
                                                            );
                                                        }}
                                                    >
                                                        <p className="text-lg text-gray-800">
                                                            {
                                                                projectInput
                                                                    .identifiers
                                                                    .title
                                                            }
                                                        </p>

                                                        <p className="text-base text-gray-600">
                                                            {
                                                                projectInput
                                                                    .schemas
                                                                    .length
                                                            }{" "}
                                                            Data Models
                                                        </p>
                                                    </button>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6">
                        <h3 className="text-2xl text-center mb-4">
                            ...or, define your first Data Model
                        </h3>
                        {dataModelForm}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex py-4 justify-center items-center">
            <div className="grid grid-cols-5">
                <div className="col-start-2 col-span-3">{dataModelForm}</div>
            </div>
        </div>
    );
}
