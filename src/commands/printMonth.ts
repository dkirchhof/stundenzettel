import { format, startOfMonth, endOfMonth, min, startOfYear } from "date-fns";

import { askQuestions } from "../utils/consoleUtils";
import { loadData } from "../data";
import { printAsTable as printDaysAsTable } from "../models/day";
import { getSummaryOfRange, printAsTable as printSummariesAsTable } from "../models/summary";
import { getDays } from "../utils/timeUtils";

export async function printMonth() {
    const now = new Date();
    const todayAsString = format(now, "YYYY-MM");

    const answers = await askQuestions({
        date: {
            question: "Date (YYYY-MM)",
            defaultValue: todayAsString,
            converter: s => new Date(s),
        },
    });

    if(isNaN(answers.date.getTime())) {
        throw new Error("Invalid date");
    }

    const { data } = await loadData(answers.date.getFullYear());
    
    const daysOfMonth = getDays(data.days, startOfMonth(answers.date), endOfMonth(answers.date));
    const daysOfMonthTillToday = getDays(data.days, startOfMonth(answers.date), min(now, endOfMonth(answers.date)));
    const daysOfYearTillToday = getDays(data.days, startOfYear(answers.date), min(now, endOfMonth(answers.date)));

    const fullMonthSummary = getSummaryOfRange(daysOfMonth);
    const monthTillTodaySummary = getSummaryOfRange(daysOfMonthTillToday);
    const yearTillTodaySummary = getSummaryOfRange(daysOfYearTillToday, data.startValue);

    printDaysAsTable(daysOfMonth);

    printSummariesAsTable([
        { name: "Month (full)", summary: fullMonthSummary },
        { name: "Month (partial)", summary: monthTillTodaySummary },
        { name: "Year (partial)", summary: yearTillTodaySummary },
    ]);
}
