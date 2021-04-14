import { ProjectBuildBuilder } from "../ProjectBuild";
import { ProjectInput } from "../../project";
// import { testState } from "../../";
import { buildDefaultProjectInput } from "../../util";
import { NextJsStarter } from "../../__tests__/test_state/plugins/NextJsStarter";

// // // //

describe("ProjectBuildBuilder", () => {
    test("works", () => {
        const projectInput: ProjectInput = buildDefaultProjectInput(
            NextJsStarter,
        );
        const projectBuild = new ProjectBuildBuilder({
            id: "",
            projectInput,
        });

        // Update projectBuild.startTime to prevent tests from failing
        // projectBuild.startTime = "1618439842359";

        expect(projectBuild).toMatchSnapshot();
    });
});
