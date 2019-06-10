import { startOfYear, eachDay, endOfYear, format } from "date-fns";
import { promises as fs } from "fs";
import { userInfo } from "os";
import { join } from "path";

import { loadConfig } from "../config";
import { IData } from "../data";
import { IDay } from "../models/day";
import { askQuestions } from "../utils/consoleUtils";
import { timeToMinutes } from "../utils/timeUtils";

export const createSheet = async () => {
    const config = await loadConfig();
    
    const thisName = userInfo().username;
    const thisYearAsString = new Date().getFullYear().toString();
    
    const hoursToMinutesConverter = (s: string) => Number(s) * 60;

    const answers = await askQuestions({
        name: {
            question: "Name",
            defaultValue: thisName,
        },
        year: {
            question: "Year",
            defaultValue: thisYearAsString,
            converter: Number,
        },
        d1: {
            question: "Time on Monday (in hours)",
            defaultValue: "8",
            converter: hoursToMinutesConverter,
        },
        d2: {
            question: "Time on Tuesday (in hours)",
            defaultValue: "8",
            converter: hoursToMinutesConverter,
        },
        d3: {
            question: "Time on Wednesday (in hours)",
            defaultValue: "8",
            converter: hoursToMinutesConverter,
        },
        d4: {
            question: "Time on Thursday (in hours)",
            defaultValue: "8",
            converter: hoursToMinutesConverter,
        },
        d5: {
            question: "Time on Friday (in hours)",
            defaultValue: "8",
            converter: hoursToMinutesConverter,
        },
        d6: {
            question: "Time on Saturday (in hours)",
            defaultValue: "0",
            converter: hoursToMinutesConverter,
        },
        d0: {
            question: "Time on Sunday (in hours)",
            defaultValue: "0",
            converter: hoursToMinutesConverter,
        },
        holidayInDays: {
            question: "Holiday entitlement(in days)",
            converter: Number,
        },
        minutesPerLeaveDay: {
            question: "Time per leave day (in hours)",
            defaultValue: "8",
            converter: hoursToMinutesConverter,
        },
        deltaFromYearBefore: {
            question: "Delta time from year before ([h]:[m])",
            defaultValue: "00:00",
            converter: timeToMinutes,
        },
    });
    
    const firstDayOfYear = startOfYear(answers.year.toString());
    const lastDayOfYear = endOfYear(answers.year.toString());

    const timePerDay = (day: number) => (answers as any)[`d${day}`];
    
    const days = eachDay(firstDayOfYear, lastDayOfYear).map(date => {
        const day: IDay = {
            date: format(date, "YYYY-MM-DD"),
            should: timePerDay(date.getDay()),
        };
     
        return day;
    });

    const data: IData = {
        name: answers.name,
        year: answers.year,
        startValue: answers.deltaFromYearBefore,
        holiday: {
            days: answers.holidayInDays,
            minutesPerDay: answers.minutesPerLeaveDay,
        },
        days,
    };

    const dataPath = join(config.path, `${answers.year}.json`);

    await fs.writeFile(dataPath, JSON.stringify(data, null, 4), { flag: "wx" });    

    console.log(`Created sheet for ${answers.year} in ${dataPath}`);
}
