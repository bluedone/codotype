import { DEFAULT_ATTRIBUTE, DEFAULT_RELATION } from "../index";

test("testing @codotype/core", () => {
    expect(DEFAULT_ATTRIBUTE).toMatchSnapshot();
    expect(DEFAULT_RELATION).toMatchSnapshot();
});
