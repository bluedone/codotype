import * as React from "react";
import { AppNavbar } from "../navbar";
import "../../scss/storybook.scss";

// // // //

interface StoryProps {
    children: React.ReactNode;
}

export function Story(props: StoryProps) {
    return (
        <React.Fragment>
            <AppNavbar />
            <div
                className="container-fluid"
                style={{
                    paddingTop: "4.5rem",
                    paddingBottom: "4rem",
                    height: "100%",
                }}
            >
                <div className="row flex justify-content-center">
                    <div className="col-sm-10">{props.children}</div>
                </div>
                {/* <div className="row flex justify-content-center">
                    <div className="col-lg-12">{props.children}</div>
                </div> */}
            </div>
        </React.Fragment>
    );
}
