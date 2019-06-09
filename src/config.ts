import { promises as fs } from "fs";
import { homedir } from "os";
import { join } from "path";

import { readJson } from "./utils/fsUtils";

export const CONFIG_PATH = join(homedir(), ".stundenzettel");

export interface IConfig {
    path: string;
}

export const loadConfig = () => readJson<IConfig>(CONFIG_PATH);

export const saveConfig = (config: IConfig) => fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 4));
