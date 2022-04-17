import * as React from "react";
import { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import classnames from "classnames";
import { Hotkey } from "../Hotkey";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { SearchIcon } from "@heroicons/react/solid";
// import {
//     DocumentAddIcon,
//     FolderAddIcon,
//     FolderIcon,
//     HashtagIcon,
//     TagIcon,
// } from "@heroicons/react/outline";

// // // //

const quickActions = [
    { name: "Add new data model...", shortcut: "D", url: "#" },
    { name: "Add new attribute...", shortcut: "A", url: "#" },
    { name: "Add new relation...", shortcut: "R", url: "#" },
    { name: "Export Code", shortcut: "E", url: "#" },
];

// // // //

export function CommandPalatte() {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    const filteredActions =
        query === ""
            ? []
            : quickActions.filter(action => {
                  return action.name
                      .toLowerCase()
                      .includes(query.toLowerCase());
              });

    return (
        <React.Fragment>
            <Hotkey keyName="CMD+k" onKeyDown={() => setOpen(true)} />
            <Transition.Root
                show={open}
                as={Fragment}
                afterLeave={() => setQuery("")}
            >
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20 dark"
                    onClose={setOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Combobox
                            as="div"
                            value=""
                            className="mx-auto max-w-2xl transform divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-xl bg-body shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
                            onChange={(item: any) => {
                                console.log(item);
                                setOpen(false);
                            }}
                        >
                            <div className="relative">
                                {/* <SearchIcon
                                className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            /> */}
                                <FontAwesomeIcon
                                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                                    icon={faSearch}
                                />
                                <Combobox.Input
                                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-xl text-body placeholder-gray-400 dark:placeholder-gray-200 focus:ring-0"
                                    placeholder="Search..."
                                    onChange={event =>
                                        setQuery(event.target.value)
                                    }
                                />
                            </div>

                            {(query === "" || filteredActions.length > 0) && (
                                <Combobox.Options
                                    static
                                    className="max-h-80 scroll-py-2 divide-y divide-gray-100 overflow-y-auto"
                                >
                                    {filteredActions.length > 0 && (
                                        <li className="p-2">
                                            <ul className="text-body text-lg">
                                                {filteredActions.map(
                                                    (project: any) => (
                                                        <Combobox.Option
                                                            key={project.name}
                                                            value={project}
                                                            className={({
                                                                active,
                                                            }) =>
                                                                classnames(
                                                                    "flex cursor-default select-none items-center rounded-md px-3 py-2",
                                                                    active &&
                                                                        "bg-indigo-600 text-white",
                                                                )
                                                            }
                                                        >
                                                            {({ active }) => (
                                                                <>
                                                                    {/* <FolderIcon
                                                            className={classnames(
                                                                "h-6 w-6 flex-none",
                                                                active
                                                                    ? "text-white"
                                                                    : "text-gray-400",
                                                            )}
                                                            aria-hidden="true"
                                                        /> */}
                                                                    <span className="ml-3 flex-auto truncate">
                                                                        {
                                                                            project.name
                                                                        }
                                                                    </span>
                                                                    {active && (
                                                                        <span className="ml-3 flex-none text-indigo-100">
                                                                            Jump
                                                                            to...
                                                                        </span>
                                                                    )}
                                                                </>
                                                            )}
                                                        </Combobox.Option>
                                                    ),
                                                )}
                                            </ul>
                                        </li>
                                    )}
                                    {query === "" && (
                                        <li className="p-2">
                                            <h2 className="sr-only">
                                                Quick actions
                                            </h2>
                                            <ul className="text-body text-lg">
                                                {quickActions.map(action => (
                                                    <Combobox.Option
                                                        key={action.shortcut}
                                                        value={action}
                                                        className={({
                                                            active,
                                                        }) =>
                                                            classnames(
                                                                "flex cursor-default select-none items-center rounded-md px-3 py-2",
                                                                active &&
                                                                    "bg-indigo-600 text-white",
                                                            )
                                                        }
                                                    >
                                                        {({ active }) => (
                                                            <>
                                                                {/* <action.icon
                                                                className={classnames(
                                                                    "h-6 w-6 flex-none",
                                                                    active
                                                                        ? "text-white"
                                                                        : "text-gray-400",
                                                                )}
                                                                aria-hidden="true"
                                                            /> */}
                                                                <span className="ml-3 flex-auto truncate">
                                                                    {
                                                                        action.name
                                                                    }
                                                                </span>
                                                                <span
                                                                    className={classnames(
                                                                        "ml-3 flex-none text-xs font-semibold",
                                                                        active
                                                                            ? "text-indigo-100"
                                                                            : "text-gray-400",
                                                                    )}
                                                                >
                                                                    <kbd className="font-sans">
                                                                        ⌘
                                                                    </kbd>
                                                                    <kbd className="font-sans">
                                                                        {
                                                                            action.shortcut
                                                                        }
                                                                    </kbd>
                                                                </span>
                                                            </>
                                                        )}
                                                    </Combobox.Option>
                                                ))}
                                            </ul>
                                        </li>
                                    )}
                                </Combobox.Options>
                            )}

                            {query !== "" && filteredActions.length === 0 && (
                                <div className="py-14 px-6 text-center sm:px-14">
                                    {/* <FolderIcon
                                    className="mx-auto h-6 w-6 text-gray-400"
                                    aria-hidden="true"
                                /> */}
                                    <p className="mt-4 text-lg text-body">
                                        We couldn't find any actions with that
                                        term. Please try again.
                                    </p>
                                </div>
                            )}
                        </Combobox>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>
        </React.Fragment>
    );
}
