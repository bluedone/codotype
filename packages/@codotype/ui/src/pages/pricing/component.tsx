import * as React from "react";
import { PricingHeader } from "./PricingHeader";
import { PriceSection } from "./PriceSection";
import { LogoCloud } from "./LogoCloud";
import { FrequentlyAskedQuestions } from "./FrequentlyAskedQuestions";
import { SignUpSection } from "./SignUpSection";
import { PricingFooter } from "./PricingFooter";

export function PricingPage() {
    return (
        <div className="bg-white">
            <PricingHeader />
            <PriceSection />
            <LogoCloud />
            <FrequentlyAskedQuestions />
            <SignUpSection />
            <PricingFooter />
        </div>
    );
}
