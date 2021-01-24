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
                className="px-5 pb-5 pt-5 h-full"
                style={{
                    backgroundColor: "#f5f6f9"
                }}
            >
                <div className="row flex justify-center">
                    <div className="col-sm-10">{props.children}</div>
                </div>
            </div>
        </React.Fragment>
    );
}
