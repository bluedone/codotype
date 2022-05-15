import { faCopy } from "@fortawesome/free-regular-svg-icons";
import {
    faChevronDown,
    faChevronRight,
    faFileAlt,
    faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import * as React from "react";
import { CopyToClipboard } from "../CopyToClipboard";
import { useCopyToClipboard } from "../CopyToClipboard/component";
import { MarkdownRenderer } from "../MarkdownRenderer";

// // // //

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: any) {
    return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target: any, ...sources: any[]): any {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

// // // //

function buildSingleFileTree(props: { endNode: any; path: string }): any {
    const parts = props.path.split("/");
    const part = parts.pop();
    if (part === undefined) {
        return props.endNode;
    }

    if (parts.length === 0) {
        return {
            [part]: props.endNode,
        };
    }

    return buildSingleFileTree({
        path: parts.join("/"),
        endNode: {
            [part]: props.endNode,
        },
    });
}

// // // //

const REM_SCALAR = 1.35;

function FileBrowserItem(props: any) {
    const path = props.path.slice(1);
    const active = props.selectedFile === path;
    return (
        <li
            className={classNames("cursor-pointer select-none", {
                "bg-blue-300 dark:text-gray-800": active,
                "hover:bg-gray-200 dark:hover:bg-gray-800": !active,
            })}
            style={{ paddingLeft: `${(props.layer + 2) * REM_SCALAR}rem` }}
            role="button"
            onClick={() => {
                console.log(props);
                props.onSelectFile(path);
            }}
        >
            <FontAwesomeIcon fixedWidth icon={faFileAlt} className="mr-2" />
            {props.label}
        </li>
    );
}

function FileBrowserFolder(props: {
    label: string;
    path: string;
    filetree: any;
    selectedFile: string;
    layer: number;
    onSelectFile: (updatedSelectedFile: string) => void;
}) {
    const { filetree, path, label, selectedFile, layer } = props;
    const [hide, setHide] = React.useState<boolean>(layer > 2);

    const keys = Object.keys(filetree);
    return (
        <ul>
            <li
                role="button"
                className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 select-none"
                style={{ paddingLeft: `${props.layer * REM_SCALAR}rem` }}
                onClick={() => {
                    setHide(!hide);
                }}
            >
                <FontAwesomeIcon
                    size="sm"
                    className="mr-2"
                    fixedWidth
                    icon={hide ? faChevronRight : faChevronDown}
                />
                <FontAwesomeIcon fixedWidth icon={faFolder} className="mr-2" />
                {label}
            </li>
            {!hide &&
                keys
                    .sort((a, b) => {
                        if (
                            typeof filetree[a] !== "string" &&
                            typeof filetree[b] === "string"
                        ) {
                            return -1;
                        }
                        if (
                            typeof filetree[a] === "string" &&
                            typeof filetree[b] !== "string"
                        ) {
                            return 1;
                        }

                        return a > b ? 1 : -1;
                    })
                    .map(k => {
                        if (typeof filetree[k] === "string") {
                            return (
                                <FileBrowserItem
                                    path={[path, k].join("/")}
                                    label={k}
                                    layer={layer}
                                    selectedFile={selectedFile}
                                    onSelectFile={props.onSelectFile}
                                />
                            );
                        }
                        return (
                            <li>
                                <FileBrowserFolder
                                    label={k}
                                    path={[path, k].join("/")}
                                    filetree={filetree[k]}
                                    selectedFile={selectedFile}
                                    layer={layer + 1}
                                    onSelectFile={props.onSelectFile}
                                />
                            </li>
                        );
                    })}
        </ul>
    );
}

// // // //

/**
 * PreviewBrowser
 * @param props.files - the file tree from InMemoryFileSystemAdapter
 */
export function PreviewBrowser(props: { files: Record<string, string> }) {
    const { files } = props;
    const [copyToClipboard] = useCopyToClipboard();

    const relativeFiles: any = {};
    Object.keys(files).forEach(fn => {
        console.log("fn");
        console.log(fn);
        const relativeFn = fn.split(".codotype-out/").pop();
        if (relativeFn === undefined) return;
        relativeFiles[relativeFn] = files[fn];
    });

    const filenames: string[] = Object.keys(relativeFiles);
    const [selectedFile, setSelectedFile] = React.useState<string>(
        filenames[0],
    );

    React.useEffect(() => {
        const updatedRelativeFiles: any = {};
        Object.keys(files).forEach(fn => {
            console.log("fn");
            console.log(fn);
            const relativeFn = fn.split(".codotype-out/").pop();
            if (relativeFn === undefined) return;
            updatedRelativeFiles[relativeFn] = files[fn];
        });
        const updatedFileNames: string[] = Object.keys(updatedRelativeFiles);
        setSelectedFile(updatedFileNames[0]);
    }, [props.files]);

    const singleFileTrees = filenames.map(fn => {
        const parts = fn.split("/");
        const part = parts.pop();
        if (part === undefined) return;

        return buildSingleFileTree({
            endNode: { [part]: relativeFiles[fn] },
            path: parts.join("/"),
        });
    });
    const fullFileTree: any = mergeDeep({}, ...singleFileTrees);

    let fileSource = "";
    if (selectedFile && relativeFiles[selectedFile]) {
        fileSource = `\`\`\`${selectedFile.split(".").pop()}\n${
            relativeFiles[selectedFile]
        }\n\`\`\``;
    }

    return (
        <div className="grid grid-cols-5">
            <div className="col-span-2">
                <FileBrowserFolder
                    filetree={fullFileTree}
                    selectedFile={selectedFile}
                    label="Root"
                    path={""}
                    layer={0}
                    onSelectFile={updatedSelectedFile => {
                        setSelectedFile(updatedSelectedFile);
                    }}
                />
            </div>
            <div className="col-span-3 border-l border-gray-800 px-2">
                <div className="flex justify-between">
                    <p className="font-mono text-sm">{selectedFile}</p>
                    {selectedFile && relativeFiles[selectedFile] && (
                        <button
                            onClick={() => {
                                copyToClipboard(relativeFiles[selectedFile]);
                            }}
                        >
                            <FontAwesomeIcon icon={faCopy} className="h-4" />
                        </button>
                    )}
                    {!selectedFile ||
                        (!relativeFiles[selectedFile] && (
                            <button disabled>
                                Disabled{" "}
                                <FontAwesomeIcon
                                    icon={faCopy}
                                    className="h-4"
                                />
                            </button>
                        ))}
                </div>
                <MarkdownRenderer
                    className="w-full min-h-full"
                    source={fileSource}
                />
            </div>
        </div>
    );
}
