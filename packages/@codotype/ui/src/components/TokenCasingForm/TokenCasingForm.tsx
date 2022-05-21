import * as React from "react";
import { FormGroup } from "../AttributeEditor/FormGroup";
import { buildTokenCasing, sanitizeTitle, TokenCasing } from "@codotype/core";
import { inputClassName } from "../Input/constants";

// // // //

/**
 * MetaPreviewProps
 */
interface MetaPreviewProps {
    label: string;
}

/**
 * MetaPreview
 * TODO - validation errors + tokens should be passed down into this
 */
export function MetaPreview(props: MetaPreviewProps) {
    const tokens: TokenCasing = buildTokenCasing(props.label);

    return (
        <tbody>
            <tr>
                <td>Label</td>
                <td>{tokens.title}</td>
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
        <div className="row">
            <div className="col-sm-12 col-lg-6 flex flex-col border-right justify-center">
                <div className="row">
                    <div className="col-sm-12">
                        <FormGroup
                            label="Tokens"
                            help="The input field will enforce proper capitalization and spacing"
                            required
                        >
                            <input
                                ref={labelInput}
                                className={inputClassName}
                                placeholder="Label"
                                value={label}
                                onChange={e => {
                                    setLabel(
                                        sanitizeTitle(e.currentTarget.value),
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

            {/* <div className="col-sm-12 col-lg-6 flex justify-center items-center flex-col">
                <table className="table table-sm mb-0 mt-2">
                    <MetaPreview label={label} />
                </table>
            </div> */}
        </div>
    );
}
