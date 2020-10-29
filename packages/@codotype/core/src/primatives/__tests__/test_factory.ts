import { OptionType } from "../../configuration-option-types";
import { ConfigurationGroupPropertyBuilder } from "../ConfigurationGroupProperty";

// Mocks UUID module
jest.mock("uuid", () => ({
    __esModule: true,
    v4: () => "1234-5678-1234-5678",
}));

// // // //

describe("factory", () => {
    test("works", () => {
        const configurationGroupProperty = new ConfigurationGroupPropertyBuilder(
            {
                label: "meh",
                identifier: "meh_value",
                type: OptionType.BOOLEAN,
            },
        );

        expect(configurationGroupProperty).toMatchSnapshot();
    });
});
