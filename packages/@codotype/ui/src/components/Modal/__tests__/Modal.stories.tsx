import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../../components/Story";
import { Modal } from "../component";

// // // //

const storyCollection = storiesOf("Components/Modal", module);

storyCollection.add("minimal example", () => {
    const [show, toggleModal] = React.useState(false);
    return (
        <Story>
            <Modal show={true}>
                <p>Modal Content</p>
            </Modal>
        </Story>
    );
});

storyCollection.add("renders", () => {
    const [show, toggleModal] = React.useState(false);
    return (
        <Story>
            <button
                onClick={() => {
                    toggleModal(true);
                }}
            >
                Show Modal
            </button>
            <Modal
                show={show}
                onHide={() => {
                    toggleModal(false);
                }}
            >
                <React.Fragment>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0">
                                <h3
                                    className="text-lg leading-6 font-medium text-gray-900"
                                    id="modal-headline"
                                >
                                    Deactivate account
                                </h3>
                                <div className="mt-3">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to deactivate your
                                        account? All of your data will be
                                        permanently removed. This action cannot
                                        be undone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            onClick={() => toggleModal(false)}
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Deactivate
                        </button>
                        <button
                            onClick={() => toggleModal(false)}
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </React.Fragment>
            </Modal>
        </Story>
    );
});
