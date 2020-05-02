import * as React from "react";
import { GeneratorMeta } from "@codotype/types";
import { ChevronAnimation } from "../chevron_animation";

// // // //

export function GeneratorCard(props: { generator: GeneratorMeta }) {
    const { generator } = props;
    return (
        <div className="card col-lg-12 shadow-hover border-light">
            <div className="card-body">
                <div className="row d-flex align-items-end flex-column">
                    <div className="col-lg-12 d-flex justify-content-center">
                        <p className="lead mb-0">
                            <button
                                className="btn btn-link d-flex align-items-center flex-column"
                                style={{ textDecoration: "none" }}
                            >
                                <img
                                    className="mb-2"
                                    src={generator.icon}
                                    style={{ maxWidth: "2rem" }}
                                />
                                {generator.label}
                            </button>
                            {/* <b-btn variant="link" : to="`/generators/${generator.id}`" className="d-flex align-items-center flex-column" style='text-decoration: none'> */}
                            {/* </b-btn> */}
                        </p>
                    </div>

                    <div className="col-lg-12">
                        <p className="card-text mt-2">
                            <small>{generator.description}</small>
                        </p>
                    </div>
                </div>
            </div>

            <div className="card-footer bg-white">
                <small>
                    <a className="text-muted" href="generator.github_url">
                        <i className="fab fa-github" />
                        codotype
                    </a>
                    <span className="badge badge-light text-muted">
                        {generator.version}
                    </span>
                    <span
                        className="badge badge-warning"
                        // v-if="generator.official"
                    >
                        Official
                    </span>
                    <br />
                    {/* <span className='badge badge-primary mr-1' v-for="tag in generator.type_tags.slice(0,1)" : key="tag">{{ tag }}</span> */}
                    {/* <span className='badge badge-light mr-1' v-for="tag in generator.tech_tags.slice(0,3)" : key="tag">{{ tag }}</span> */}
                    {/* <!-- < span className='badge badge-info' v -if= "generator.self_configuring" > Self - Configuring</span > --> */}
                </small>
            </div>

            <div className="card-footer bg-white border-top-none">
                <a
                    href="externalLink"
                    className="btn btn-block btn-xl btn-primary rounded-pill"
                >
                    <span className="d-flex justify-content-center align-items-center">
                        Let's Go!
                        <ChevronAnimation active />
                    </span>
                </a>
            </div>

            {/* < !-- < div className="card-footer" > -->
      < !-- < div className="row" > -->
        < !-- < b - col > -->
          < !-- < button className="btn btn-outline-primary btn-block" > -->
            < !-- < i className="fa fa-check" /> -->
          < !-- </button > -->
          < !-- < span className='badge badge-primary mr-1' v -for= "tag in generator.type_tags.slice(0,3)" : key = "tag" > {{ tag }
}</span > -->
          < !-- < br > -->
          < !-- < span className='badge badge-light mr-1' v -for= "tag in generator.tech_tags.slice(0,3)" : key = "tag" > {{ tag }}</span > -->
        < !-- </b - col > -->
      < !-- </div > -->
    < !-- </div > --> */}
        </div>
    );
}
