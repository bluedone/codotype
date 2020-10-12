export interface CodotypeRuntime<T> {
    templatePath: (resolvedPath: string, templatePath: string) => string;
    ensureDir: (dirPath: string) => Promise<boolean>;
    copyDir: (dirPath: string, destinationDirPath: string) => Promise<boolean>;
    renderTemplate: any;
    existsSync: (path: string) => boolean;
    compareFile: (
        destinationPath: string,
        compiledTemplate: string,
    ) => Promise<any>;
    writeFile: (
        destinationPath: string,
        compiledTemplate: string,
    ) => Promise<boolean>;
    destinationPath: (destination: string, filename: string) => string;
    composeWith: (generator: any, generatorModule: any, options: any) => any; // wtf is generatorModule
}
