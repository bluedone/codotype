import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOsi } from "@fortawesome/free-brands-svg-icons";

// // // //

export interface InfoBullet {
    title: string;
    body: string;
}

/**
 * InfoBullets
 */
export function InfoBullets(props: { infoSections: InfoBullet[] }) {
    const { infoSections } = props;

    return (
        <div className="section bg-white py-5">
            <div className="container">
                <div className="row">
                    {infoSections.map((each: any) => (
                        <div key={each.title} className="col-md-6 col-lg-4">
                            <div className="media">
                                <div className="media-body text-center">
                                    <div className="color-icon mb-3">
                                        <FontAwesomeIcon
                                            className="text-primary"
                                            size="2x"
                                            icon={faOsi}
                                        />
                                    </div>
                                    <h5 className="mt-0">{each.title}</h5>
                                    {each.body}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
