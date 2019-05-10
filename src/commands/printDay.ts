import { store } from "../store";
import { getDay } from "./showUI/utils";

export async function printDay(dateString?: string) {
    const date = dateString ? new Date(dateString) : new Date();

    if(isNaN(date.getTime())) {
        throw new Error("Invalid date");
    }

    await store.load();
    
    const day = getDay(store.data.months, date);

    console.log(day);
}
