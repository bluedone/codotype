import { TokenCasing } from "../token";
import { buildTokenCasing } from "../util";

// // // //

interface TokenCasingBuilderParams {
    title: string;
}

export class TokenCasingBuilder implements TokenCasing {
    title: string = "";
    snake: string = "";
    camel: string = "";
    pascal: string = "";
    kebab: string = "";

    constructor(params: TokenCasingBuilderParams) {
        const tokenCasing: TokenCasing = buildTokenCasing(params.title);
        this.title = tokenCasing.title;
        this.snake = tokenCasing.snake;
        this.camel = tokenCasing.camel;
        this.pascal = tokenCasing.pascal;
        this.kebab = tokenCasing.kebab;
    }
}
