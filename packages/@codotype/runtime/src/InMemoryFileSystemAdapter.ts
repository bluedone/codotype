import { FileSystemAdapter } from "@codotype/core";

// // // //

/**
 * InMemoryFileSystemAdapter
 * FileSystemAdapter for writing to the local file system
 */
export class InMemoryFileSystemAdapter implements FileSystemAdapter {
    files: { [key: string]: string };
    constructor() {
        this.files = {};
    }
    ensureDir(dir: string): Promise<boolean> {
        return Promise.resolve(true);
    }
    readFile(filepath: string): Promise<string | null> {
        if (this.files[filepath] !== undefined) {
            return Promise.resolve(this.files[filepath]);
        }
        return Promise.resolve(null);
    }
    fileExists(filepath: string): Promise<boolean> {
        return Promise.resolve(this.files[filepath] !== undefined);
    }
    writeFile(dest: string, compiledTemplate: string): Promise<boolean> {
        this.files[dest] = compiledTemplate;
        return Promise.resolve(true);
    }
}
