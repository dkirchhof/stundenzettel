import { promises as fs } from "fs";
import { join } from "path";

import { eventBus, EventType } from "./commands/showUI/events";
import { data } from "./data";

class Store {
    public data = data;
    public selectedMonth = 0;

    public async load() {
        // const fileContent = await fs.readFile(join(__dirname, "../../data.json"), "utf-8");

        // return JSON.parse(fileContent);
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
