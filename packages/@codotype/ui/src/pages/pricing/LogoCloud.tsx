import * as React from "react";

export function LogoCloud() {
    return (
        <div className="bg-indigo-100 bg-opacity-25">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                    <h2 className="max-w-md mx-auto text-3xl font-extrabold text-indigo-900 text-center lg:max-w-xl lg:text-left">
                        The world's most innovative companies use Codotype
                    </h2>
                    <div className="mt-8 flow-root lg:mt-0 self-center">
                        <div className="-mt-4 -ml-8 flex flex-wrap justify-between lg:-ml-4">
                            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
                                <img
                                    className="h-12"
                                    src="https://tailwindui.com/img/logos/workcation-logo-indigo-900.svg"
                                    alt="Workcation"
                                />
                            </div>
                            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
                                <img
                                    className="h-12"
                                    src="https://tailwindui.com/img/logos/tuple-logo-indigo-900.svg"
                                    alt="Tuple"
                                />
                            </div>
                            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
                                <img
                                    className="h-12"
                                    src="https://tailwindui.com/img/logos/level-logo-indigo-900.svg"
                                    alt="Level"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
