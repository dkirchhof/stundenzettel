import { getDays } from "./showUI/utils";
import { store } from "../store";

interface IOptions {
    startDate: string;
    endDate: string; 
}

export async function setHoliday(options: IOptions) {
    const startDate = new Date(options.startDate);
    const endDate = new Date(options.endDate);

    if(isNaN(startDate.getTime())) {
        throw new Error("Invalid start date");
    }

    if(isNaN(endDate.getTime())) {
        throw new Error("Invalid end date");
    }

    if(startDate.getFullYear() !== endDate.getFullYear()) {
        throw new Error("The start and end date should be in the same year.")
    }

    if(startDate > endDate) {
        throw new Error("The start date should be smaller than or equals to the end date.");
    }

    await store.load(startDate);

    const days = getDays(store.data.days, startDate, endDate);

    days.forEach(d => {
        if(d.should) {
            d.holiday = d.should;
        }
    });

    await store.save();
}
