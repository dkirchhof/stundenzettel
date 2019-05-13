import { promises as fs } from "fs";
import { homedir } from "os";
import { join, isAbsolute } from "path";

import { IConfig } from "../models/config";

const CONFIG_PATH = join(homedir(), ".stundenzettel");

interface IOptions {
    path: string;
}

export async function createConfig(options: IOptions) {
    if(!options.path || !options.path.trim().length) {
        throw new Error("Invalid path");
    }

    if(!isAbsolute(options.path)) {
        throw new Error("Path should be absolute");
    }

    const config: IConfig = {
        path: options.path,
    };

    await fs.mkdir(options.path, { recursive: true });
    await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 4));

    console.log(`Created config in ${CONFIG_PATH}`);
}
