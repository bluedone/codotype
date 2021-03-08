import * as React from "react";
import { Modal } from "../Modal";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MarkdownRenderer } from "../MarkdownRenderer";

// // // //

/**
 * DocumentationModal
 */
export function DocumentationModal(props: {
    header: string;
    documentation: string;
}) {
    const [showingModal, showModal] = React.useState<boolean>(false);

    return (
        <React.Fragment>
            <button
                className="px-0 py-0 text-indigo-500 hover:text-indigo-600 p-1 focus:outline-none transition-colors duration-150 ease-in-out"
                onClick={() => {
                    showModal(true);
                }}
            >
                <FontAwesomeIcon icon={faBook} />
            </button>

            <Modal
                size="lg"
                show={showingModal}
                onHide={() => showModal(false)}
            >
                <div className="p-5">
                    <h3 className="text-2xl">{props.header}</h3>
                    <MarkdownRenderer source={props.documentation} />
                </div>
                <div className="modal-footer-tw">
                    <button
                        className="btn"
                        onClick={() => {
                            showModal(false);
                        }}
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </React.Fragment>
    );
}
