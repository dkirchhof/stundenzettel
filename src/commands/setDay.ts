import { format } from "date-fns";

import { loadData, saveData } from "../data";
import { askQuestions } from "../utils/consoleUtils";
import { timeToMinutes, minutesToTime } from "../utils/timeUtils";
import { getDay } from "./showUI/utils";
import { IDay } from "../models/day";

export async function setDay() {
    const todayAsString = format(new Date(), "YYYY-MM-DD");
    
    const dateConverter = (s: string) => new Date(s);
    
    const answers1 = await askQuestions({
        date: { 
            question: "Date (YYYY-MM-DD)", 
            defaultValue: todayAsString,
            converter: dateConverter, 
        },
    });

    if(isNaN(answers1.date.getTime())) {
        throw new Error("Invalid date");
    }

    const { data, dataPath } = await loadData(answers1.date.getFullYear());

    const day = getDay(data.days, answers1.date);

    const timeOfDayPropertyOrEmptyString = (day: IDay, property: keyof IDay) => day && day[property] && minutesToTime(day[property] as number) || ""

    const timeOrUndefinedConverter = (s: string) => s.length ? timeToMinutes(s) : undefined;
    const stringOrUndefinedConverter = (s: string) => s.length ? s : undefined;

    const answers2 = await askQuestions({
        start: { 
            question: "Start ([hh]:[mm])",
            optional: true,
            defaultValue: timeOfDayPropertyOrEmptyString(day, "start"),
            converter: timeOrUndefinedConverter,
        },
        end: { 
            question: "End ([hh]:[mm])",
            optional: true,
            defaultValue: timeOfDayPropertyOrEmptyString(day, "end"),
            converter: timeOrUndefinedConverter,
        },
        break: { 
            question: "Break ([hh]:[mm])", 
            optional: true,
            defaultValue: timeOfDayPropertyOrEmptyString(day, "break"),
            converter: timeOrUndefinedConverter,
        },
        holiday: { 
            question: "Holiday ([hh]:[mm])",
            optional: true,
            defaultValue: timeOfDayPropertyOrEmptyString(day, "holiday"),
            converter: timeOrUndefinedConverter,
        },
        sick: { 
            question: "Sick ([hh]:[mm])",
            optional: true,
            defaultValue: timeOfDayPropertyOrEmptyString(day, "sick"),
            converter: timeOrUndefinedConverter,
        },
        comment: {
            question: "Comment",
            optional: true,
            defaultValue: day && day.comment,
            converter: stringOrUndefinedConverter,
        }
    });
    
    Object.assign(day, answers2);

    await saveData(dataPath, data);
}
