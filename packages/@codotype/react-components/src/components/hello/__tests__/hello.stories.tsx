import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "@src/components/dev";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

// // // //

storiesOf("Components/Hello", module).add("renders", () => {
    const [todos, setTodos] = React.useState([
        { label: "Do laundry", done: false },
        { label: "Take a shit", done: true },
        { label: "Do dishes", done: false },
    ]);

    const [newLabel, setNewLabel] = React.useState("");

    return (
        <Story>
            <div className="row">
                <div className="col-sm-6">
                    <input
                        value={newLabel}
                        className="form-control form-control-lg"
                        placeholder="Buy groceries"
                        onChange={e => {
                            setNewLabel(e.currentTarget.value);
                        }}
                    />
                </div>
                <div className="col-sm-6">
                    <button
                        className="btn btn-lg btn-success"
                        disabled={newLabel.length < 3}
                        onClick={() => {
                            setTodos([
                                ...todos,
                                { label: newLabel, done: false },
                            ]);
                            setNewLabel("");
                        }}
                    >
                        <FontAwesomeIcon
                            className="mr-1"
                            icon={faCheck}
                            fixedWidth
                        />
                        Submit
                    </button>
                    <button
                        className="btn btn-lg btn-outline-dark ml-2"
                        onClick={() => {
                            setNewLabel("");
                        }}
                    >
                        <FontAwesomeIcon
                            className="mr-1"
                            icon={faTimes}
                            fixedWidth
                        />
                        Cancel
                    </button>
                </div>
                <div className="col-sm-12">
                    <hr />
                    <ul className="list-group mt-3">
                        {todos.map(item => {
                            return (
                                <li className="list-group-item list-group-item-action">
                                    <div className="row d-flex align-items-center">
                                        <div className="col-sm-6">
                                            <strong>{item.label}</strong>
                                        </div>
                                        <div className="col-sm-6 d-flex justify-content-end">
                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => {
                                                    const updatedTodos = todos.map(
                                                        i => {
                                                            if (
                                                                i.label ===
                                                                item.label
                                                            ) {
                                                                return {
                                                                    ...item,
                                                                    done: !item.done,
                                                                };
                                                            }
                                                            return i;
                                                        },
                                                    );

                                                    setTodos(updatedTodos);
                                                }}
                                            >
                                                {item.done && (
                                                    <FontAwesomeIcon
                                                        className="text-success"
                                                        icon={faCheck}
                                                        fixedWidth
                                                    />
                                                )}

                                                {!item.done && (
                                                    <FontAwesomeIcon
                                                        className="text-danger"
                                                        icon={faTimes}
                                                        fixedWidth
                                                    />
                                                )}
                                            </button>
                                            <button
                                                disabled={!item.done}
                                                className="btn btn-sm btn-outline-danger ml-2"
                                                onClick={() => {
                                                    const updatedTodos = todos.filter(
                                                        i =>
                                                            i.label !==
                                                            item.label,
                                                    );
                                                    setTodos(updatedTodos);
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    {todos.length === 0 && (
                        <div className="card card-block text-center py-4 ">
                            No Todo Items
                        </div>
                    )}
                </div>
            </div>
        </Story>
    );
});
