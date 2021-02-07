import * as React from "react";
import Hotkeys from "react-hot-keys";

// // // //

export function Hotkey(props: { keyName: string; onKeyDown: () => void }) {
    return (
        <Hotkeys
            keyName={props.keyName}
            onKeyDown={(keyName: string, e: KeyboardEvent) => {
                e.stopPropagation();
                e.preventDefault();
                props.onKeyDown();
            }}
        />
    );
}
