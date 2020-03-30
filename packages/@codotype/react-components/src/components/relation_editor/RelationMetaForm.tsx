import * as React from "react";
import { FormGroup } from "./FormGroup";

// // // //

/**
 * RelationMetaFormProps
 * TODO - annotate remaining props
 */
interface RelationMetaFormProps {
    description: string;
    onDescriptionChange: (updatedDescription: string) => void;
}

/**
 * RelationMetaForm
 * @param props - see `RelationMetaFormProps`
 */
export function RelationMetaForm(props: RelationMetaFormProps) {
    return (
        <div className="row mt-2">
            <div className="col-lg-12">
                <p className="lead mb-0">Default &amp; Description</p>
                <small className="form-text text-muted">
                    Define a <span className="text-success">Default Value</span>{" "}
                    or provide a{" "}
                    <span className="text-success">Description</span> to
                    annotate this <strong>Attribute</strong>. Note that{" "}
                    <i>not all </i> <strong>Attributes</strong> support{" "}
                    <span className="text-success">Default Values</span>.
                </small>
                <hr />
            </div>

            <div className="col-sm-12">
                <FormGroup
                    label="Description"
                    help="Describe the purpose or document the constraints of this Attribute"
                >
                    <input
                        type="text"
                        placeholder="Description"
                        className="form-control"
                        value={props.description}
                        onChange={e => {
                            props.onDescriptionChange(e.currentTarget.value);
                        }}
                    />
                </FormGroup>
            </div>

            <div className="col-sm-12">
                {/* TODO - this should render an input for the specific datatype */}
                {/* TODO - this should render an input for the specific datatype */}
                <FormGroup
                    label="Default Value"
                    help="The input field will enforce proper capitalization and spacing."
                >
                    <input
                        type="text"
                        placeholder="Default Value"
                        className="form-control"
                    />
                </FormGroup>
            </div>
        </div>
    );
}
