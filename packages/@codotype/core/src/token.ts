export interface TokenPluralization {
  singular: TokenCasing;
  plural: TokenCasing;
}

export interface TokenCasing {
  label: string;
  snake: string;
  camel: string;
  pascal: string;
  kebab: string;
}

export const EMPTY_TOKEN_CASING: TokenCasing = {
  label: "",
  snake: "",
  camel: "",
  pascal: "",
  kebab: "",
};
