import * as React from "react";
import { Dropdown } from "react-bootstrap";
import { Modal } from "react-bootstrap";

// // // //

/**
 * ResetProjectButton
 * Renders a "Reset Project" button + confirmation modal
 * @param props.disabled - enables/disabled the button
 * @param props.onClick - callback when clicked
 */
export function ResetProjectButton(props: {
    disabled?: boolean;
    onConfirmReset: () => void;
}) {
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showConfirm, setShowConfirm] = React.useState<boolean>(false);
    return (
        <React.Fragment>
            <Dropdown.Item
                disabled={props.disabled}
                onClick={() => {
                    setShowConfirm(false);
                    setShowModal(true);
                }}
            >
                Reset Project
            </Dropdown.Item>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="form-text text-muted mb-2">
                        Are you sure you want to reset this Project?
                    </p>

                    <p className="form-text text-muted mb-2">
                        <span className="text-red-500">DANGER: </span>This will
                        delete your current project - this action cannot be
                        undone. Are you sure you want to continue?
                    </p>
                </Modal.Body>
                <div className="modal-footer-tw">
                    {showConfirm && (
                        <button
                            onClick={() => {
                                setShowModal(false);
                                // setShowConfirm(false);
                                props.onConfirmReset();
                            }}
                            className="btn btn-lg btn-danger"
                        >
                            Are you really sure?
                        </button>
                    )}
                    {!showConfirm && (
                        <button
                            onClick={() => {
                                setShowConfirm(true);
                            }}
                            className="btn btn-lg btn-danger"
                        >
                            Reset Project
                        </button>
                    )}
                    <button
                        onClick={() => setShowModal(false)}
                        className="btn btn-lg btn-light"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </React.Fragment>
    );
}
