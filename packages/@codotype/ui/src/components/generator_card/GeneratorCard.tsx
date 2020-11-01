import * as React from "react";
import { PluginMetadata } from "@codotype/core";
import { ChevronAnimation } from "../chevron_animation";

// // // //

export function GeneratorCard(props: { generator: PluginMetadata }) {
    const { generator } = props;
    return (
        <div className="card col-lg-12 shadow border-light">
            <div className="card-body">
                <div className="row d-flex align-items-end flex-column">
                    <div className="col-lg-12 d-flex justify-content-center">
                        <p className="lead mb-0">
                            <a
                                href={`/generators/${generator.id}/build`}
                                className="btn btn-link d-flex align-items-center flex-column"
                                style={{ textDecoration: "none" }}
                            >
                                <img
                                    className="mb-2"
                                    src={generator.icon}
                                    style={{ maxWidth: "2rem" }}
                                />
                                {generator.label}
                            </a>
                        </p>
                    </div>

                    <div className="col-lg-12">
                        <p className="card-text mt-2">
                            <small>{generator.description}</small>
                        </p>
                    </div>
                </div>
            </div>

            <div className="card-footer bg-white border-top-none">
                <a
                    href={`/generators/${generator.id}`}
                    className="btn btn-block btn-xl btn-primary rounded-pill"
                >
                    <span className="d-flex justify-content-center align-items-center">
                        Let's Go!
                        <ChevronAnimation active />
                    </span>
                </a>
            </div>
        </div>
    );
}
