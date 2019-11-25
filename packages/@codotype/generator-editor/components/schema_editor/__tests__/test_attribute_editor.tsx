import { SchemaEditor } from "../index";
import TestRenderer, { ReactTestRendererJSON } from 'react-test-renderer'

// // // //

describe("SchemaForm", () => {
  test("render", () => {
    const renderedComponent: ReactTestRendererJSON | null = TestRenderer.create(
      <SchemaEditor
        schemas={[]}
        supportedDatatypes={[]}
        onChange={jest.fn()}
      />
    ).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  })
})