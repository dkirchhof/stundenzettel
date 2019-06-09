import { format } from "date-fns";

import { loadData, saveData } from "../data";
import { askQuestions } from "../utils/consoleUtils";
import { getDays } from "../utils/timeUtils";

export async function setHoliday() {
    const thisYearAsString = format(new Date(), "YYYY-");
    
    const dateConverter = (s: string) => new Date(s);

    const answers = await askQuestions({
        startDate: { 
            question: "Start Date (YYYY[-MM[-DD]])",
            defaultValue: thisYearAsString,
            converter: dateConverter,
        },
        endDate: { 
            question: "End Date (YYYY[-MM[-DD]])",
            defaultValue: thisYearAsString,
            converter: dateConverter,
        },
    });

    if(isNaN(answers.startDate.getTime())) {
        throw new Error("Invalid start date");
    }

    if(isNaN(answers.endDate.getTime())) {
        throw new Error("Invalid end date");
    }

    const startYear = answers.startDate.getFullYear();
    const endYear = answers.endDate.getFullYear();
    
    if(startYear !== endYear) {
        throw new Error("start date and end date should be in the same year");
    }

    const { data, dataPath } = await loadData(startYear);

    const days = getDays(data.days, answers.startDate, answers.endDate);

    days.forEach(d => {
        if(d.should) {
            d.holiday = d.should;
        }
    });

    await saveData(dataPath, data);
}
