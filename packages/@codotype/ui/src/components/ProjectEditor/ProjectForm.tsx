import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faLaugh } from "@fortawesome/free-regular-svg-icons";

// // // //

/**
 * ProjectForm
 * @param props.label
 */
export function ProjectForm(props: {
    value: string;
    onChange: (updatedProjectLabel: string) => void;
}) {
    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-sm-12">
                <p className="mt-2 mb-3 text-muted">
                    <span className="text-success">Project Name</span> must be{" "}
                    <strong>alphabetic</strong> - no numbers or symbols, but
                    whitespace is allowed. The input field will enforce proper
                    capitalization and spacing.
                </p>

                <small className="mb-2 text-muted">
                    <FontAwesomeIcon icon={faLightbulb} className="mr-1" />
                    Try something simple like <code>Todo List</code>, or{" "}
                    <code>Inventory Manager</code>
                </small>

                <input
                    className="form-control form-control-lg"
                    placeholder="Project Name"
                    value={props.value}
                    onChange={e => {
                        props.onChange(e.currentTarget.value);
                    }}
                />

                <p className="mt-3 text-muted">
                    <strong>Codotype</strong> uses the{" "}
                    <span className="text-success">Project Name</span> for
                    naming things like <strong>files</strong>,{" "}
                    <strong>folders</strong>, <strong>namespaces</strong>, and{" "}
                    <strong>databases</strong>. No need to be picky, you can
                    rename your Project whenever you like{" "}
                    <FontAwesomeIcon icon={faLaugh} />
                </p>
            </div>
        </div>
    );
}
