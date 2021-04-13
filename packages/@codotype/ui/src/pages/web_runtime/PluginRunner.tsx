import * as React from "react";
import { Modal } from "../../components/Modal";
import { PluginMetadata, ProjectInput } from "@codotype/core";
import useAxios from "axios-hooks";
import { BuildFinished } from "../../components/BuildFinished/component";
import { LoadingBuild } from "../../components/LoadingBuild";

// // // //

interface GenerateCodeProps {
    projectInput: ProjectInput;
}

interface PluginRunnerProps {
    plugin: PluginMetadata;
    children: (childProps: {
        generateCode: (params: GenerateCodeProps) => void;
    }) => React.ReactNode;
}

/**
 * PluginRunner
 * Runs the Plugin to produce output through the API
 * @param props - see `PluginRunnerProps`
 */
export function PluginRunner(props: PluginRunnerProps) {
    const [finished, setFinished] = React.useState<boolean>(false);

    function reset() {
        setFinished(false);
    }

    // Sets up useAxios hook to send
    const [{ data, loading, error }, executePostRequest] = useAxios(
        {
            url: "/api/generate",
            method: "POST",
        },
        { manual: true },
    );

    // Defines helper function to pass to props.children as generateCode
    // Fires off the executePostRequest from axios
    function generateCode(params: GenerateCodeProps) {
        executePostRequest({ data: { ...params } }).then(() => {
            setFinished(true);
        });
    }

    // Passes generateCode function to props.children
    return (
        <React.Fragment>
            {error && <p>Error!</p>}
            {props.children({ generateCode })}
            {/* Handle Loading */}
            {(loading || finished) && (
                <Modal
                    size="lg"
                    show={loading || finished}
                    onHide={() => {
                        // Don't allow the modal to close while loading
                        if (loading) {
                            return;
                        }

                        // Otherwise, invoke reset to close the modal
                        reset();
                    }}
                >
                    <div className="min-w-full">
                        {loading && <LoadingBuild />}
                        {finished && (
                            <BuildFinished
                                responseType={data.type}
                                filepath={data.filepath}
                                onClickBackToEditor={reset}
                            />
                        )}
                    </div>
                </Modal>
            )}
        </React.Fragment>
    );
}
