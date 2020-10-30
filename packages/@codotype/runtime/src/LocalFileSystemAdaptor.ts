import * as fs from "fs";
// @ts-ignore
import * as fsExtra from "fs-extra";
import { FileSystemAdaptor } from "@codotype/core";

// // // //

/**
 * LocalFileSystemAdaptor
 * FileSystemAdaptor for writing to the local file system
 */
export class LocalFileSystemAdaptor implements FileSystemAdaptor {
    ensureDir(dir: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            return fsExtra.ensureDir(dir, (err: any) => {
                if (err) return reject(err);
                return resolve(true);
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
            fsExtra.writeFile(dest, compiledTemplate, (err: any) => {
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
