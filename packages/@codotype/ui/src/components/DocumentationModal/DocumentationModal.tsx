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
                className="btn btn-link px-0 py-0"
                onClick={() => {
                    showModal(true);
                }}
            >
                <FontAwesomeIcon icon={faBook} />
            </button>

            <Modal
                // size="lg"
                show={showingModal}
                onHide={() => showModal(false)}
            >
                <h3>{props.header}</h3>
                <MarkdownRenderer source={props.documentation} />
                <div className="modal-footer-tw">
                    <button
                        className="btn btn-lg btn-light"
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
