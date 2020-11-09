import * as React from "react";
import { FormGroup } from "./FormGroup";

// // // //

/**
 * AttributeMetaFormProps
 * CHORE - annotate remaining props
 */
interface AttributeMetaFormProps {
    description: string;
    onDescriptionChange: (updatedDescription: string) => void;
}

/**
 * AttributeMetaForm
 * @param props - see `AttributeMetaFormProps`
 */
export function AttributeMetaForm(props: AttributeMetaFormProps) {
    return (
        <div className="mt-3">
            <div className="col-lg-12">
                <p className="lead mb-0">Internal Note</p>
                <small className="form-text text-muted">
                    Provide a{" "}
                    <span className="text-success">Internal Note</span> to
                    annotate this <strong>Attribute</strong>.
                </small>
                <hr />
            </div>

            <div className="col-sm-12">
                <FormGroup
                    label="Internal Note"
                    help="Leave an optional note to document this Attribute"
                >
                    <input
                        type="text"
                        placeholder="Internal Note"
                        className="form-control"
                        value={props.description}
                        onChange={e => {
                            props.onDescriptionChange(e.currentTarget.value);
                        }}
                    />
                </FormGroup>
            </div>
        </div>
    );
}
