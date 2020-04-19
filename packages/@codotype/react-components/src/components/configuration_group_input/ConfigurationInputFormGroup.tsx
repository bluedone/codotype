import React, { FunctionComponent } from "react";
import { OptionType, ConfigurationGroupProperty } from "@codotype/types";
import { MoreInfoLink } from "../more_info_link";
import classnames from "classnames";

// // // //

interface ConfigurationInputFormGroupProps {
    property: ConfigurationGroupProperty;
    card?: boolean;
    className?: string;
    children: React.ReactNode;
}

export const ConfigurationInputFormGroup: FunctionComponent<ConfigurationInputFormGroupProps> = (
    props: ConfigurationInputFormGroupProps,
) => {
    const { className = "" } = props;

    const formGroup = (
        <div
            className={classnames("form-group mb-0", {
                [className]: className !== "",
            })}
        >
            <div className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                    {props.property.icon && (
                        <img
                            src={props.property.icon}
                            style={{ maxWidth: "2rem" }}
                            className="mr-2"
                        />
                    )}
                    <label className="mb-0">{props.property.label}</label>
                    <small className="mx-3">
                        <MoreInfoLink url="https://github.com" />
                    </small>
                    {/* <small>Switch Goes Here</small> */}
                </div>

                {props.property.type === OptionType.BOOLEAN && (
                    <div className="d-flex align-items-center">
                        {props.children}
                    </div>
                )}
            </div>

            {/* Render description IFF not empty */}
            {props.property.description !== "" && (
                <small className="d-block mt-2 text-muted">
                    {props.property.description}
                </small>
            )}

            {/* Render empty description warning */}
            {props.property.description === "" && (
                <small className="d-block mt-2 mb-2 text-danger">
                    Warning - this input needs a description
                </small>
            )}

            {/* Renders props.children */}
            {props.property.type !== OptionType.BOOLEAN && (
                <React.Fragment>{props.children}</React.Fragment>
            )}
        </div>
    );

    // Return standard if NOT props.card
    if (!props.card) {
        return formGroup;
    }

    // Handle props.card
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="card shadow-sm my-2 py-3 px-3">{formGroup}</div>
            </div>
        </div>
    );
};
