import * as React from "react";
import { Project, GeneratorMeta } from "../types";

// // // //

interface GenerateCodeProps {
    project: Project;
    generator: GeneratorMeta;
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

    function generateCode({ project, generator }: GenerateCodeProps) {
        setLoading(true);

        // Mock the loading
        // TODO - an async function should be passed in with props
        setTimeout(() => {
            setLoading(false);
            setFinished(true);
        }, 2000);

        console.log(project);
        console.log(generator);
    }

    // // // //

    function reset() {
        setLoading(false);
        setFinished(false);
    }

    // // // //

    return (
        <React.Fragment>
            {props.children({ loading, finished, generateCode, reset })}
        </React.Fragment>
    );
}
