import { promises as fs } from "fs";
import { homedir } from "os";
import { join } from "path";

import { eventBus, EventType } from "./commands/showUI/events";
import { data } from "./data";
import { IConfig } from "./models/config";
import { IData } from "./models/data";
import { readJSONOrCatch } from "./utils/fsUtils";

const CONFIG_PATH = join(homedir(), ".stundenzettel");

class Store {
    public config: IConfig;
    public data: IData = data;
    public selectedMonth = 0;

    public async load(year?: number) {
        this.config = await readJSONOrCatch({
            path: CONFIG_PATH,
            onFileNotFound: _ => { throw new Error("Couldn't find a config file"); },
            onOtherError:   e => { throw e; },
        });

        const data = await readJSONOrCatch({
            path: join(this.config.path, `${year.toString()}.json`),
            onFileNotFound: _ => { throw new Error("Couldn't find data file"); },
            onOtherError:   e => { throw e; },
        });

        console.log(data);
    }

    public async save() {
        // const json = JSON.stringify(data, null, 4);

        // await fs.writeFile(join(__dirname, "../../data.json"), json);
    }

    public selectMonth(index: number) {
        if(index < 0) {
            index = this.data.months.length - 1;
        } else if(index >= this.data.months.length) {
            index = 0;
        }

        this.selectedMonth = index;
            
        eventBus.emit(EventType.MonthSelected);
    }
};

export const store = new Store();
