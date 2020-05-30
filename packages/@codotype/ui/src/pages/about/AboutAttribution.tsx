import * as React from "react";

// // // //

/**
 * AboutAttribution
 */
export function AboutAttribution() {
    return (
        <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
                {/* <gh-btns-star
                    slug="codotype/codotype"
                    show-count
                ></gh-btns-star> */}
                STAR COUNT HERE
            </div>

            <div className="col-lg-12 d-flex justify-content-center">
                <p className="lead mb-0 mt-4">
                    <span>Built with </span>
                    {/* <font-awesome-icon
                        v-if="svg"
                        icon="heart"
                        className="text-danger"
                    /> */}
                    {/* <i v-else className="fa fa-heart text-danger" /> */}
                    <span className="px-1">by</span>
                    <a href="https://github.com/aeksco" target="_blank">
                        @aeksco
                    </a>
                </p>
            </div>

            <div className="col-lg-12 d-flex justify-content-center">
                FOLLOW BUTTON HERE
                {/* <gh-btns-follow
                    className="mt-3"
                    user="aeksco"
                    show-count
                ></gh-btns-follow> */}
            </div>
        </div>
    );
}
