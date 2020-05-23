import * as React from "react";
import { GeneratorMeta } from "@codotype/types";
import useAxios from "axios-hooks";
import { LoadingSpinner } from "@src/components/loading_spinner";

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
        return (
            <div className="h-100 d-flex flex-row justify-content-center align-items-center">
                <div className="col-sm-12 col-md-8 col-lg-6">
                    <div className="row my-4">
                        <div className="col-lg-12 text-center d-flex justify-content-center">
                            <div className="my-2">
                                <LoadingSpinner />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // TODO - add better error handling here
    if (error) return <p>Error!</p>;

    return (
        <React.Fragment>{props.children({ generators: data })}</React.Fragment>
    );
}
