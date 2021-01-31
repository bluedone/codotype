import { format } from "prettier";
import { PrettifyParser } from "@codotype/core";

export function prettify(params: {
    source: string;
    parser: PrettifyParser;
    semi?: boolean;
}) {
    const { source, parser, semi = false } = params;

    return format(source, { semi, parser });
}
