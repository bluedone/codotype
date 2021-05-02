import * as React from "react";
import { buildTokenPluralization, sanitizeTitle } from "@codotype/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaugh, faLightbulb } from "@fortawesome/free-regular-svg-icons";

// // // //

interface SchemaFormProps {
    label: string;
    onChange: (updatedTokens: any) => void;
    onKeydownEnter: () => void;
}

/**
 * SchemaForm
 * @param props
 */
export function SchemaForm(props: SchemaFormProps) {
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
            ...buildTokenPluralization(label.trim()),
        });
    }, [label]);

    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <p className="mt-2 mb-3 text-muted">
                            The <strong>Data Model</strong> is a building block
                            that describes <i>data</i>.
                        </p>

                        <p className="mt-2 mb-3 text-muted">
                            Its <span className="text-green-500">Label</span>{" "}
                            should be a <strong>singular noun</strong> -
                            whitespace is allowed. The input field will enforce
                            proper capitalization and spacing.
                        </p>

                        <small className="mb-2 text-muted">
                            <FontAwesomeIcon
                                icon={faLightbulb}
                                className="mr-1"
                            />
                            Try something simple like <code>Movie</code>, or{" "}
                            <code>Movie Rating</code>
                        </small>

                        <input
                            ref={labelInput}
                            className="form-control form-control-lg"
                            placeholder="Label"
                            value={label}
                            onChange={e => {
                                setLabel(sanitizeTitle(e.currentTarget.value));
                            }}
                            onKeyDown={e => {
                                if (e.keyCode === 13) {
                                    // ENTER KEY CODE
                                    props.onKeydownEnter();
                                }
                            }}
                        />

                        <p className="mt-4 text-muted">
                            <strong>Codotype</strong> derives additional{" "}
                            <span className="text-green-500">Tokens</span> to
                            use for things like naming <strong>files</strong>,{" "}
                            <strong>folders</strong>, <strong>variables</strong>
                            , and <strong>database tables</strong>. You can
                            rename or remove a Data Model whenever you like
                            <FontAwesomeIcon icon={faLaugh} />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
