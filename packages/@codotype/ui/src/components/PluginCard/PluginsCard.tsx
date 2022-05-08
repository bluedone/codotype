import * as React from "react";
import { PluginMetadata } from "@codotype/core";

// // // //

export function PluginCard(props: { plugin: PluginMetadata }) {
    const { plugin } = props;
    return (
        <div className="card rounded-lg shadow">
            <div className="card-body">
                <div className="flex items-end flex-col">
                    <div className="flex flex-col justify-center">
                        <p className="lead mb-0">
                            <a
                                href={`/plugins/${plugin.identifier}/build`}
                                className="btn btn-link flex items-center flex-col"
                                style={{ textDecoration: "none" }}
                            >
                                <img
                                    className="mb-2"
                                    src={plugin.content.icon}
                                    style={{ maxWidth: "2rem" }}
                                    draggable={false}
                                />
                                {plugin.content.label}
                            </a>
                        </p>
                    </div>

                    <div className="col-lg-12">
                        <p className="card-text mt-2">
                            <small>{plugin.content.description}</small>
                        </p>
                    </div>
                </div>
            </div>

            <div className="card-footer bg-white border-top-none">
                <a
                    href={`/plugins/${plugin.identifier}`}
                    className="btn w-full btn-lg btn-primary rounded-pill"
                >
                    <span className="flex justify-center items-center">
                        Let's Go!
                    </span>
                </a>
            </div>
        </div>
    );
}
