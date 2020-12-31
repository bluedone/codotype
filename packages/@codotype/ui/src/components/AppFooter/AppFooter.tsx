import * as React from "react";
import styled from "styled-components";
import Link from "next/link";

// // // //

const FooterLinkLi = styled.li`
    padding: 0.2em 0;
`;

const FooterLinkA = styled.a`
    padding: 0.2em 0;
    color: #868e96;
    &:hover {
        text-decoration: none;
        color: #4e92fc;
    }
`;

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
        <FooterLinkLi>
            <Link href={href}>
                <FooterLinkA {...linkProps}>{label}</FooterLinkA>
            </Link>
        </FooterLinkLi>
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
                        <span className="d-flex flex-row align-items-center">
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
