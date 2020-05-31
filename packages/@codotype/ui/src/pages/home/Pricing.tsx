import * as React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { GeneratorCard } from "@src/components/generator_card";
import { GeneratorMeta } from "@codotype/types";

// // // //

const PricingCard = styled.div`
    transition: all 0.3s ease;
    &:hover {
        margin-top: -5px;
        box-shadow: 0 10px 40px rgba($black, 0.05);
    }

    text-align: center;
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 30px;
    small {
        letter-spacing: 2px;
    }
    .card-title {
        font-size: 65px;
        font-family: $heading-font;
        font-weight: 700;
        margin: 10px 0 15px;
    }
    .plan-muted {
        text-decoration: line-through;
        opacity: 0.5;
    }
    ul {
        line-height: 2.5;
        margin: 0 0 20px;
    }
`;

// // // //

/**
 * Pricing
 */
export function Pricing() {
    return (
        <div id="pricing" className="section bg-light py-lg">
            <div className="container">
                <div className="section-title text-center mt-0 mb-5">
                    <h3>Choose your plan</h3>
                    <p>
                        Simple pricing. no hidden charges. Choose a plan fit
                        your needs
                    </p>
                </div>

                <div className="row">
                    <div className="col-lg-4">
                        <PricingCard className="card">
                            <div className="card-body">
                                <small className="text-muted">PERSONAL</small>
                                <h5 className="card-title">$9</h5>
                                <ul className="card-text list-unstyled">
                                    <li>3 Projects</li>
                                    <li className="plan-muted">
                                        Team Collaboration
                                    </li>
                                    <li className="plan-muted">
                                        Analytics &amp; Reports
                                    </li>
                                    <li>One User</li>
                                </ul>
                                <a
                                    href="#"
                                    className="btn btn-xl btn-outline-primary"
                                >
                                    Choose this plan
                                </a>
                            </div>
                        </PricingCard>
                    </div>
                    <div className="col-lg-4">
                        <PricingCard className="card">
                            <div className="card-body">
                                <small className="text-muted">STARTUP</small>
                                <h5 className="card-title">$29</h5>
                                <ul className="card-text list-unstyled">
                                    <li>20 Projects</li>
                                    <li>Team Collaboration</li>
                                    <li>Analytics &amp; Reports</li>
                                    <li>10 Active Users</li>
                                </ul>
                                <a href="#" className="btn btn-xl btn-primary">
                                    Choose this plan
                                </a>
                            </div>
                        </PricingCard>
                    </div>
                    <div className="col-lg-4">
                        <PricingCard className="card">
                            <div className="card-body">
                                <small className="text-muted">ENTERPRISE</small>
                                <h5 className="card-title">$149</h5>
                                <ul className="card-text list-unstyled">
                                    <li>Unlimited Projects</li>
                                    <li>Team Collaboration</li>
                                    <li>Analytics &amp; Reports</li>
                                    <li>Priority Support</li>
                                </ul>
                                <a
                                    href="#"
                                    className="btn btn-xl btn-outline-primary"
                                >
                                    Choose this plan
                                </a>
                            </div>
                        </PricingCard>
                    </div>
                </div>
            </div>
        </div>
    );
}

///////////
///////////
///////////
///////////
