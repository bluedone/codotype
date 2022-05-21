import * as React from "react";
import { FormGroup } from "./FormGroup";
import { TokenCasingForm } from "../TokenCasingForm";
import { AttributeInput } from "@codotype/core";
import { inputClassName } from "../Input/constants";

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
        <div className="grid grid-cols-2">
            <div className="col-span-2">
                <p className="lead mb-0">Tokens</p>
                <small className="text-muted">
                    Define the <span className="text-green-500">Tokens</span>{" "}
                    used to identify this <strong>Attribute</strong> throughout
                    your codebase.
                </small>
                <hr />
            </div>

            <div className="col-span-2">
                <TokenCasingForm
                    label={attributeInput.identifiers.title}
                    onKeydownEnter={props.onKeydownEnter}
                    onChange={updatedTokenCasing => {
                        props.onChange({
                            ...attributeInput,
                            identifiers: updatedTokenCasing,
                        });
                    }}
                />
            </div>

            <div className="col-span-2">
                <hr />
            </div>

            <div className="col-span-2">
                <FormGroup
                    label="Internal Note"
                    help="Leave an optional note to document this Attribute"
                >
                    <input
                        type="text"
                        placeholder="Internal Note"
                        className={inputClassName}
                        value={attributeInput.internalNote}
                        onKeyDown={e => {
                            if (e.keyCode === 13) {
                                props.onKeydownEnter();
                            }
                        }}
                        onChange={e => {
                            props.onChange({
                                ...attributeInput,
                                internalNote: e.currentTarget.value,
                            });
                        }}
                    />
                </FormGroup>
            </div>
        </div>
    );
}
