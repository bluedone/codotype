import * as React from "react";
import { Hotkey } from "../Hotkey";

// // // //

// TODO - update to Tailwind 2.0
export function Slideout(props: {
    title: string;
    children: React.ReactNode;
    show: boolean;
    allowClose?: boolean;
    onHide?: () => void;
}) {
    const { title, show, allowClose = true, onHide = () => {} } = props;

    if (show === false) {
        return null;
    }

    // TODO - add hotkey component here to hide modal with escape key
    // < !--This example requires Tailwind CSS v2.0 + -->
    return (
        <div className="fixed inset-0 overflow-hidden">
            <Hotkey
                keyName="esc"
                onKeyDown={() => {
                    if (allowClose) {
                        onHide();
                    }
                }}
            />
            ;
            <div className="absolute inset-0 overflow-hidden">
                {/* <!--
          Background overlay, show/hide based on slide-over state.

          Entering: "ease-in-out duration-500"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in-out duration-500"
            From: "opacity-100"
            To: "opacity-0"
        --> */}
                <div
                    className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                    onClick={() => {
                        if (allowClose) {
                            onHide();
                        }
                    }}
                ></div>
                <section
                    className="absolute inset-y-0 right-0 pl-10 max-w-full flex"
                    aria-labelledby="slide-over-heading"
                >
                    {/* <!--
            Slide-over panel, show/hide based on slide-over state.

            Entering: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-full"
              To: "translate-x-0"
            Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-0"
              To: "translate-x-full"
          --> */}
                    <div className="relative w-screen max-w-md">
                        {/* <!--
              Close button, show/hide based on slide-over state.

              Entering: "ease-in-out duration-500"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "ease-in-out duration-500"
                From: "opacity-100"
                To: "opacity-0"
            --> */}
                        <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                            <div className="px-4 sm:px-6">
                                <h2
                                    id="slide-over-heading"
                                    className="text-lg font-medium text-gray-900"
                                >
                                    {title}
                                </h2>
                            </div>
                            <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                {/* <!-- Replace with your content --> */}
                                <div className="absolute inset-0 px-4 sm:px-6">
                                    {props.children}
                                </div>
                                {/* <!-- /End replace --> */}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
