import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
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
    return (
        <React.Fragment>
            <button
                className="btn btn-sm btn-outline-danger d-flex align-items-center mr-2"
                disabled={props.disabled}
                onClick={() => setShowModal(true)}
            >
                <FontAwesomeIcon className="mr-1" icon={faCog} />
                Reset Project
            </button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to reset your Project?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        onClick={() => setShowModal(false)}
                        className="btn btn-secondary"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => {
                            setShowModal(false);
                            props.onConfirmReset();
                        }}
                        className="btn btn-danger"
                    >
                        Reset Project
                    </button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

// // // //

// /**
//  * SchemaDeleteModal
//  * @param showModal
//  * @param props.onClose
//  * @param props.onConfirmDelete
//  */
// export function SchemaDeleteModal(props: {
//     show: boolean;
//     onConfirmDelete: () => void;
//     onClose: () => void;
// }) {
//     return (
//         <Modal show={showModal} onHide={props.onClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Delete Schema</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <p>Are you sure you want to delete this schema?</p>
//             </Modal.Body>
//             <Modal.Footer>
//                 <button onClick={props.onClose} className="btn btn-secondary">
//                     Close
//                 </button>
//                 <button
//                     onClick={props.onConfirmDelete}
//                     className="btn btn-danger"
//                 >
//                     Delete Schema
//                 </button>
//             </Modal.Footer>
//         </Modal>
//     );
// }
