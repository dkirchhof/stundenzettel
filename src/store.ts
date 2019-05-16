import { promises as fs } from "fs";
import { homedir } from "os";
import { join } from "path";

import { eventBus, EventType } from "./commands/showUI/events";
import { IConfig } from "./models/config";
import { IData } from "./models/data";
import { readJsonOrCatch } from "./utils/fsUtils";

const CONFIG_PATH = join(homedir(), ".stundenzettel");

class Store {
    public config: IConfig;
    public data: IData;
    public selectedMonth: number;

    public async load(date?: Date) {
        this.config = await readJsonOrCatch({
            path: CONFIG_PATH,
            onFileNotFound: _ => { throw new Error("Couldn't find a config file"); },
            onOtherError:   e => { throw e; },
        });

        if(date) {
            this.data = await readJsonOrCatch({
                path: join(this.config.path, `${date.getFullYear().toString()}.json`),
                onFileNotFound: _ => { throw new Error("Couldn't find data file"); },
                onOtherError:   e => { throw e; },
            });
            
            this.selectedMonth = date.getMonth();
        }
    }

    public async save() {
        const json = JSON.stringify(this.data, null, 4);

        await fs.writeFile(join(this.config.path, `${this.data.year}.json`), json);
    }

    public selectMonth(index: number) {
        if(index < 0) {
            index = 11;
        } else if(index >= 12) {
            index = 0;
        }

        this.selectedMonth = index;
            
        eventBus.emit(EventType.MonthSelected);
    }
};

export const store = new Store();
