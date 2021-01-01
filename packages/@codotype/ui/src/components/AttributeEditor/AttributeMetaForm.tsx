import * as React from "react";

// // // //

/**
 * AttributeMetaFormProps
 * CHORE - annotate remaining props
 */
interface AttributeMetaFormProps {
    children: React.ReactNode;
}

/**
 * AttributeMetaForm
 * @param props - see `AttributeMetaFormProps`
 */
export function AttributeMetaForm(props: AttributeMetaFormProps) {
    return (
        <div className="row mt-3">
            <div className="col-lg-12">
                <p className="lead mb-0">Behaviors</p>
                <small className="form-text text-muted">
                    Provide a{" "}
                    <span className="text-success">Internal Note</span> to
                    annotate this <strong>Attribute</strong>.
                </small>
                <hr />
            </div>

            <div className="col-sm-12">{props.children}</div>
        </div>
    );
}
