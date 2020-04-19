import * as React from "react";
import Switch from "react-switch";
import { FormGroup } from "./FormGroup";

// // // //

/**
 * AttributePropertiesFormProps
 * TODO - annotate remaining props
 */
interface AttributePropertiesFormProps {
    label: string;
    identifier: string;
    required: boolean;
    unique: boolean;
    onLabelChange: (updatedLabel: string) => void;
    onIdentifierChange: (updatedIdentifier: string) => void;
    onRequiredChange: (updatedRequired: boolean) => void;
    onUniqueChange: (updatedUnique: boolean) => void;
}

/**
 * AttributePropertiesForm
 * @param props - see `AttributePropertiesFormProps`
 */
export function AttributePropertiesForm(props: AttributePropertiesFormProps) {
    return (
        <div className="row mt-2">
            <div className="col-lg-12">
                <p className="lead mb-0">Properties</p>
                <small className="text-muted">
                    Define the <span className="text-success">Tokens</span> for
                    this <strong>Attribute</strong> and set its{" "}
                    <span className="text-success">Required</span> and{" "}
                    <span className="text-success">Unique</span> constraints.
                </small>
                <hr />
            </div>

            <div className="col-sm-12 col-lg-6">
                <FormGroup
                    label="Label"
                    help="The input field will enforce proper capitalization and spacing."
                    required
                >
                    <input
                        type="text"
                        placeholder="Label"
                        className="form-control"
                        value={props.label}
                        onChange={e => {
                            props.onLabelChange(e.currentTarget.value);
                        }}
                    />
                </FormGroup>
            </div>

            <div className="col-sm-12 col-lg-6">
                <FormGroup
                    label="Identifier"
                    help="Supply a camel-cased or snake-cased value - no whitespace."
                    required
                >
                    <input
                        type="text"
                        placeholder="Identifier"
                        className="form-control"
                        value={props.identifier}
                        onChange={e => {
                            props.onIdentifierChange(e.currentTarget.value);
                        }}
                    />
                </FormGroup>
            </div>

            <div className="col-lg-6 col-sm-12">
                <FormGroup
                    label="Required"
                    help="Whether or not this Attribute is required."
                >
                    <Switch
                        height={22}
                        width={50}
                        // onHandleColor={}
                        // offHandleColor={}
                        offColor={"#888"}
                        onColor={"#4582ec"}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onChange={(updatedChecked: boolean) => {
                            props.onRequiredChange(updatedChecked);
                        }}
                        checked={props.required}
                    />
                </FormGroup>
            </div>
            <div className="col-lg-6 col-sm-12">
                {/* v-if="![DATATYPE_JSON, DATATYPE_BOOLEAN].includes(model.datatype)" */}
                <FormGroup
                    label="Unique"
                    help="Whether or not to enforce unique values for this
                        Attribute."
                >
                    <Switch
                        height={22}
                        width={50}
                        // onHandleColor={}
                        // offHandleColor={}
                        offColor={"#888"}
                        onColor={"#4582ec"}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onChange={(updatedChecked: boolean) => {
                            props.onUniqueChange(updatedChecked);
                        }}
                        checked={props.unique}
                    />
                </FormGroup>
            </div>
        </div>
    );
}
