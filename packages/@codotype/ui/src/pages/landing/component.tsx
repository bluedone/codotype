import * as React from "react";
import { LogoCloud } from "./LogoCloud"
import { CtaSection } from "./CtaSection"
import { Testimonials } from "./Testimonials"
import { LandingFooter } from "./LandingFooter"
import { Hero } from "./Hero"

export function LandingPage() {
    return (
        <div className="bg-white">
            <main>
                <Hero />
                <Testimonials />
                <LogoCloud />
                <CtaSection />
            </main>

            <LandingFooter />
        </div>
    )
}