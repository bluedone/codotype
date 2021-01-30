import * as React from "react";
import Link from "next/link";

// // // //

/**
 * FooterLink
 */
function FooterLink(props: {
    label: string;
    href: string;
    openInNewTab?: boolean;
}) {
    const { label, href, openInNewTab = false } = props;
    const linkProps: any = {
        label,
    };
    if (openInNewTab) {
        linkProps.target = "_blank";
    }
    return (
        <li className="py-1">
            <Link href={href}>
                <a
                    {...linkProps}
                    className="py-1 px-0 hover:no-underline text-gray-500 hover:text-gray-600 cursor-pointer"
                >
                    {label}
                </a>
            </Link>
        </li>
    );
}

/**
 * AppFooter
 */
export function AppFooter() {
    return (
        <div className="bg-gray-200 mt-4 py-10 px-10 posiion-relative">
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <div className="flex flex-row items-center">
                        <img
                            src="https://res.cloudinary.com/codotype/image/upload/v1560045005/tech-logos/codotype.png"
                            className="w-10"
                            alt="Codotype Logo"
                        />
                        <p className="ml-3 mb-0">
                            <span>
                                Codotype is a plugin-based framework for
                                generating custom boilerplate code and
                                scaffolding.
                            </span>
                            <br />
                        </p>
                    </div>
                </div>
                <ul className="flex flex-col ml-4">
                    <FooterLink href="/plugins" label="Plugins" />
                    <FooterLink
                        openInNewTab
                        href="https://codotype.org"
                        label="Documentation"
                    />
                </ul>
                <ul className="flex flex-col ml-4">
                    <FooterLink href="/about" label="About" />
                    <FooterLink href="/faq" label="FAQ" />
                </ul>
                <ul className="flex flex-col ml-4">
                    <FooterLink
                        openInNewTab
                        href="https://github.com/codotype/codotype"
                        label="GitHub"
                    />
                    <FooterLink
                        openInNewTab
                        href="https://twitter.com/codotype"
                        label="Twitter"
                    />
                </ul>
            </div>
            <div className="text-center mt-4">
                <small className="text-muted">
                    Copyright © {new Date().getFullYear()} Codotype Inc. All
                    rights reserved.
                </small>
            </div>
        </div>
    );
}
