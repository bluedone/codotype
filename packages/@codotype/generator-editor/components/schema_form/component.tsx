import * as React from "react";
import { Schema } from "@codotype/types";
import { inflateMeta, sanitizeLabel } from "@codotype/util";

// // // //

/**
 * MetaPreviewProps
 */
interface MetaPreviewProps {
  label: string
}

/**
 * MetaPreview
 */
export function MetaPreview(props: MetaPreviewProps) {

  const schemaMeta = inflateMeta(props.label);

  return (
    <tbody>
      <tr>
        <td className="infoCol">
          <i className="fa fa-fw text-secondary fa-question-circle" title='"Label" is the user-facing token for this model - title-casing and spaces.' />
        </td>
        <td>
          Label
        </td>
        <td className='text-success'>{schemaMeta.label || '...'}</td>
      </tr>
      <tr>
        <td></td>
        <td>Label Plural</td>
        <td className='text-success'>{schemaMeta.label_plural || '...'}</td>
      </tr>
      <tr>
        <td className="infoCol">
          <i className="fa fa-fw text-secondary fa-question-circle" title='"Identifier" is the lowecase, underscored token for this model' />
        </td>
        <td>
          Identifier
        </td>
        <td className='text-success'>{schemaMeta.identifier || '...'}</td>
      </tr>
      <tr>
        <td></td>
        <td>Identifier Plural</td>
        <td className='text-success'>{schemaMeta.identifier_plural || '...'}</td>
      </tr>
      <tr>
        <td className="infoCol">
          <i className="fa fa-fw text-secondary fa-question-circle" title='"Camel Case" is the mixed-case whitespace-free token for this model' />
        </td>
        <td>
          Camel Case
        </td>
        <td className='text-success'>{schemaMeta.camel_case || '...'}</td>
      </tr>
      <tr>
        <td></td>
        <td>Camel Case Plural</td>
        <td className='text-success'>{schemaMeta.camel_case_plural || '...'}</td>
      </tr>
      <tr>
        <td className="infoCol">
          <i className="fa fa-fw text-secondary fa-question-circle" title='"Class Name" is title-cased whitespace-free token for this model' />
        </td>
        <td>
          Class Name
        </td>
        <td className='text-success'>{schemaMeta.class_name || '...'}</td>
      </tr>
      <tr>
        <td></td>
        <td>Class Name Plural</td>
        <td className='text-success'>{schemaMeta.class_name_plural || '...'}</td>
      </tr>
    </tbody>
  )
}

// // // //

interface SchemaFormProps {
  schema: Schema;
  onSubmit: (updatedSchema: Schema) => void;
  onCancel: () => void;
}

/**
 * SchemaForm
 * @param props
 */
export function SchemaForm(props: SchemaFormProps) {
  const [label, setLabel] = React.useState<string>(props.schema.label);

  return (
    <div className="row">

      <div className="col-sm-12 col-lg-6 border-right">
        <div className="row">

          <div className="col-sm-12">

            <h4>New Schema</h4>

            <p className="small mt-2 mb-3 text-muted">
              The <strong>Schema</strong> is a building block that describes <i>data</i>.
            </p>

            <p className="small mt-2 mb-3 text-muted">Its <span className='text-success'>Label</span> should be a <strong>singular noun</strong> - whitespace is allowed. The input field will enforce proper capitalization and spacing.</p>

            <small className="mb-2 text-muted">
              <i className="far fa-lightbulb" />
              Try something simple like <code>Movie</code>, or <code>Movie Rating</code>
            </small>

            <input
              className="form-control form-control-lg"
              placeholder="Label"
              value={label}
              onChange={(e) => {
                setLabel(sanitizeLabel(e.currentTarget.value))
              }}
            />

            <p className="small mt-4 text-muted">
              <strong>Codotype</strong> derives additional <span className='text-success'>Tokens</span> to use for things like naming <strong>files</strong>, <strong>folders</strong>, <strong>variables</strong>, and <strong>database tables</strong>. You can rename or remove a schema whenever you like <i className="far fa-laugh" />
            </p>

          </div>
        </div>
      </div>

      <div className="col-sm-12 col-lg-6 d-flex justify-content-center align-items-center flex-column">
        <p className="mb-0 text-muted">Verify these <span className='text-success'>Tokens </span> before proceeding</p>

        <table className="table table-sm mb-0 mt-2">
          <MetaPreview label={label} />
        </table>

      </div>

      <button
        // disabled={!canSubmit(label)}
        onClick={() => {
          props.onSubmit({
            ...props.schema,
            ...inflateMeta(label.trim()),
          });
        }}
      >
        Save
          </button>

      <button onClick={props.onCancel}>Cancel</button>
    </div>
  )
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

