import { AttributeEditor } from "../index";
import TestRenderer, { ReactTestRendererJSON } from 'react-test-renderer'

// // // //

describe("SchemaForm", () => {
  test("render", () => {
    const renderedComponent: ReactTestRendererJSON | null = TestRenderer.create(
      <AttributeEditor
        attributes={[]}
        supportedDatatypes={[]}
        onChange={jest.fn()}
      />
    ).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  })
})