import * as React from "react";

// // // //

/**
 * AboutJumbotron
 */
export function AboutJumbotron() {
    return (
        <div className="row mt-4">
            <div className="col-lg-12 text-center">
                <img
                    className="mb-2"
                    width="100px"
                    height="100px"
                    src="https://res.cloudinary.com/codotype/image/upload/v1560045005/tech-logos/codotype.png"
                    draggable={false}
                />
                <h1 className="text-xl">Codotype</h1>
            </div>
        </div>
    );
}
