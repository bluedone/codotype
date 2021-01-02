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
                <a {...linkProps} className="py-1 px-0 hover:no-underline text-gray-500 hover:text-gray-600 cursor-pointer">{label}</a>
            </Link>
        </li>
    );
}

/**
 * AppFooter
 */
export function AppFooter() {
    return (
        <div
            className="section bg-grey mt-4 py-4"
            style={{ position: "relative" }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <span className="flex flex-row items-center">
                            <img
                                src="https://res.cloudinary.com/codotype/image/upload/v1560045005/tech-logos/codotype.png"
                                style={{
                                    width: "2rem",
                                }}
                                className="logo-dark"
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
                        </span>
                    </div>
                    <div className="col-sm-2">
                        <ul className="list-unstyled ml-1">
                            <FooterLink href="/plugins" label="Plugins" />
                            <FooterLink
                                openInNewTab
                                href="https://codotype.org"
                                label="Documentation"
                            />
                        </ul>
                    </div>
                    <div className="col-sm-2">
                        <ul className="list-unstyled ml-1">
                            <FooterLink href="/about" label="About" />
                            <FooterLink href="/faq" label="FAQ" />
                        </ul>
                    </div>
                    <div className="col-sm-2">
                        <ul className="list-unstyled ml-1">
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
                    <div className="col-sm-2">
                        <a
                            href="#home"
                            className="btn btn-sm btn-outline-primary ml-1"
                        >
                            Go to Top
                        </a>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <small className="text-muted">
                        Copyright © {new Date().getFullYear()} Codotype Inc. All
                        rights reserved.
                    </small>
                </div>
            </div>
        </div>
    );
}
