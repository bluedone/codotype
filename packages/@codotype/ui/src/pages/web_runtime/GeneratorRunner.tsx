import * as React from "react";
import { GeneratorMeta, Project } from "@codotype/core";
import useAxios from "axios-hooks";
import { BuildFinished } from "../../components/build_finished/component";
import { LoadingBuild } from "../../components/loading_build";

// // // //

interface GenerateCodeProps {
    project: Project;
}

interface GeneratorRunnerProps {
    generator: GeneratorMeta;
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
        // setLoading(false);
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
            console.log(data);
        });
    }

    // Handle loading state
    if (loading) {
        return <LoadingBuild />;
    }

    // Handle finsihed state
    if (finished) {
        return (
            <React.Fragment>
                <BuildFinished
                    responseType="LOCAL_PATH" // TODO - simplify this so LOCAL_PATH isn't hardcoded
                    filepath={data.filepath}
                    onClickBackToEditor={reset}
                />
            </React.Fragment>
        );
    }

    // Passes generateCode function to props.children
    return <React.Fragment>{props.children({ generateCode })}</React.Fragment>;
}
