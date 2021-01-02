import * as React from "react";
import { Modal } from "react-bootstrap";
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
                size="lg"
                show={showingModal}
                onHide={() => showModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MarkdownRenderer source={props.documentation} />
                </Modal.Body>
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
