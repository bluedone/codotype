import { PropertyType } from "../../configuration-property";
import { ConfigurationPropertyBuilder } from "../ConfigurationProperty";

// Mocks UUID module
jest.mock("uuid", () => ({
    __esModule: true,
    v4: () => "1234-5678-1234-5678",
}));

// // // //

describe("factory", () => {
    test("works", () => {
        const configurationGroupProperty = new ConfigurationPropertyBuilder({
            identifier: "meh_value",
            type: PropertyType.BOOLEAN,
            content: {
                label: "meh",
            },
        });

        expect(configurationGroupProperty).toMatchSnapshot();
    });
});
