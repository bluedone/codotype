import { CodotypeNodeRuntime } from "../node-runtime-v2";
import { RuntimeLogLevel, CodotypeRuntime, MockRuntime } from "../core-updates";

// // // //

describe("testing @codotype/runtime v2", () => {
    test("testing @codotype/runtime v2", async () => {
        const mockRuntime: CodotypeRuntime = new MockRuntime({
            cwd: "/",
            logLevel: RuntimeLogLevel.verbose,
        });

        // console.log(mockRuntime);

        const res = await mockRuntime.writeFile(
            "path/to/file.js",
            "compiledTemplateString",
        );

        const exists = await mockRuntime.fileExists("path/to/file.js");
        expect(exists).toBe(true);

        const compared = await mockRuntime.compareFile(
            "path/to/file.js",
            "compiledTemplateString",
        );
        expect(compared).toBe(true);

        const comparedFalse = await mockRuntime.compareFile(
            "path/to/file.js",
            "compiledTemplateString",
        );
        expect(comparedFalse).toBe(comparedFalse);
    });
});

// templatePath: (resolvedPath: string, templatePath: string) => string;
// ensureDir: (dirPath: string) => Promise<boolean>;
// copyDir: (dirPath: string, destinationDirPath: string) => Promise<boolean>;
// renderTemplate: any;
// existsSync: (path: string) => boolean;
// compareFile: (
//     destinationPath: string,
//     compiledTemplate: string,
// ) => Promise<any>;
// writeFile: (
//     destinationPath: string,
//     compiledTemplate: string,
// ) => Promise<boolean>;
// destinationPath: (destination: string, filename: string) => string;
// composeWith: (generator: any, generatorModule: any, options: any) => any; // wtf is generatorModule
