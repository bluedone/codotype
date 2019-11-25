import { AttributeEditor } from "../components/attribute_editor";
import { SchemaForm } from "../components/schema_form";
import { Datatype } from "@codotype/types";
import { DEFAULT_SCHEMA } from "@codotype/types";

// // // //

export default () => {
  return (
    <div className="row mt-4">
      <div className="col-lg-12">
        <SchemaForm
          schema={{ ...DEFAULT_SCHEMA }}
        />
        <AttributeEditor
          attributes={[]}
          supportedDatatypes={[Datatype.STRING, Datatype.NUMERIC]}
          onChange={(updatedAttributes: any[]) => {
            console.log(updatedAttributes);
          }}
        />
      </div>
    </div>
  );
}