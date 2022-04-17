import * as React from "react";

// // // //

/**
 * Exposes navigator.writeText via React hook
 */
export function useCopyToClipboard(
    callback?: () => void,
): [(textToCopy: string) => void] {
    // Defines copyToClipboard function passed to props.children
    function copyToClipboard(textToCopy: string) {
        navigator.clipboard.writeText(textToCopy);
        if (callback) callback();
    }

    return [copyToClipboard];
}

/**
 * Exposes navigator.writeText via childProps with optiona onCopy callback
 */
export function CopyToClipboard(props: {
    onCopy?: () => void;
    children: (childProps: {
        copyToClipboard: (textToCopy: string) => void;
    }) => React.ReactNode;
}) {
    const [copyToClipboard] = useCopyToClipboard(props.onCopy);

    return (
        <React.Fragment>{props.children({ copyToClipboard })}</React.Fragment>
    );
}
