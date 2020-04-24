import * as React from "react";
import { Modal } from "react-bootstrap";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MarkdownRenderer } from "../markdown_renderer";

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
                <FontAwesomeIcon icon={faExternalLinkAlt} />
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
                <Modal.Footer>
                    <button
                        className="btn btn-secondary"
                        onClick={() => {
                            showModal(false);
                        }}
                    >
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}
