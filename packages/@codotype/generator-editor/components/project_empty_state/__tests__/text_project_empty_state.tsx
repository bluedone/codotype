import { ProjectEmptyState } from "../index";
import TestRenderer, { ReactTestRendererJSON } from 'react-test-renderer'

// // // //

describe("ProjectEmptyState", () => {
  test("render", () => {
    const renderedComponent: ReactTestRendererJSON | null = TestRenderer.create(
      <ProjectEmptyState />
    ).toJSON();

    expect(renderedComponent).toMatchSnapshot();
  })
})