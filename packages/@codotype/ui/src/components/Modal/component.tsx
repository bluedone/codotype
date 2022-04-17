import * as React from "react";
import { Hotkey } from "../Hotkey";
import { Transition } from "@headlessui/react";
import classnames from "classnames";

// // // //

export function Modal(props: {
    children: React.ReactNode;
    show: boolean;
    allowClose?: boolean;
    size?: "md" | "lg";
    onHide?: () => void;
}) {
    const { show, allowClose = true, size = "md", onHide = () => {} } = props;

    return (
        <Transition.Root show={show} as={React.Fragment}>
            <div className="fixed z-20 inset-0 overflow-y-auto">
                <Hotkey
                    keyName="esc"
                    onKeyDown={() => {
                        if (allowClose) {
                            onHide();
                        }
                    }}
                />
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            onClick={() => {
                                if (allowClose) {
                                    onHide();
                                }
                            }}
                        />
                    </Transition.Child>

                    {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    {/* Modal panel, show/hide based on modal state. */}
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className={classnames(
                                "inline-block align-bottom bg-white dark:bg-gray-800 dark:text-gray-200 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle",
                                {
                                    "sm:max-w-lg sm:w-full": size === "md",
                                    "max-w-4xl w-full": size === "lg",
                                },
                            )}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            {props.children}
                        </div>
                    </Transition.Child>
                </div>
            </div>
        </Transition.Root>
    );
}
