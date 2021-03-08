import * as React from "react";

export function LogoCloud() {
    return (
        <div className="mt-32">
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                <div className="lg:grid lg:grid-cols-2 lg:gap-24 lg:items-center">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                            Backed by world-renowned investors
            </h2>
                        <p className="mt-6 max-w-3xl text-lg leading-7 text-gray-500">
                            Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi. Cursus faucibus nunc nisl netus morbi vel porttitor vitae ut. Amet vitae fames senectus vitae.
            </p>
                        <div className="mt-6">
                            <a href="#" className="text-base font-medium text-indigo-500">
                                Meet our investors and advisors&nbsp;&rarr;
              </a>
                        </div>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
                        <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                            <img className="max-h-12" src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg" alt="Workcation" />
                        </div>
                        <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                            <img className="max-h-12" src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg" alt="Mirage" />
                        </div>
                        <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                            <img className="max-h-12" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg" alt="Tuple" />
                        </div>
                        <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                            <img className="max-h-12" src="https://tailwindui.com/img/logos/laravel-logo-gray-400.svg" alt="Laravel" />
                        </div>
                        <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                            <img className="max-h-12" src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg" alt="StaticKit" />
                        </div>
                        <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                            <img className="max-h-12" src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg" alt="Statamic" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}