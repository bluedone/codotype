import * as React from "react";
import { FormGroup } from "../attribute_editor/FormGroup";
import { buildTokenCasing, sanitizeLabel } from "@codotype/util";
import { TokenCasing } from "@codotype/types";

// // // //

/**
 * MetaPreviewProps
 */
interface MetaPreviewProps {
    label: string;
}

/**
 * MetaPreview
 */
// TODO - validation errors + tokens should be passed down into this
// TODO - validation errors + tokens should be passed down into this
export function MetaPreview(props: MetaPreviewProps) {
    const tokens: TokenCasing = buildTokenCasing(props.label);

    return (
        <tbody>
            <tr>
                <td>Label</td>
                <td>{tokens.label}</td>
            </tr>
            <tr>
                <td>Snake Case</td>
                <td>{tokens.snake}</td>
            </tr>
            <tr>
                <td>Camel Case</td>
                <td>{tokens.camel}</td>
            </tr>
            <tr>
                <td>Pascal Case</td>
                <td>{tokens.pascal}</td>
            </tr>
            <tr>
                <td>Kebab Case</td>
                <td>{tokens.kebab}</td>
            </tr>
        </tbody>
    );
}

// // // //

interface TokenCasingFormProps {
    label: string;
    onChange: (updatedTokenCasing: TokenCasing) => void;
    onKeydownEnter: () => void;
}

/**
 * TokenCasingForm
 * @param props
 */
export function TokenCasingForm(props: TokenCasingFormProps) {
    const [label, setLabel] = React.useState<string>(props.label);
    const labelInput = React.useRef(null);

    React.useEffect(() => {
        if (labelInput === null) {
            return;
        }
        // current property is refered to input element
        // @ts-ignore
        labelInput.current.focus();
    }, []);

    React.useEffect(() => {
        props.onChange({
            ...buildTokenCasing(label.trim()),
        });
    }, [label]);

    return (
        <div className="card card-body shadow-sm">
            <div className="row">
                <div className="col-sm-12 col-lg-6 d-flex flex-column border-right justify-content-center">
                    <div className="row">
                        <div className="col-sm-12">
                            <FormGroup
                                label="Tokens"
                                help="Tokens used to identify this Attribute in the code you generate. The input field will enforce proper capitalization and spacing."
                                required
                            >
                                <input
                                    ref={labelInput}
                                    className="form-control form-control-lg"
                                    placeholder="Label"
                                    value={label}
                                    onChange={e => {
                                        setLabel(
                                            sanitizeLabel(
                                                e.currentTarget.value,
                                            ),
                                        );
                                    }}
                                    onKeyDown={e => {
                                        if (e.keyCode === 13) {
                                            // ENTER KEY CODE
                                            props.onKeydownEnter();
                                        }
                                    }}
                                />
                            </FormGroup>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-lg-6 d-flex justify-content-center align-items-center flex-column">
                    <table className="table table-sm mb-0 mt-2">
                        <MetaPreview label={label} />
                    </table>
                </div>
            </div>
        </div>
    );
}

// // // //

// <style type="text/css" scoped>
// .table-sm {
//   font - size: 80%;
// }

// p.small {
//   font - size: 85%;
// }

// .text-purple {
//   color: purple !important;
// }

// td.infoCol {
//   width: 1rem;
// }
// </style>
