import * as React from "react";
import { GeneratorMeta } from "@codotype/types";
import useAxios from "axios-hooks";

// // // //

interface GeneratorFetcherProps {
    generator: GeneratorMeta;
    children: (childProps: { generator: GeneratorMeta }) => React.ReactNode;
}

/**
 * GeneratorFetcher
 * Fetches generator metadata from the API
 * @param props - see `GeneratorFetcherProps`
 */
export function GeneratorFetcher(props: GeneratorFetcherProps) {
    const [{ data, loading, error }, refetch] = useAxios("/api/generators");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    return (
        <React.Fragment>
            {props.children({ generator: data[0] })}
        </React.Fragment>
    );
}
