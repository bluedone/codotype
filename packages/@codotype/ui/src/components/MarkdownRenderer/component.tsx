import * as React from "react";
const ReactMarkdown = require("react-markdown");
import SyntaxHighlighter from "react-syntax-highlighter";

// // // //

export function CodeBlock(props: { value: string; language: string }) {
    const { language = undefined, value } = props;
    return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>;
}

// // // //

export function ImageBlock(props: { alt: string; src: string }) {
    return (
        <img
            src={props.src}
            alt={props.alt}
            style={{
                width: "100%",
            }}
        />
    );
}

// // // //

/**
 * MarkdownRenderer
 * Renders markdown
 */
export function MarkdownRenderer(props: { source: string }) {
    return (
        <div className="markdown-body">
            <ReactMarkdown
                skipHtml
                source={props.source}
                renderers={{
                    code: CodeBlock,
                    image: ImageBlock,
                    link: (prps: any) => {
                        return (
                            <a href={prps.href} target="_blank">
                                {prps.children}
                            </a>
                        );
                    },
                }}
            />
        </div>
    );
}
