import { format } from "date-fns";

import { askQuestions } from "../utils/consoleUtils";
import { loadData } from "../data";
import { printAsTable } from "../models/day";
import { getDay } from "../utils/timeUtils";

export async function printDay() {
    const todayAsString = format(new Date(), "YYYY-MM-DD");

    const answers = await askQuestions({
        date: {
            question: "Date",
            defaultValue: todayAsString,
            converter: s => new Date(s),
        },
    });

    if(isNaN(answers.date.getTime())) {
        throw new Error("Invalid date");
    }

    const { data } = await loadData(answers.date.getFullYear());
    
    const day = getDay(data.days, answers.date);

    printAsTable([day]);
}
