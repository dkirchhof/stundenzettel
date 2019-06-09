import { format, min, startOfYear, endOfYear } from "date-fns";

import { askQuestions } from "../utils/consoleUtils";
import { loadData } from "../data";
import { printAsTable as printDaysAsTable } from "../models/day";
import { getSummaryOfRange, printAsTable as printSummariesAsTable } from "../models/summary";
import { getDays } from "../utils/timeUtils";

export async function printYear() {
    const now = new Date();
    const todayAsString = format(now, "YYYY");

    const answers = await askQuestions({
        date: {
            question: "Date (YYYY)",
            defaultValue: todayAsString,
            converter: s => new Date(s),
        },
    });

    if(isNaN(answers.date.getTime())) {
        throw new Error("Invalid date");
    }

    const { data } = await loadData(answers.date.getFullYear());
    
    const daysOfYear = getDays(data.days, startOfYear(answers.date), endOfYear(answers.date));
    const daysOfYearTillToday = getDays(data.days, startOfYear(answers.date), min(now, endOfYear(answers.date)));

    const fullYearSummary = getSummaryOfRange(daysOfYear, data.startValue);
    const yearTillTodaySummary = getSummaryOfRange(daysOfYearTillToday, data.startValue);

    printDaysAsTable(daysOfYear);

    printSummariesAsTable([
        { name: "Year (full)", summary: fullYearSummary },
        { name: "Year (partial)", summary: yearTillTodaySummary },
    ]);
}
