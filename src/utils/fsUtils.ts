import { promises as fs } from "fs";

interface IReadFileOrCatchOptions {
    path: string;
    onFileNotFound: (e: Error) => any;
    onOtherError: (e: Error) => any;
}

export const readJsonOrCatch = async <T>(options: IReadFileOrCatchOptions) => {
    try {

        const content = await fs.readFile(options.path, "utf8");

        return JSON.parse(content) as T;

    } catch(e) {

        if(e.code === "ENOENT") {
            options.onFileNotFound(e);
        } else {
            options.onOtherError(e);
        }

    }
};

export const readJson = async <T>(path: string) => {
    const content = await fs.readFile(path, "utf8");

    return JSON.parse(content) as T;
}

export const mkdirRecursive = (path: string) => fs.mkdir(path, { recursive: true });
