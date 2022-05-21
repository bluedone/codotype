import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faLaugh } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames";
import { inputClassName } from "../Input/constants";

// // // //

/**
 * ProjectForm
 * @param props.label
 */
export function ProjectForm(props: {
    value: string;
    onChange: (updatedProjectLabel: string) => void;
    onSubmit: (updatedProjectLabel: string) => void;
}) {
    const inputEl = React.useRef(null);

    React.useEffect(() => {
        if (inputEl === null) {
            return;
        }
        // current property is refered to input element
        // @ts-ignore
        inputEl.current.focus();
    }, []);
    return (
        <div className="row items-center justify-center select-none">
            <div className="col-sm-12">
                <p className="mt-3 text-muted">
                    <span className="text-primary-500">Project Name</span> is
                    used for naming things like files, folders, namespaces, and
                    databases in your exported codebase.
                    {/* <FontAwesomeIcon icon={faLaugh} /> */}
                </p>

                <p className="mt-3 text-muted">
                    <small className="mb-4 text-muted">
                        <FontAwesomeIcon icon={faLightbulb} className="mr-1" />
                        Try something simple like <code>Todo List</code>, or{" "}
                        <code>Inventory Manager</code>
                    </small>
                </p>

                <input
                    ref={inputEl}
                    className={classNames("rounded-lg text-md", inputClassName)}
                    placeholder="Project Name"
                    value={props.value}
                    onChange={e => {
                        props.onChange(e.currentTarget.value);
                    }}
                    onKeyDown={e => {
                        console.log("KEYDOWN");
                        // ENTER KEY CODE
                        if (e.keyCode === 13) {
                            console.log("KEYDOWN");
                            props.onSubmit(e.currentTarget.value);
                        }
                    }}
                />

                <p className="mt-3 text-muted">
                    The input field will enforce proper capitalization and
                    spacing <FontAwesomeIcon icon={faLaugh} />
                </p>
            </div>
        </div>
    );
}
