import * as React from "react";
import { buildTokenPluralization, sanitizeLabel } from "@codotype/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { TokenPluralization } from "@codotype/types";

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
export function MetaPreview(props: MetaPreviewProps) {
    const schemaMeta: TokenPluralization = buildTokenPluralization(props.label);

    return (
        <tbody>
            <tr>
                <td className="infoCol">
                    <i
                        className="fa fa-fw text-secondary fa-question-circle"
                        title='"Label" is the user-facing token for this model - title-casing and spaces.'
                    />
                </td>
                <td>Label</td>
                <td className="text-success">
                    {schemaMeta.singular.label || "..."}
                </td>
            </tr>
            <tr>
                <td></td>
                <td>Label Plural</td>
                <td className="text-success">
                    {schemaMeta.plural.label || "..."}
                </td>
            </tr>
            <tr>
                <td className="infoCol">
                    <i
                        className="fa fa-fw text-secondary fa-question-circle"
                        title='"Snake Case" is the lowecase, underscored token for this model'
                    />
                </td>
                <td>Snake Case</td>
                <td className="text-success">
                    {schemaMeta.singular.snake || "..."}
                </td>
            </tr>
            <tr>
                <td></td>
                <td>Snake Case Plural</td>
                <td className="text-success">
                    {schemaMeta.plural.snake || "..."}
                </td>
            </tr>
            <tr>
                <td className="infoCol">
                    <i
                        className="fa fa-fw text-secondary fa-question-circle"
                        title='"Camel Case" is the mixed-case whitespace-free token for this model'
                    />
                </td>
                <td>Camel Case</td>
                <td className="text-success">
                    {schemaMeta.singular.camel || "..."}
                </td>
            </tr>
            <tr>
                <td></td>
                <td>Camel Case Plural</td>
                <td className="text-success">
                    {schemaMeta.plural.camel || "..."}
                </td>
            </tr>
            <tr>
                <td className="infoCol">
                    <i
                        className="fa fa-fw text-secondary fa-question-circle"
                        title='"Pascal Case" is title-cased whitespace-free token for this model'
                    />
                </td>
                <td>Pascal Case</td>
                <td className="text-success">
                    {schemaMeta.singular.pascal || "..."}
                </td>
            </tr>
            <tr>
                <td></td>
                <td>Pascal Case Plural</td>
                <td className="text-success">
                    {schemaMeta.plural.pascal || "..."}
                </td>
            </tr>
            <tr>
                <td className="infoCol">
                    <i
                        className="fa fa-fw text-secondary fa-question-circle"
                        title='"Kebab Case" is dash-erized whitespace-free token for this model'
                    />
                </td>
                <td>Kebab Case</td>
                <td className="text-success">
                    {schemaMeta.singular.pascal || "..."}
                </td>
            </tr>
            <tr>
                <td></td>
                <td>Kebab Case Plural</td>
                <td className="text-success">
                    {schemaMeta.plural.pascal || "..."}
                </td>
            </tr>
        </tbody>
    );
}

// // // //

interface SchemaFormProps {
    label: string;
    onChange: (updatedTokens: any) => void;
}

/**
 * SchemaForm
 * @param props
 */
export function SchemaForm(props: SchemaFormProps) {
    const [label, setLabel] = React.useState<string>(props.label);

    React.useEffect(() => {
        props.onChange({
            ...buildTokenPluralization(label.trim()),
        });
    }, [label]);

    return (
        <div className="row">
            <div className="col-sm-12 col-lg-6 border-right">
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
                            className="form-control form-control-lg"
                            placeholder="Label"
                            value={label}
                            onChange={e => {
                                setLabel(sanitizeLabel(e.currentTarget.value));
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

            <div className="col-sm-12 col-lg-6 d-flex justify-content-center align-items-center flex-column">
                <p className="mb-0 text-muted">
                    Verify these <span className="text-success">Tokens </span>{" "}
                    before proceeding
                </p>

                <table className="table table-sm mb-0 mt-2">
                    <MetaPreview label={label} />
                </table>
            </div>
        </div>
    );
}

// // // //

// mounted () {
//   setTimeout(() => { this.$refs.input_el.focus() }, 500)
// },
// methods: {
//   onKeyEnter() {
// if (this.onKeypressEnter && this.enableSubmit) this.onKeypressEnter()
// }
// </script>

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
