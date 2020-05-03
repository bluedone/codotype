import * as React from "react";
import copy from "copy-to-clipboard";

// // // //

export function CopyToClipboard(props: {
    text: string;
    children: (childProps: { copyToClipboard: () => void }) => React.ReactNode;
    onCopy: (onCopyProps: { text: string; copied: boolean }) => void;
    options?: {
        debug?: boolean;
        message?: string;
        format?: string;
    };
}) {
    // Defines copyToClipboard function passed to props.children
    function copyToClipboard() {
        // Copy props.text to clipboard
        const result: boolean = copy(props.text, props.options);

        // Invokes props.onCopy callback
        props.onCopy({ text: props.text, copied: result });
    }

    return (
        <React.Fragment>{props.children({ copyToClipboard })}</React.Fragment>
    );
}
