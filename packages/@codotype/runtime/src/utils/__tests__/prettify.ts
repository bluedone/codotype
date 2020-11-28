import { prettify } from "../prettify";
import { PrettifyParsers } from "@codotype/core";

test("testing prettify", () => {
    expect(
        prettify({ source: "foo ( );", parser: PrettifyParsers.babel }),
    ).toBe("foo()\n");
});
