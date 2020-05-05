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
    onLabelChange: (updatedLabel: string) => void;
    onKeydownEnter: () => void;
}

/**
 * AttributePropertiesForm
 * @param props - see `AttributePropertiesFormProps`
 */
export function AttributePropertiesForm(props: AttributePropertiesFormProps) {
    const labelInput = React.useRef(null);

    React.useEffect(() => {
        if (labelInput === null) {
            return;
        }
        // current property is refered to input element
        // @ts-ignore
        labelInput.current.focus();
    }, []);

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
                        ref={labelInput}
                        type="text"
                        placeholder="Label"
                        className="form-control"
                        value={props.label}
                        onKeyDown={e => {
                            // ENTER keycode === 13
                            if (e.keyCode === 13) {
                                e.preventDefault();
                                e.stopPropagation();
                                props.onKeydownEnter();
                            }
                        }}
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
                    />
                </FormGroup>
            </div>
        </div>
    );
}
