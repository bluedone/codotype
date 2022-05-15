import * as React from "react";
import { PluginMetadata, ProjectInput } from "@codotype/core";
import useAxios from "axios-hooks";
import { AxiosError } from "axios";

// // // //

interface GeneratePreviewProps {
    projectInput: ProjectInput;
}

type InMemoryFileSystemData = Record<string, string>;

interface PluginPreviewFetcherProps {
    projectInput: ProjectInput;
    children: (childProps: {
        loading: boolean;
        error: AxiosError<any> | undefined;
        files: InMemoryFileSystemData;
        // generatePreview: (params: GeneratePreviewProps) => void;
    }) => React.ReactNode;
}

/**
 * PluginPreviewFetcher
 * Runs the Plugin to produce output through the API
 * @param props - see `PluginPreviewFetcherProps`
 */
export function PluginPreviewFetcher(props: PluginPreviewFetcherProps) {
    // Sets up useAxios hook to send request
    const [{ data, loading, error }, executePostRequest] = useAxios<{
        files: InMemoryFileSystemData;
    }>(
        {
            url: "/api/preview",
            method: "POST",
        },
        { manual: true },
    );

    // Defines helper function to pass to props.children as generatePreview
    // Fires off the executePostRequest from axios
    function generatePreview(params: GeneratePreviewProps) {
        executePostRequest({ data: { ...params } });
    }

    React.useEffect(() => {
        generatePreview({ projectInput: props.projectInput });
    }, [props.projectInput]);

    // Passes generatePreview function to props.children
    return (
        <React.Fragment>
            {props.children({
                files: data?.files || {},
                error,
                loading,
                // generatePreview,
            })}
        </React.Fragment>
    );
}
