import { RuntimeLogLevels, RuntimeLogBehaviors } from "@codotype/core";
import { logger } from "../logger";

// // // //

describe("logger", () => {
    test("RuntimeLogLevels.info", () => {
        logger(
            "This is an info log",
            {
                level: RuntimeLogLevels.info,
            },
            RuntimeLogBehaviors.normal,
        );
    });

    test("RuntimeLogLevels.warning", () => {
        logger(
            "This is an warning log",
            {
                level: RuntimeLogLevels.warning,
            },
            RuntimeLogBehaviors.normal,
        );
    });

    test("RuntimeLogLevels.error", () => {
        logger(
            "This is an error log",
            {
                level: RuntimeLogLevels.error,
            },
            RuntimeLogBehaviors.normal,
        );
    });

    test("RuntimeLogBehaviors == verbose", () => {
        logger(
            "This should not be logged",
            {
                level: RuntimeLogLevels.verbose,
            },
            RuntimeLogBehaviors.normal,
        );
    });

    test("RuntimeLogBehaviors != verbose", () => {
        logger(
            "This should be logged",
            {
                level: RuntimeLogLevels.verbose,
            },
            RuntimeLogBehaviors.verbose,
        );
    });
});
