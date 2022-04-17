import * as React from "react";
import {
    ConfigurationPropertyDict,
    ConfigurationGroup,
    GroupLayoutVariants,
    SchemaInput,
} from "@codotype/core";
import { DocumentationModal } from "../DocumentationModal";
import classnames from "classnames";

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
    const { layoutVariant, content } = configurationGroup;

    // Return false if documentation is not defined
    if (!content.documentation) {
        return false;
    }

    // Return false for DOCS_* layout variants
    if (
        [
            GroupLayoutVariants.DOCS,
            GroupLayoutVariants.DOCS_3x9,
            GroupLayoutVariants.DOCS_4x8,
            GroupLayoutVariants.DOCS_6x6,
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
    schemaInput?: SchemaInput;
    value: ConfigurationPropertyDict;
    onChange: (updatedVal: ConfigurationPropertyDict) => void;
}) {
    const { configurationGroup, onChange, value } = props;

    const enableDocumentationModal = shouldRenderDocumentationModal(
        configurationGroup,
    );

    const renderSmaller: boolean = props.schemaInput !== undefined;

    return (
        <div
            className={classnames({
                "mb-4": !renderSmaller,
                "mb-3": renderSmaller,
            })}
        >
            <div className="flex items-center mb-2 text-body">
                {!renderSmaller && (
                    <h4 className="mb-0 mr-3 text-3xl">
                        {props.configurationGroup.content.label}
                    </h4>
                )}

                {renderSmaller && (
                    <p className="mb-0 mr-3 font-light text-2xl">
                        {props.configurationGroup.content.label}
                    </p>
                )}

                {enableDocumentationModal && (
                    <DocumentationModal
                        header={props.configurationGroup.content.label}
                        documentation={
                            props.configurationGroup.content.documentation
                        }
                    />
                )}

                {!renderSmaller && (
                    <p
                        className={classnames(
                            "mb-0 text-xl mt-1 font-extralight",
                            {
                                "ml-3": enableDocumentationModal,
                            },
                        )}
                    >
                        {props.configurationGroup.content.description}
                    </p>
                )}

                {renderSmaller && (
                    <p
                        className={classnames(
                            "mb-0 text-md mt-0.5 font-extralight",
                            {
                                "ml-3": enableDocumentationModal,
                            },
                        )}
                    >
                        {props.configurationGroup.content.description}
                    </p>
                )}

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
            </div>
            <hr
                className={classnames({
                    "my-3": !renderSmaller,
                })}
            />
        </div>
    );
}
