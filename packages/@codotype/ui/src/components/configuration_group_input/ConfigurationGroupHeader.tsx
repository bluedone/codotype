import * as React from "react";
import {
    OptionValueInstance,
    ConfigurationGroup,
    GroupLayoutVariant,
} from "@codotype/types";
import { DocumentationModal } from "../DocumentationModal";

// // // //

/**
 * shouldRenderDocumentationModal
 * Determines whether or not the DocumentationModal should render for this ConfigurationGroup
 * Depends on the LayoutVariant
 * @param configurationGroup
 */
export function shouldRenderDocumentationModal(
    configurationGroup: ConfigurationGroup,
): boolean {
    const { layoutVariant, documentation } = configurationGroup;

    // Return false if documentation is not defined
    if (!documentation) {
        return false;
    }

    // Return false for DOCS_* layout variants
    if (
        [
            GroupLayoutVariant.DOCS_3x9,
            GroupLayoutVariant.DOCS_4x8,
            GroupLayoutVariant.DOCS_6x6,
        ].includes(layoutVariant)
    ) {
        return false;
    }

    // Return true for all others
    return true;
}

// // // //

/**
 * ConfigurationGroupHeader
 * Renders the header for the ConfigurationInput component
 * @param props.configurationGroup
 */
export function ConfigurationGroupHeader(props: {
    configurationGroup: ConfigurationGroup;
    value: OptionValueInstance;
    onChange: (updatedVal: OptionValueInstance) => void;
}) {
    const { configurationGroup, onChange, value } = props;

    const enableDocumentationModal = shouldRenderDocumentationModal(
        configurationGroup,
    );

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

                    {configurationGroup.allowDisable && (
                        <input
                            type="checkbox"
                            // @ts-ignore
                            checked={value.enabled}
                            onChange={e => {
                                const updatedValue = {
                                    ...value,
                                    enabled: e.currentTarget.checked,
                                };
                                onChange(updatedValue);
                            }}
                        />
                    )}
                </span>
                <hr />
            </div>
        </div>
    );
}
