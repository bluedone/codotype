import { AttributeEditor } from "../components/attribute_editor";
import { SchemaEditor } from "../components/schema_editor";
import { Datatype } from "@codotype/types";
import { Schema } from "@codotype/types";
import { ProjectEmptyState } from "../components/project_empty_state";

// // // //

export default () => {
  const schemas: Schema[] = [];
  return (
    <div className="row mt-4">
      <div className="col-lg-3">
        <SchemaEditor
          schemas={schemas}
          onChange={(updatedAttributes: any[]) => {
            console.log(updatedAttributes);
          }}
        />
      </div>
      <div className="col-lg-9">
        {!schemas.length && (
          <ProjectEmptyState />
        )}
        {schemas.length && (
          <AttributeEditor
            attributes={[]}
            supportedDatatypes={[Datatype.STRING, Datatype.NUMERIC]}
            onChange={(updatedAttributes: any[]) => {
              console.log(updatedAttributes);
            }}
          />
        )}
      </div>
    </div>
  );
}