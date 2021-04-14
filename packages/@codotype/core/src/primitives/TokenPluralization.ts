import { EMPTY_TOKEN_CASING, TokenCasing, TokenPluralization } from "../token";
import { buildTokenPluralization } from "../util";

// // // //

interface TokenPluralizationBuilderParams {
    titleSingular: string;
}

export class TokenPluralizationBuilder implements TokenPluralization {
    plural: TokenCasing = {
        ...EMPTY_TOKEN_CASING,
    };
    singular: TokenCasing = {
        ...EMPTY_TOKEN_CASING,
    };

    constructor(params: TokenPluralizationBuilderParams) {
        const tokenPluralization: TokenPluralization = buildTokenPluralization(
            params.titleSingular,
        );
    }
}
