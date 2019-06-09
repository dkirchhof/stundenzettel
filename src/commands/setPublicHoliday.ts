import { format } from "date-fns";

import { loadData, saveData } from "../data";
import { askQuestions } from "../utils/consoleUtils";
import { getDay, timeToMinutes } from "../utils/timeUtils";

export async function setPublicHoliday() {
    const thisYearAsString = format(new Date(), "YYYY-");
    
    const dateConverter = (s: string) => new Date(s);

    const answers1 = await askQuestions({
        date: { 
            question: "Date (YYYY[-MM[-DD]])",
            defaultValue: thisYearAsString,
            converter: dateConverter,
        },
    });

    if(isNaN(answers1.date.getTime())) {
        throw new Error("Invalid date");
    }

    const { data, dataPath } = await loadData(answers1.date.getFullYear());

    const day = getDay(data.days, answers1.date);

    const answers2 = await askQuestions({
        should: { 
            question: "Should (hh:mm)",
            defaultValue: "00:00",
            converter: timeToMinutes,
        },
    });
    
    Object.assign(day, answers2);

    await saveData(dataPath, data);
}
