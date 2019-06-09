import { promises as fs } from "fs";
import { join } from "path";

import { loadConfig } from "./config";
import { IDay } from "./models/day";
import { readJson } from "./utils/fsUtils";

export interface IData {
    name: string;
    year: number;
    startValue: number;
    holiday: {
        days: number;
        minutesPerDay: number;
    };
    days: IDay[];
}

export const loadData = async (year: number) => {
    const config = await loadConfig();
    const dataPath = join(config.path, `${year}.json`);
    const data = await readJson<IData>(dataPath);

    return { data, dataPath };
};

export const saveData = async (path: string, data: IData) => {
    const json = JSON.stringify(data, null, 4);

    await fs.writeFile(path, json);    
};
