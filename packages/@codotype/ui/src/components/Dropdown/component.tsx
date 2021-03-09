import * as React from "react";
import { Menu, Transition } from "@headlessui/react";

// // // //

export function Dropdown(props: {
    label: React.ReactNode;
    itemCount: number;
    hideCaret?: boolean;
    children: (childProps: { i: number; active: boolean }) => React.ReactNode;
}) {
    const { itemCount, label, hideCaret = false } = props;
    const placeholderItems = Array(itemCount)
        .fill("x")
        .map((_each, index) => index);

    return (
        <div className="flex items-center justify-center z-10">
            <div className="relative inline-block text-left">
                <Menu>
                    {({ open }) => (
                        <>
                            <span className="rounded-md shadow-sm">
                                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                                    <span>{label}</span>
                                    {hideCaret === false && (
                                        <svg
                                            className="w-5 h-5 ml-2 -mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </Menu.Button>
                            </span>

                            <Transition
                                show={open}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    static
                                    className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                                >
                                    {placeholderItems.map(i => (
                                        <Menu.Item>
                                            {({ active }) => (
                                                <>
                                                    {props.children({
                                                        i,
                                                        active,
                                                    })}
                                                </>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
            </div>
        </div>
    );
}
