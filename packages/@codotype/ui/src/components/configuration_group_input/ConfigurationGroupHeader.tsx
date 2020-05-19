import * as React from "react";
import { ConfigurationGroup } from "@codotype/types";
import { DocumentationModal } from "../DocumentationModal";

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
    const { enableDocumentationModal = false } = props;
    return (
        <div className="row">
            <div className="col-sm-12">
                <span className="d-flex align-items-center">
                    <h4 className="mb-0 mr-2">
                        {props.configurationGroup.label}
                    </h4>
                    {enableDocumentationModal && (
                        <DocumentationModal
                            header={props.configurationGroup.label}
                            documentation={
                                props.configurationGroup.documentation
                            }
                        />
                    )}
                    {/* <br className="d-none d-sm-block d-md-none" /> */}
                    <p className="ml-2 text-muted mb-0">
                        {props.configurationGroup.description}
                    </p>
                </span>
                <hr />
            </div>
        </div>
    );
}
