import * as fs from "fs";

// // // //

export function getAllFiles(dirPath: string, arrayOfFiles: string[]): string[] {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push([dirPath, "/", file].join(""));
        }
    });

    return arrayOfFiles;
}
