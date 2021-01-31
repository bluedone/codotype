import * as React from "react";
import { AppNavbar } from "../navbar";
import "./tailwind.css";

// // // //

interface StoryProps {
    children: React.ReactNode;
}

export function Story(props: StoryProps) {
    return (
        <React.Fragment>
            <AppNavbar />
            <div
                className="px-32 pb-5 pt-5 h-full"
                style={{
                    backgroundColor: "#f5f6f9",
                }}
            >
                <div className="grid grid-cols-1">
                    <div className="col-span-1">{props.children}</div>
                </div>
            </div>
        </React.Fragment>
    );
}
