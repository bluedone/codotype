import * as React from "react";
import { Dropdown } from "react-bootstrap";
import { Modal } from "../Modal";

// // // //

/**
 * ResetProjectModal
 * Renders a "Reset Project" button + confirmation modal
 * @param props.onClick - callback when clicked
 */
export function ResetProjectModal(props: {
    show: boolean;
    onHide: () => void;
    onConfirmReset: () => void;
}) {
    const { show, onHide, onConfirmReset } = props;
    const [showConfirm, setShowConfirm] = React.useState<boolean>(false);

    return (
        <Modal show={show} onHide={() => onHide()}>
            <div className="p-5">
                <h3 className="text-2xl select-none">Reset Project</h3>

                <p className="form-text text-muted mb-2">
                    Are you sure you want to reset this Project?
                </p>

                <p className="form-text text-muted mb-2">
                    <span className="text-red-500">DANGER: </span>This will
                    delete your current project - this action cannot be undone.
                    Are you sure you want to continue?
                </p>
            </div>
            <div className="modal-footer-tw">
                {showConfirm && (
                    <button
                        onClick={() => {
                            onHide();
                            onConfirmReset();
                        }}
                        className="btn btn-danger"
                    >
                        Are you really sure?
                    </button>
                )}
                {!showConfirm && (
                    <button
                        onClick={() => {
                            setShowConfirm(true);
                        }}
                        className="btn btn-danger"
                    >
                        Reset Project
                    </button>
                )}
                <button className="modal-close-btn" onClick={() => onHide()}>
                    Close
                </button>
            </div>
        </Modal>
    );
}
