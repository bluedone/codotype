import * as React from "react";

// // // //

/**
 * FormGroup
 * @param props
 */
export function FormGroup(props: {
    label: string;
    help: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className="form-group">
            <label className="mb-0">
                {props.label}
                {props.required && <span className="text-danger ml-1">*</span>}
            </label>
            <small className="form-text text-muted mb-2">{props.help}</small>
            {props.children}
        </div>
    );
}
