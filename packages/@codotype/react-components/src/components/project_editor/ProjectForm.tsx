import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";

// // // //

/**
 * ProjectForm
 * @param props.label
 */
export function ProjectForm() {
    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-sm-12">
                <p className="small mt-2 mb-3 text-muted">
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
                    // ref="input_el"
                    id="project-label"
                    className="form-control form-control-lg"
                    v-model="projectLabel"
                    placeholder="Project Name"
                    // @keyup.enter="onKeyEnter()"
                />

                {/* <small className="text-muted">Identifier: {{ identifier || 'project_name'}}</small> */}
                <small className="text-muted">Identifier: 'project_name'</small>

                <p className="small mt-2 text-muted">
                    <strong>Codotype</strong> uses the{" "}
                    <span className="text-success">Project Name</span> for
                    naming things like <strong>files</strong>,{" "}
                    <strong>folders</strong>, <strong>namespaces</strong>, and{" "}
                    <strong>databases</strong>. No need to be picky, you can
                    rename your Project whenever you like{" "}
                    <i className="far fa-laugh" />
                </p>
            </div>
        </div>
    );
}
