import { startOfYear, eachDay, endOfYear, format, isWeekend } from "date-fns";
import { promises as fs } from "fs";
import { join } from "path";

import { IData } from "../models/data";
import { IDay } from "../models/day";
import { store } from "../store";
import { askQuestions } from "../utils/consoleUtils";

export const createSheet = async () => {
    await store.load();
    
    const answers = await askQuestions({
        name: "Name:",
        year: "Year:",
        hoursPerDay: "Time per day (in hours):",
        holidayInDays: "Holiday (in days):",
        deltaFromYearBefore: "Delta time from year before (in minutes):",
    });
    
    const firstDayOfYear = startOfYear(answers.year);
    const lastDayOfYear = endOfYear(answers.year);
    const minutesPerDay = Number(answers.hoursPerDay) * 60;
    
    const days = eachDay(firstDayOfYear, lastDayOfYear).map(date => {
        const day: IDay = {
            date: format(date, "YYYY-MM-DD"),
            should: isWeekend(date) ? 0 : minutesPerDay,
        };
     
        return day;
    });

    const data: IData = {
        name: answers.name,
        year: Number(answers.year),
        minutesPerDay,
        startWith: {
            holiday: Number(answers.holidayInDays) * minutesPerDay,
            deltaFromYearBefore: Number(answers.deltaFromYearBefore),
        },
        days,
    };

    const dataPath = join(store.config.path, `${answers.year}.json`);

    await fs.writeFile(dataPath, JSON.stringify(data, null, 4), { flag: "wx" });    

    console.log(`Created sheet for ${answers.year} in ${dataPath}`);
}
