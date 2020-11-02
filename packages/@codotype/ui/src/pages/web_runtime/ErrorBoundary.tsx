import * as React from "react";

// // // //

export function FallbackComponent(props: any) {
    return (
        <React.Fragment>
            <p>An error has occured :(</p>
            <button
                className="btn btn-outline-primary btn-lg"
                onClick={() => {
                    props.resetErrorBoundary();
                }}
            >
                Click to reset Codotype Project
            </button>
            <pre>{JSON.stringify(props, null, 4)}</pre>
        </React.Fragment>
    );
}
