import * as React from "react";
import { ConfigurationGroup } from "@codotype/types";
// import { DocumentationModal } from "../DocumentationModal";

// // // //

/**
 * ConfigurationGroupHeader
 * Renders the header for the ConfigurationInput component
 * @param props.configurationGroup
 */
export function ConfigurationGroupHeader(props: {
    configurationGroup: ConfigurationGroup;
    enableDocumentationModal?: boolean;
}) {
    // const { enableDocumentationModal = false } = props;
    // {/* {enableDocumentationModal && (
    //     <DocumentationModal
    //         header={props.configurationGroup.label}
    //         documentation={
    //             props.configurationGroup.documentation
    //         }
    //     />
    // )} */}
    // {/* <br className="d-none d-sm-block d-md-none" /> */}
    return (
        <div className="row">
            <div className="col-sm-12">
                <span className="d-flex align-items-center">
                    <p className="lead mb-0 mr-3">
                        {props.configurationGroup.label}
                    </p>
                    <small className="ml-2 text-muted">
                        {props.configurationGroup.description}
                    </small>
                </span>
                {/* <hr /> */}
            </div>
        </div>
    );
}
