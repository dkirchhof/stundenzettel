import { store } from "../store";
import { assignDefinedProperties } from "../utils";
import { getDay } from "./showUI/utils";

interface IOptions {
    date?   : string;
    start?  : number;
    end?    : number;
    break?  : number;
    holiday?: number;
    sick?   : number;
}

export async function setDay(options: IOptions) {
    const date = options.date ? new Date(options.date) : new Date();

    if(isNaN(date.getTime())) {
        throw new Error("Invalid date");
    }

    await store.load();

    const day = getDay(store.data.months, date);
    
    assignDefinedProperties(day, options, ["start", "end", "break", "holiday", "sick"]);

    await store.save();
}
