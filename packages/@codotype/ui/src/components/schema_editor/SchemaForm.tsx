import * as React from "react";
import {
    buildTokenPluralization,
    validateTokenPluralization,
    sanitizeLabel,
    TokenPluralization,
} from "@codotype/core";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";

// // // //

function TokenCell(props: {
    token: string;
    value: string;
    valuePlural: string;
    validationFailures: any;
}) {
    const { validationFailures, token, value, valuePlural } = props;
    const [showPlural, setShowPlural] = React.useState<boolean>(false);
    const hasError: boolean = validationFailures[token];
    const isEmpty: boolean = value === "";

    // Gets display value
    let displayValue = "...";
    if (showPlural && valuePlural) {
        displayValue = valuePlural;
    } else if (!showPlural && value) {
        displayValue = value;
    }
    return (
        <td
            className={classnames("d-flex justify-content-end", {
                "text-danger": hasError,
                "text-success": !hasError,
            })}
            onMouseEnter={() => {
                setShowPlural(true);
            }}
            onMouseOut={() => {
                setShowPlural(false);
            }}
        >
            {displayValue || "..."}
            {hasError && !isEmpty && (
                <small className="ml-1 text-danger">
                    <FontAwesomeIcon icon={faAsterisk} />
                </small>
            )}
        </td>
    );
}

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
    const tokens: TokenPluralization = buildTokenPluralization(props.label);
    const validationFailures = validateTokenPluralization(tokens);

    return (
        <tbody>
            <tr>
                {/* <td className="infoCol">
                    <i
                        className="fa fa-fw text-secondary fa-question-circle"
                        title='"Label" is the user-facing token for this model - title-casing and spaces.'
                    />
                </td> */}
                <td>Label</td>
                <TokenCell
                    token="label"
                    value={tokens.singular.label}
                    valuePlural={tokens.plural.label}
                    validationFailures={validationFailures}
                />
            </tr>
            <tr>
                {/* <td className="infoCol">
                    <i
                        className="fa fa-fw text-secondary fa-question-circle"
                        title='"Snake Case" is the lowecase, underscored token for this model'
                    />
                </td> */}
                <td>Snake Case</td>
                <TokenCell
                    token="snake"
                    value={tokens.singular.snake}
                    valuePlural={tokens.plural.snake}
                    validationFailures={validationFailures}
                />
            </tr>
            <tr>
                {/* <td className="infoCol">
                    <i
                        className="fa fa-fw text-secondary fa-question-circle"
                        title='"Camel Case" is the mixed-case whitespace-free token for this model'
                    />
                </td> */}
                <td>Camel Case</td>
                <TokenCell
                    token="camel"
                    value={tokens.singular.camel}
                    valuePlural={tokens.plural.camel}
                    validationFailures={validationFailures}
                />
            </tr>
            <tr>
                {/* <td className="infoCol">
                    <i
                        className="fa fa-fw text-secondary fa-question-circle"
                        title='"Pascal Case" is title-cased whitespace-free token for this model'
                    />
                </td> */}
                <td>Pascal Case</td>
                <TokenCell
                    token="pascal"
                    value={tokens.singular.pascal}
                    valuePlural={tokens.plural.pascal}
                    validationFailures={validationFailures}
                />
            </tr>
            <tr>
                {/* <td className="infoCol">
                    <i
                        className="fa fa-fw text-secondary fa-question-circle"
                        title='"Kebab Case" is dash-erized whitespace-free token for this model'
                    />
                </td> */}
                <td>Kebab Case</td>
                <TokenCell
                    token="kebab"
                    value={tokens.singular.kebab}
                    valuePlural={tokens.plural.kebab}
                    validationFailures={validationFailures}
                />
            </tr>
        </tbody>
    );
}

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
                        <p className="small mt-2 mb-3 text-muted">
                            The <strong>Schema</strong> is a building block that
                            describes <i>data</i>.
                        </p>

                        <p className="small mt-2 mb-3 text-muted">
                            Its <span className="text-success">Label</span>{" "}
                            should be a <strong>singular noun</strong> -
                            whitespace is allowed. The input field will enforce
                            proper capitalization and spacing.
                        </p>

                        <small className="mb-2 text-muted">
                            <i className="far fa-lightbulb" />
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
                                setLabel(sanitizeLabel(e.currentTarget.value));
                            }}
                            onKeyDown={e => {
                                if (e.keyCode === 13) {
                                    // ENTER KEY CODE
                                    props.onKeydownEnter();
                                }
                            }}
                        />

                        <p className="small mt-4 text-muted">
                            <strong>Codotype</strong> derives additional{" "}
                            <span className="text-success">Tokens</span> to use
                            for things like naming <strong>files</strong>,{" "}
                            <strong>folders</strong>, <strong>variables</strong>
                            , and <strong>database tables</strong>. You can
                            rename or remove a schema whenever you like{" "}
                            <i className="far fa-laugh" />
                        </p>
                    </div>
                </div>
            </div>

            {/* <div className="col-sm-12 col-lg-6 d-flex justify-content-center align-items-center flex-column"> */}
            {/* <p className="mb-0 text-muted"> */}
            {/* Verify these <span className="text-success">Tokens </span>{" "} */}
            {/* before proceeding */}
            {/* </p> */}

            {/* <div className="btn-group w-100 mt-2"> */}
            {/* <button className="btn btn-sm btn-outline-dark w-50"> */}
            {/* Singular */}
            {/* </button> */}
            {/* <button className="btn btn-sm btn-outline-dark w-50"> */}
            {/* Plural */}
            {/* </button> */}
            {/* </div> */}
            {/* <table className="table table-sm mb-0 mt-2"> */}
            {/* <MetaPreview label={label} /> */}
            {/* </table> */}
            {/* </div> */}
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
