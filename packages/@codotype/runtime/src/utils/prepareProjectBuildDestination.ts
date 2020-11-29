import * as path from "path";
import { Runtime, ProjectBuild, RuntimeLogLevels } from "@codotype/core";
import { OUTPUT_DIRECTORY, CODOTYPE_MANIFEST_DIRECTORY } from "../constants";

// // // //

/**
 * prepareProjectBuildDestination
 * Provisions the output directory and writes the Codotype Project JSON to the output directory
 * @param param.cwd - @see RuntimeProps.cwd
 * @param param.runtime - @see CodotypeRuntime
 * @param param.build - @see ProjectBuild
 */
export async function prepareProjectBuildDestination(params: {
    cwd: string;
    runtime: Runtime;
    build: ProjectBuild;
}): Promise<void> {
    const { runtime, cwd, build } = params;

    // Debug log statements
    runtime.log("Writing build manfiest", {
        level: RuntimeLogLevels.verbose,
    });

    // Defines directory to encapsulate build IFF build.id is defined
    let buildID: string = build.id || "";

    // Defines the destination directory for the build output
    const destRoot: string = path.join(
        cwd,
        OUTPUT_DIRECTORY,
        buildID,
        build.projectInput.identifiers.snake,
    );

    // Ensures presence of the destination directory
    await runtime.ensureDir(destRoot);

    // Defines destination directory for codotype-project.json (.codotype/ by default)
    const manifestDest = path.join(destRoot, CODOTYPE_MANIFEST_DIRECTORY);

    // Ensures presence of the manifestDest directory
    await runtime.ensureDir(manifestDest);

    // Writes two source files into the `.codotype` directory
    return new Promise<void>((resolve) => {
        // Constructs filename for ProjectInput JSON
        const projectFilename = `${build.projectInput.identifiers.kebab}-codotype-project.json`;

        // Writes ProjectInput JSON to output directory
        runtime.writeFile(
            path.join(`${manifestDest}/${projectFilename}`),
            JSON.stringify(build.projectInput, null, 2),
        );

        // Debug log statement
        runtime.log("Wrote codotype-project.json", {
            level: RuntimeLogLevels.verbose,
        });

        // Resolves the Promise
        return resolve();
    });
}
