import * as React from "react";
import { Modal } from "react-bootstrap";
import { PluginMetadata, Project } from "@codotype/core";
import useAxios from "axios-hooks";
import { BuildFinished } from "../../components/build_finished/component";
import { LoadingBuild } from "../../components/loading_build";

// // // //

interface GenerateCodeProps {
    project: Project;
}

interface GeneratorRunnerProps {
    generator: PluginMetadata;
    children: (childProps: {
        generateCode: (params: GenerateCodeProps) => void;
    }) => React.ReactNode;
}

/**
 * GeneratorRunner
 * Runs the generator to produce output through the API
 * @param props - see `GeneratorRunnerProps`
 */
export function GeneratorRunner(props: GeneratorRunnerProps) {
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

    // TOOD - add error handler here
    if (error) return <p>Error!</p>;

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
                    {/* <Modal.Header closeButton={finished}> */}
                    {/* {loading && <Modal.Title>Loading</Modal.Title>} */}
                    {/* {finished && <Modal.Title>Export Code</Modal.Title>} */}
                    {/* </Modal.Header> */}
                    <Modal.Body>
                        {loading && <LoadingBuild />}
                        {finished && (
                            <BuildFinished
                                responseType="LOCAL_PATH"
                                filepath={data.filepath}
                                onClickBackToEditor={reset}
                            />
                        )}
                    </Modal.Body>
                </Modal>
            )}
        </React.Fragment>
    );
}
