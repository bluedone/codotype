import { AttributeEditor } from "../index";

// // // //

export default () => {
  return (
    <div className="row mt-4">
      <div className="col-lg-12">
        <AttributeEditor
          attributes={[]}
          supportedDatatypes={[]}
          onChange={(updatedAttributes: any[]) => {
            console.log(updatedAttributes);
          }}
        />
      </div>
    </div>
  )
}