import * as React from "react";
import { ProjectInput } from "@codotype/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "../Dropdown";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { ResetProjectModal } from "./ResetProjectModal";
import { ProjectExportModal } from "./ProjectExportModal";

// // // //

export function ProjectDropdown(props: {
    projectInput: ProjectInput;
    onConfirmReset: () => void;
}) {
    const { projectInput, onConfirmReset } = props;
    const [showingExportModal, showExportModal] = React.useState<boolean>(
        false,
    );
    const [showingResetModal, showResetModal] = React.useState<boolean>(false);

    return (
        <React.Fragment>
            <div className="mr-4 flex items-center select-none">
                <Dropdown
                    hideCaret
                    label={
                        <span className="whitespace-no-wrap">
                            <FontAwesomeIcon size="2x" icon={faEllipsisH} />
                        </span>
                    }
                    itemCount={2}
                >
                    {({ i }) => {
                        // Render "Export Project" button
                        if (i === 0) {
                            return (
                                <button
                                    className="bg-white text-gray-700 hover:bg-gray-100 rounded hover:text-gray-900 flex justify-between w-full px-4 py-3 leading-5 text-left text-base
                                    dark:bg-gray-900 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-800
                                    "
                                    onClick={() => {
                                        showExportModal(true);
                                    }}
                                >
                                    Export Project
                                </button>
                            );
                        }

                        // Render "Reset Project" button
                        return (
                            <>
                                <span
                                    className="bg-white text-red-700 text-sm flex justify-between w-full px-4 py-3 leading-5 text-left
                                dark:bg-gray-900 dark:border-gray-900 dark:text-red-300"
                                >
                                    Danger Zone
                                </span>
                                <button
                                    className="bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between w-full px-4 py-3 leading-5 text-left text-base
                                    dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 dark:hover:bg-gray-800"
                                    onClick={() => {
                                        showResetModal(true);
                                    }}
                                >
                                    Reset Project
                                </button>
                            </>
                        );
                    }}
                </Dropdown>
            </div>

            {/* Render ProjectExportModal */}
            <ProjectExportModal
                projectInput={projectInput}
                show={showingExportModal}
                onHide={() => showExportModal(false)}
            />

            {/* Render ResetProjectModal */}
            <ResetProjectModal
                show={showingResetModal}
                onHide={() => showResetModal(false)}
                onConfirmReset={() => {
                    onConfirmReset();
                    showResetModal(false);
                }}
            />
        </React.Fragment>
    );
}
