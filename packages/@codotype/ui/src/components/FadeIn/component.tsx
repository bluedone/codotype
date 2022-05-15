import * as React from "react";
import { Transition } from "@headlessui/react";
import classNames from "classnames";

// // // //

export function FadeIn(props: {
    speed?: "slow" | "med" | "fast";
    show: boolean;
    children: React.ReactNode;
}) {
    const { speed = "med" } = props;

    return (
        <Transition
            appear={true}
            show={props.show}
            enterFrom="opacity-0"
            enterTo="opacity-100"
            enter={classNames("transition-opacity", {
                "duration-300": speed === "fast",
                "duration-500": speed === "med",
                "duration-1000": speed === "slow",
            })}
            leave={classNames("transition-opacity", {
                "duration-300": speed === "fast",
                "duration-500": speed === "med",
                "duration-1000": speed === "slow",
            })}
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            {props.children}
        </Transition>
    );
}
