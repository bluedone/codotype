import * as React from "react";
import { ConfigurationGroup, GroupLayoutVariant } from "@codotype/types";
import { MarkdownRenderer } from "../markdown_renderer";

// // // //

export function ConfigurationGroupVariant(props: {
    configurationGroup: ConfigurationGroup;
    children: React.ReactNode;
}) {
    const { configurationGroup } = props;
    const { layoutVariant } = configurationGroup;

    // CAN THIS BE REMOVED???
    if (
        layoutVariant !== GroupLayoutVariant.LIST &&
        layoutVariant !== GroupLayoutVariant.TABS &&
        layoutVariant !== GroupLayoutVariant.DOCS_3x9 &&
        layoutVariant !== GroupLayoutVariant.DOCS_4x8 &&
        layoutVariant !== GroupLayoutVariant.DOCS_6x6
    ) {
        return null;
    }

    return (
        <React.Fragment>
            {/* Render inputs for ConfigurationGroup.properties */}
            {/* RENDER variant === "LIST" OR "TABS" */}
            {layoutVariant === GroupLayoutVariant.LIST ||
                (layoutVariant === GroupLayoutVariant.TABS && (
                    <React.Fragment>{props.children}</React.Fragment>
                ))}

            {/* Render SIDEBYSIDE layoutVariant */}
            {layoutVariant === GroupLayoutVariant.DOCS_3x9 && (
                <div className="row">
                    <div className="col-lg-3 border-right">
                        <MarkdownRenderer
                            source={configurationGroup.documentation}
                        />
                    </div>
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-12">{props.children}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Render SIDEBYSIDE layoutVariant */}
            {layoutVariant === GroupLayoutVariant.DOCS_4x8 && (
                <div className="row">
                    <div className="col-lg-4 border-right">
                        <MarkdownRenderer
                            source={configurationGroup.documentation}
                        />
                    </div>
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-lg-12">{props.children}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Render SIDEBYSIDE layoutVariant */}
            {layoutVariant === GroupLayoutVariant.DOCS_6x6 && (
                <div className="row">
                    <div className="col-lg-6 border-right">
                        <MarkdownRenderer
                            source={configurationGroup.documentation}
                        />
                    </div>
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-lg-12">{props.children}</div>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}
