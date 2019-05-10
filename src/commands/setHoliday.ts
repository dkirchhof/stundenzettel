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

    await store.load();

    const days = getDays(store.data.months, startDate, endDate);

    days.forEach(d => {
        if(d.should) {
            d.holiday = d.should;
        }
    });

    await store.save();
}
