import * as fs from "fs";
// @ts-ignore
import * as fsExtra from "fs-extra";
import * as path from "path";
import * as ejs from "ejs";
import {
    indent,
    trailingComma,
    inflateProject,
    Datatype,
    InflatedProject,
    RelationType,
    InflatedSchema,
} from "@codotype/core";
import { CodotypeRuntime, ProjectBuild } from "./types";
import { OUTPUT_DIRECTORY, CODOTYPE_MANIFEST_DIRECTORY } from "./constants";

// // // //

/**
 * prepareProjectBuildDestination
 * Provisions the output directory and writes the Codotype Project JSON to the output directory
 * @param param.build - see ProjectBuild
 * TODO - abstract this into a separate function that's imported by the Runtime
 */
export async function prepareProjectBuildDestination({
    runtime,
    cwd,
    build,
}: {
    runtime: CodotypeRuntime;
    cwd: string;
    build: ProjectBuild;
}): Promise<void> {
    // Debug log statements
    console.log("Writing build manfiest");

    // Defines directory to encapsulate build IFF build.id is defined
    let buildID: string = build.id || "";

    // Defines the destination directory for the build output
    const destRoot: string = path.join(
        cwd,
        OUTPUT_DIRECTORY,
        buildID,
        build.project.identifiers.snake,
    );

    // Ensures presence of the destination directory
    await runtime.ensureDir(destRoot);

    // Defines destination directory for codotype-project.json (.codotype/ by default)
    const manifestDest = path.join(destRoot, CODOTYPE_MANIFEST_DIRECTORY);

    // Ensures presence of the manifestDest directory
    await runtime.ensureDir(manifestDest);

    // Writes two source files into the `.codotype` directory
    return new Promise((resolve, reject) => {
        // Writes Project JSON to output directory
        runtime.writeFile(
            path.join(
                manifestDest +
                    `/${build.project.identifiers.kebab}-codotype-project.json`,
            ),
            JSON.stringify(build.project, null, 2),
        );

        // Debug log statement
        console.log("Wrote codotype-project.json");

        // Resolves the Promise
        return resolve();
    });
}
