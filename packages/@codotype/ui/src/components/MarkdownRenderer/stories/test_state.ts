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

export const pluginReadme = `

# AWS CDK Starter

**Generate full-stack applications with the AWS Cloud Development Kit**


### CDK Code

The CDK deployment is configured using TypeScript:
\`\`\`ts

import cdk = require("@aws-cdk/core");

// // // //

export class AppSyncCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    // What does this do??
    super(scope, id, props);
  }
}

// Defines CDK Stack
const app = new cdk.App();
new AppSyncCdkStack(app, "AppSyncGraphQLDynamoDBExample");
app.synth();

\`\`\`

The stack can be customized to meet your requirements


`;
