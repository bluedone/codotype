import { validatePlugin } from "../validatePlugin";
import { testState } from "../../__tests__/test_state";

// // // //

describe("/util/validatePlugin.js", () => {
    it("valid Plugin should return no errors", () => {
        const validations = validatePlugin({
            plugin: testState.dummyPluginMetadata,
        });
        // @ts-ignore
        const hasErrors = validations.map((v) => v.valid).includes(false);
        expect(hasErrors).toBe(false);
    });
});
