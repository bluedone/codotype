import { format } from "prettier";

export function prettify({ source }: { source: string }) {
    return format(source, { semi: false });
}
