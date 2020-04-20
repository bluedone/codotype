import React, { FunctionComponent } from "react";
import { AppNavbar } from "../navbar";
import "@src/scss/app.scss";

// // // //

interface StoryProps {
    children: React.ReactNode;
}

export const Story: FunctionComponent<StoryProps> = (props: StoryProps) => {
    return (
        <React.Fragment>
            <AppNavbar />
            <div
                className="container"
                style={{
                    paddingTop: "4.5rem",
                    paddingBottom: "4rem",
                    height: "100%",
                }}
            >
                {props.children}
                {/* <div className="row d-flex justify-content-center">
                    <div className="col-lg-12">{props.children}</div>
                </div> */}
            </div>
        </React.Fragment>
    );
};
