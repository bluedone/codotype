import * as React from "react";
// import ReactMarkdown from "react-markdown";
// import SyntaxHighlighter from "react-syntax-highlighter";

// // // //

// export function CodeBlock(props: { value: string; language: string }) {
//     const { language = undefined, value } = props;
//     return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>;
// }

// // // //

// export function ImageBlock(props: { alt: string; src: string }) {
//     return (
//         <img
//             src={props.src}
//             alt={props.alt}
//             style={{
//                 maxWidth: "50%",
//             }}
//         />
//     );
// }

// // // //

/**
 * MarkdownRenderer
 * Renders markdown
 */
export function MarkdownRenderer(props: { source: string }) {
    return (
        <div>
            <pre className="bg-dark text-light px-3 py-3 rounded">
                {props.source}
            </pre>
            {/* <ReactMarkdown
                skipHtml
                source={props.source}
                renderers={{
                    code: CodeBlock,
                    image: ImageBlock,
                }}
            /> */}
        </div>
    );
}
