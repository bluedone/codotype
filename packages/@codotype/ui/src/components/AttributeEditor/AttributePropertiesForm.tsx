import * as React from "react";
import { FormGroup } from "./FormGroup";
import { TokenCasingForm } from "../TokenCasingForm";
import { AttributeInput, TokenCasing } from "@codotype/core";

// // // //

/**
 * AttributePropertiesFormProps
 * CHORE - annotate remaining props
 */
interface AttributePropertiesFormProps {
    attributeInput: AttributeInput;
    onChange: (updatedAttributeInput: AttributeInput) => void;
    onKeydownEnter: () => void;
}

/**
 * AttributePropertiesForm
 * @param props - see `AttributePropertiesFormProps`
 */
export function AttributePropertiesForm(props: AttributePropertiesFormProps) {
    const { attributeInput } = props;
    return (
        <div className="row mt-3">
            <div className="col-lg-12">
                <p className="lead mb-0">Tokens</p>
                <small className="text-muted">
                    Define the <span className="text-success">Tokens</span> used
                    to identify this <strong>Attribute</strong> throughout your
                    codebase.
                </small>
                <hr />
            </div>

            <div className="col-sm-12">
                <TokenCasingForm
                    label={attributeInput.identifiers.title}
                    onKeydownEnter={props.onKeydownEnter}
                    onChange={updatedTokenCasing => {
                        props.onChange({
                            ...attributeInput,
                            identifiers: updatedTokenCasing
                        });
                    }}
                />
            </div>

            <div className="col-sm-12">
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
                        value={attributeInput.internalNote}
                        onChange={e => {
                            props.onChange({
                                ...attributeInput,
                                internalNote: e.currentTarget.value
                            });
                        }}
                    />
                </FormGroup>
            </div>
        </div>
    );
}
