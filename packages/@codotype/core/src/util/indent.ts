// indent
// Indents a body of text inside an EJS template
//
// Usage:
//
//   <%- helpers.indent(include('./postPayload.js'), 6) %>
//
// Taken from a comment in the following EJS issue:
// https://github.com/mde/ejs/issues/176
export function indent(text: string, depth: number): string {
    // Defines an array for the function output
    const output = [];

    // Splits the input text on each newline
    text.split("\n").forEach((line, num) => {
        // To avoid indenting the first line
        if (num > 0) {
            for (var i = 0; i < depth; i++) {
                line = " " + line;
            }
        }
        output.push(line);
    });

    // Returns the output, rejoined with a newline each
    return output.join("\n");
}
