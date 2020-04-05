import React from "react";
import "./styles.scss";
import { ConfigurationGroup } from "../types";
import { MarkdownRenderer } from "../markdown_renderer";

// // // //

export function ConfigurationGroupVariant(props: {
    configurationGroup: ConfigurationGroup;
    children: React.ReactNode;
}) {
    return (
        <React.Fragment>
            {/* Render inputs for ConfigurationGroup.properties */}
            {/* RENDER variant === "LIST" */}
            {props.configurationGroup.variant === "LIST" && (
                <React.Fragment>
                    {props.children}
                    {/* <pre>{JSON.stringify(val, null, 4)}</pre> */}
                    {/* <pre>{JSON.stringify(props.configurationGroup, null, 4)}</pre> */}
                </React.Fragment>
            )}

            {/* Render SIDEBYSIDE variant */}
            {props.configurationGroup.variant === "SIDEBYSIDE" && (
                <div className="row">
                    <div className="col-lg-6 border-right">
                        <MarkdownRenderer
                            source={props.configurationGroup.documentation}
                        />
                    </div>
                    <div className="col-lg-6">
                        <div className="row">{props.children}</div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}
