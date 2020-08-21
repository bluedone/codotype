import { prettify } from "../prettify";

test("testing prettify", () => {
  expect(prettify({ source: "foo ( );" })).toBe("foo()\n");
})