import { AttributeEditor } from "../components/attribute_editor";
import { Datatype } from "../components/attribute_editor/datatype";

// // // //

export default () => {
  return (
    <div className="row mt-4">
      <div className="col-lg-12">
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