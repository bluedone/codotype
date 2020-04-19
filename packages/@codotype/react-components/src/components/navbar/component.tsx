import * as React from "react";
// import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";

// // // //

// TODO - migrate this to JS alternative
// @import "@src/scss/app.scss";

// .app-navbar {
//     font-family: $heading-font;
//     padding: 0.4rem;
//     box-shadow: 0px 9px 68px 0px rgba(62, 57, 107, 0.1);
// }

// // // //

export function AppNavbar() {
    return (
        <Navbar bg="light" fixed="top" expand="lg" className="app-navbar">
            <div className="container">
                <div className="d-flex flew-row align-items-center">
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
                    />
                    {/* <Navbar.Brand href="#home"> */}
                    <h3 className="mb-0">codotype</h3>
                    {/* </Navbar.Brand> */}
                </div>

                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                {/* <Navbar.Collapse id="basic-navbar-nav">
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
                </Navbar.Collapse> */}
            </div>
        </Navbar>
    );
}
