import * as React from "react";
import { Modal } from "../Modal";
import { ProjectInput, PluginMetadata } from "@codotype/core";
import { BuildFinished } from "../BuildFinished/component";
import { LoadingBuild } from "../LoadingBuild";

// // // //

interface GenerateCodeProps {
    projectInput: ProjectInput;
    plugin: PluginMetadata;
}

interface RuntimeProviderProps {
    children: (props: {
        loading: boolean;
        finished: boolean;
        generateCode: (p: GenerateCodeProps) => void;
        reset: () => void;
    }) => React.ReactNode;
}

/**
 * RuntimeProvider
 * Exposes `generateCode` method to send a project to the runtime to be generated
 * @param props - see `RuntimeProviderProps`
 */
export function RuntimeProvider(props: RuntimeProviderProps) {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [finished, setFinished] = React.useState<boolean>(false);

    // TODO - update this to be passed in through `props.runtimeAdaptor`
    function generateCode({ projectInput, plugin }: GenerateCodeProps) {
        setLoading(true);

        // Mock the loading
        // TODO - an async function should be passed in with props
        setTimeout(() => {
            setFinished(true);
            setLoading(false);
        }, 1200);

        // Debugging
        // console.log(project);
        // console.log(plugin);
    }

    // // // //

    function reset() {
        setFinished(false);
        setLoading(false);
    }

    // // // //

    // Handle loading state
    // if (loading) {
    //     return <LoadingBuild />;
    // }

    // Handle finsihed state
    // if (finished) {
    //     return (
    //         <React.Fragment>
    //             <BuildFinished
    //                 responseType="LOCAL_PATH"
    //                 filepath="/home/aeksco/code"
    //                 onClickBackToEditor={reset}
    //             />
    //         </React.Fragment>
    //     );
    // }

    // Render ProjectEditor here
    return (
        <React.Fragment>
            {props.children({ loading, finished, generateCode, reset })}

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
                    <div className="min-w-full w-128">
                        {loading && <LoadingBuild />}
                        {finished && (
                            <BuildFinished
                                responseType="LOCAL_PATH"
                                filepath="/home/aeksco/code"
                                onClickBackToEditor={reset}
                            />
                        )}
                    </div>
                </Modal>
            )}
        </React.Fragment>
    );
}