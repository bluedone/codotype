import * as React from "react";
import { PluginMetadata } from "@codotype/core";
import useAxios from "axios-hooks";
import { LoadingPage } from "../../components/LoadingPage";

// // // //

interface PluginFetcherProps {
    children: (childProps: { generators: PluginMetadata[] }) => React.ReactNode;
}

/**
 * GeneratorFetcher
 * Fetches generator metadata from the API
 * @param props - see `PluginFetcherProps`
 */
export function PluginFetcher(props: PluginFetcherProps) {
    const [{ data, loading, error }] = useAxios("/api/generators");

    // Renders PageLoader component
    if (loading) {
        return <LoadingPage />;
    }

    // TODO - add better error handling here
    if (error) return <p>Error!</p>;

    return (
        <React.Fragment>{props.children({ generators: data })}</React.Fragment>
    );
}
