import { store } from "../store";
import { getDay } from "./showUI/utils";

interface IOptions {
    date?: string;
}

export async function printDay(options: IOptions) {
    const date = options.date ? new Date(options.date) : new Date();

    if(isNaN(date.getTime())) {
        throw new Error("Invalid date");
    }

    await store.load(date);
    
    const day = getDay(store.data.days, date);

    console.log(day);
}
