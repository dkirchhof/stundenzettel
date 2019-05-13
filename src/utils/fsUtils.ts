import { promises as fs } from "fs";

interface IReadFileOrCatchOptions {
    path: string;
    onFileNotFound: (e: Error) => any;
    onOtherError: (e: Error) => any;
}

export const readJSONOrCatch = async (options: IReadFileOrCatchOptions) => {
    try {
        const content = await fs.readFile(options.path, "utf8");
        return JSON.parse(content);
    } catch(e) {
        if(e.code === "ENOENT") {
            options.onFileNotFound(e);
        } else {
            options.onOtherError(e);
        }
    }
};
