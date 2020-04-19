export const xssMarkdown = `
# Hello XSS!
<img src="" onerror="alert()">
<a href="javascript:alert()">hey</a>
`;

export const markdownHeaders = `
## Headings

Headings from \`h1\` through \`h6\` are constructed with a \`#\` for each level:

\`\`\`
# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading
  \`\`\`

Renders to:

# h1 Heading

## h2 Heading

### h3 Heading

#### h4 Heading

##### h5 Heading

###### h6 Heading
`;

export const image01 = `

![Minion](http://octodex.github.com/images/minion.png)

  or

![Alt text](http://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")
`;

export const syntaxHighlighting = `

#### TypeScript
\`\`\`ts
const foo: string = "bar";
console.log(foo);
\`\`\`

#### Javascript
\`\`\`js
const foo = "bar";
console.log(foo);
\`\`\`

#### JSON
\`\`\`json
{
  "foo": "bar",
  "isJson": true,
  "count": 12
}
\`\`\`

#### Python
\`\`\`py
foo = "bar"
print(foo)
\`\`\`

`;

// // // //

export const stories: [string, string][] = [
    ["hello world", "# Hello Markdown!"],
    ["headers", markdownHeaders],
    ["xss", xssMarkdown],
    ["images", image01],
    ["syntax highlighting", syntaxHighlighting],
];
