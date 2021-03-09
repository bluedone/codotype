import * as React from "react";

export function PricingHeader() {
    return (
        <div className="bg-gray-50">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-base font-semibold text-indigo-600 uppercase tracking-wide">Pricing</h1>
                    <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Take control of your team.</p>
                    <p className="max-w-xl mx-auto mt-5 text-xl text-gray-500">Start building for free, then add a site plan to go live. Account plans unlock additional features.</p>
                </div>
            </div>
        </div>
    )
}