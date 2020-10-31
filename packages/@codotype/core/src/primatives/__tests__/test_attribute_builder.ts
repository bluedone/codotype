import { AttributeBuilder } from "../Attribute";
import { Datatype } from "../..";

// Mocks UUID module
jest.mock("uuid", () => ({
    __esModule: true,
    v4: () => "1234-5678-1234-5678",
}));

// // // //

describe("AttributeBuilder", () => {
    test("works", () => {
        const attribute = new AttributeBuilder({
            datatype: Datatype.STRING,
            identifiers: {
                title: "My String",
                snake: "my_string",
                camel: "myString",
                pascal: "MyString",
                kebab: "my-string",
            },
        });

        expect(attribute).toMatchSnapshot();
    });
});
