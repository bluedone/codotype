import * as React from "react";
import { PluginMetadata } from "@codotype/core";
import useAxios from "axios-hooks";
import { LoadingPage } from "../../components/LoadingPage";
import { PageNotFound } from "../../components/PageNotFound";

// // // //

interface PluginFetcherProps {
    children: (childProps: { plugins: PluginMetadata[] }) => React.ReactNode;
}

/**
 * PluginFetcher
 * Fetches plugin metadata from the API
 * @param props - see `PluginFetcherProps`
 */
export function PluginFetcher(props: PluginFetcherProps) {
    const [{ data, loading, error }] = useAxios("/api/plugins");

    if (error) {
        return <PageNotFound />;
    }

    // Renders PageLoader component
    if (loading) {
        return <LoadingPage />;
    }

    return (
        <React.Fragment>
            {error && (<PageNotFound />)}
            {props.children({ plugins: data || [] })}
        </React.Fragment>
    );
}
