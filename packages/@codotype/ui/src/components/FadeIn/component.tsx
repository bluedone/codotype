import * as React from "react";
import { Transition } from "@headlessui/react";

// // // //

export function FadeIn(props: {
    className?: string;
    show: boolean;
    children: React.ReactNode;
}) {
    return (
        <Transition
            as={"div"}
            className={props.className}
            appear={true}
            show={props.show}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            {props.children}
        </Transition>
    );
}
