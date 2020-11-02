import * as fsExtra from "fs-extra";
import * as fs from "fs";
import { FileSystemAdapter } from "@codotype/core";

// // // //

/**
 * LocalFileSystemAdapter
 * FileSystemAdapter for writing to the local file system
 */
export class LocalFileSystemAdapter implements FileSystemAdapter {
    ensureDir(dir: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fsExtra.ensureDir(dir).then(() => {
                resolve(true);
            });
        });
    }
    readFile(filepath: string): Promise<string | null> {
        if (!this.fileExists(filepath)) {
            return Promise.resolve(null);
        }
        return this.readFile(filepath);
    }
    fileExists(filepath: string): Promise<boolean> {
        return Promise.resolve(fs.existsSync(filepath));
    }
    writeFile(dest: string, compiledTemplate: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.writeFile(dest, compiledTemplate, (err: any) => {
                // Handle error
                if (err) {
                    // Rejects error
                    return reject(err);
                }

                // Resovles
                return resolve(true);
            });
        });
    }
}
