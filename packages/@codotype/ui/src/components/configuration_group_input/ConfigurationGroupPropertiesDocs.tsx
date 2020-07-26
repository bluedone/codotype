import * as React from "react";
import {
    ConfigurationGroup,
    GroupLayoutVariant,
    OptionValueInstance,
} from "@codotype/types";
import { MarkdownRenderer } from "../markdown_renderer";
import { CongifurationGroupPropertiesInputs } from "./CongifurationGroupPropertiesInputs";

// // // //

/**
 * ConfigurationGroupPropertiesDocs
 * Handle DOCS_3x9 + DOCS_4x8 + DOCS_6x6 GroupLayoutVariant values
 * @param props.configurationGroup
 */
export function ConfigurationGroupPropertiesDocs(props: {
    configurationGroup: ConfigurationGroup;
    value: OptionValueInstance;
    onChange: (updatedVal: OptionValueInstance) => void;
}) {
    const { configurationGroup } = props;
    const { layoutVariant } = configurationGroup;

    // Get column spans based on `ConfigurationGroup.layoutVariant`
    let docsColumn: number = 3;
    let inputsColumn: number = 9;
    if (layoutVariant === GroupLayoutVariant.DOCS_4x8) {
        docsColumn = 4;
        inputsColumn = 8;
    } else if (layoutVariant === GroupLayoutVariant.DOCS_6x6) {
        docsColumn = 6;
        inputsColumn = 6;
    }

    return (
        <div className="row">
            <div className={`col-lg-${docsColumn} border-right`}>
                <MarkdownRenderer
                    source={configurationGroup.documentation}
                />
            </div>
            <div className={`col-lg-${inputsColumn}`}>
                <div className="row">
                    <div className="col-lg-12">
                        <CongifurationGroupPropertiesInputs
                            {...props}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

