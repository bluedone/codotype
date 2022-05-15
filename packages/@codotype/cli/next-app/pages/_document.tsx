import Document, { Html, Head, Main, NextScript } from "next/document";
import { SocialMeta } from "@codotype/ui/dist/src/components/Meta";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <title>Codotype - Building Better Boilerplate</title>
                    <SocialMeta />
                </Head>
                <body className="bg-gray-100 dark:bg-gray-900">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
