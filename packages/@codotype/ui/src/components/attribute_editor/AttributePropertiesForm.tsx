import * as React from "react";
import { TokenCasingForm } from "../TokenCasingForm";
import { TokenCasing } from "@codotype/types";

// // // //

/**
 * AttributePropertiesFormProps
 * TODO - annotate remaining props
 */
interface AttributePropertiesFormProps {
    tokenCasing: TokenCasing;
    onChange: (updatedTokenCasing: TokenCasing) => void;
    onKeydownEnter: () => void;
}

/**
 * AttributePropertiesForm
 * @param props - see `AttributePropertiesFormProps`
 */
export function AttributePropertiesForm(props: AttributePropertiesFormProps) {
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
                    label={props.tokenCasing.label}
                    onKeydownEnter={props.onKeydownEnter}
                    onChange={updatedTokenCasing => {
                        props.onChange(updatedTokenCasing);
                    }}
                />
            </div>
        </div>
    );
}
