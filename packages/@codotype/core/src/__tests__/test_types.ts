import { DEFAULT_ATTRIBUTE, DEFAULT_RELATION, DEFAULT_SCHEMA } from "../index";

test("testing @codotype/core", () => {
    expect(DEFAULT_ATTRIBUTE).toMatchSnapshot();
    expect(DEFAULT_RELATION).toMatchSnapshot();
    expect(DEFAULT_SCHEMA).toMatchSnapshot();
});
