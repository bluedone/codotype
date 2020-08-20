import * as React from "react";
import { GeneratorMeta } from "@codotype/core";
import useAxios from "axios-hooks";
import { LoadingPage } from "../../components/LoadingPage";

// // // //

interface GeneratorFetcherProps {
    children: (childProps: { generators: GeneratorMeta[] }) => React.ReactNode;
}

/**
 * GeneratorFetcher
 * Fetches generator metadata from the API
 * @param props - see `GeneratorFetcherProps`
 */
export function GeneratorFetcher(props: GeneratorFetcherProps) {
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
