import * as React from "react";
import { GeneratorListItem } from "../../components/generator_card";
import { GeneratorMeta } from "@codotype/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

// // // //

/**
 * GeneratorListPage
 */
export function GeneratorListPage(props: { generators: GeneratorMeta[] }) {
    const [filter, setFilter] = React.useState<string>("");

    // Filters available generators based on `filter` state
    const filteredGenerators: GeneratorMeta[] = props.generators.filter(g => {
        if (filter === "") return true;

        // Assembles query string for local filtering
        const queryString = [
            g.techTags.join(" "),
            g.typeTags.join(" "),
            g.label,
            g.description,
        ]
            .join(" ")
            .toLowerCase();

        // Filters based on queryString and filter
        return queryString.includes(filter.toLowerCase());
    });

    return (
        <div className="row mt-3 mb-5">
            <div className="col-lg-12 d-flex justify-content-between align-items-center">
                <h2>Codotype Plugins</h2>
            </div>
            <div className="col-lg-12">
                <p className="mb-0 text-muted">
                    Instantly generate your next codebase using any of the
                    following plugins
                </p>
            </div>

            <div className="col-lg-12">
                <hr />
            </div>

            <div className="col-lg-12">
                <div className="row mb-2">
                    <div className="col-lg-9">
                        <input
                            type="text"
                            className="form-control form-control-lg mb-2"
                            placeholder="Filter Generators"
                            value={filter}
                            onChange={e => setFilter(e.currentTarget.value)}
                        />
                    </div>

                    <div className="col-lg-3 pl-0">
                        <button
                            className="btn btn-lg btn-block btn-outline-warning"
                            onClick={() => {
                                setFilter("");
                            }}
                        >
                            <FontAwesomeIcon icon={faTimes} className="mr-2" />
                            Clear Filter
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        {filteredGenerators.map(g => (
                            <GeneratorListItem key={g.id} generator={g} />
                        ))}
                    </div>

                    <div className="col-lg-12">
                        <div className="card py-4 my-3 border-dark bg-transparent">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item text-center bg-transparent border-dark text-dark">
                                    <FontAwesomeIcon
                                        size="2x"
                                        icon={faInfoCircle}
                                    />
                                    <p className="lead mb-0 mt-2">
                                        Looking for something we don't support?
                                        <br />
                                        Vote for&nbsp;
                                        <a
                                            href="https://github.com/codotype/feature-requests/issues"
                                            target="_blank"
                                        >
                                            upcoming features
                                        </a>
                                        &nbsp;or open a&nbsp;
                                        <a
                                            href="https://github.com/codotype/feature-requests/issues/new"
                                            target="_blank"
                                        >
                                            new request
                                        </a>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Animating items on remove
// <style type="text/css">
//   .generator-list-item {
//     transition: all 1s;
//     display: inline-block;
//     margin-right: 10px;
//   }

//   .generator-list-enter, .generator-list-leave-to {
//     opacity: 0;
//     transform: translateY(30px);
//   }
//   .generator-list-leave-active {
//     position: absolute;
//   }
// </style>
