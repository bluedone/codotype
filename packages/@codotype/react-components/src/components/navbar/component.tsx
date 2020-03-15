import React, { FunctionComponent } from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";

// // // //

export const AppNavbar: FunctionComponent<{}> = () => {
    return (
        <Navbar
            bg="light"
            fixed="top"
            expand="lg"
            className="bg-white"
            style={{
                // font- family: $heading-font
                padding: "0.4rem",
                background: "#ffffff!important",
                boxShadow: "0px 9px 68px 0px rgba(62, 57, 107, 0.1)",
            }}
        >
            <div className="container">
                {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                <Navbar.Brand href="#home">
                    <img
                        src="https://res.cloudinary.com/codotype/image/upload/v1560045005/tech-logos/codotype.png"
                        alt="Codotype Logo"
                        width="30"
                        height="30"
                        // className="d-inline-block align-top"
                        style={{
                            marginRight: ".5rem",
                            marginTop: ".25rem",
                            height: "1.5rem",
                            width: "1.5rem",
                            // float: "left",
                        }}
                    />{" "}
                    codotype
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                Action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">
                                Something
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};
