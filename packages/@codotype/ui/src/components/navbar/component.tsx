import * as React from "react";
import { Navbar, Nav } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBook,
    faQuestionCircle,
    faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

// // // //

const StyledNavbar = styled(Navbar)`
    font-family: "Product Sans", Helvetica, Arial, serif;
    padding: 0.4rem;
    box-shadow: 0px 9px 68px 0px rgba(62, 57, 107, 0.1);
`;

// // // //

/**
 * AppNavbar
 * Navbar for the Codotype web app (not WWW)
 */
export function AppNavbar(props: { homeUrl?: string }) {
    const { homeUrl = "/" } = props;
    return (
        <StyledNavbar bg="light" fixed="top" expand="lg">
            <div className="container">
                <div className="d-flex flew-row items-center">
                    <img
                        src="https://res.cloudinary.com/codotype/image/upload/v1560045005/tech-logos/codotype.png"
                        alt="Codotype Logo"
                        width="30"
                        height="30"
                        style={{
                            marginRight: ".5rem",
                            marginTop: ".25rem",
                            height: "1.5rem",
                            width: "1.5rem",
                        }}
                    />
                    <Link href={homeUrl}>
                        <Navbar.Brand>
                            <h3 className="mb-0">codotype</h3>
                        </Navbar.Brand>
                    </Link>
                </div>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link
                            href="https://codotype.io/about"
                            target="_blank"
                        >
                            <FontAwesomeIcon
                                icon={faQuestionCircle}
                                className="mr-1"
                            />
                            About
                        </Nav.Link>

                        <Nav.Link href="https://codotype.org" target="_blank">
                            <FontAwesomeIcon
                                icon={faBook}
                                className="text-info mr-1"
                            />
                            Docs
                        </Nav.Link>

                        <Nav.Link href="https://codotype.org" target="_blank">
                            <FontAwesomeIcon
                                icon={faDollarSign}
                                className="text-success mr-1"
                            />
                            Donate
                        </Nav.Link>

                        <Nav.Link
                            target="_blank"
                            href="https://twitter.com/codotype"
                        >
                            <FontAwesomeIcon
                                icon={faTwitter}
                                className="text-primary mr-1"
                            />
                            Twitter
                        </Nav.Link>

                        <Nav.Link
                            target="_blank"
                            href="https://github.com/codotype"
                        >
                            <FontAwesomeIcon icon={faGithub} className="mr-1" />
                            GitHub
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </StyledNavbar>
    );
}
