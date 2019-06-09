import { format, min, startOfYear, endOfYear } from "date-fns";

import { askQuestions } from "../utils/consoleUtils";
import { getDays } from "./showUI/utils";
import { loadData } from "../data";
import { printAsTable as printDaysAsTable, IDay } from "../models/day";
import { getSummaryOfRange, printAsTable as printSummariesAsTable } from "../models/summary";
import { Row, table, Colors } from "../utils/formatter";
import { formatDate, minutesToTime } from "../utils/timeUtils";

export async function printHolidays() {
    const todayAsString = format(new Date(), "YYYY");

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
    
    const daysWithHoliday = data.days.filter(day => day.holiday);

    const holidayToRow = (day: IDay) => {
        const row: Row = {
            Date: { 
                value: formatDate(day.date),
                style: {
                    align: "left",
                    color: Colors.Green,
                },
            },
            Holiday: {
                value: minutesToTime(day.holiday!),
                style: {
                    align: "right",
                    color: Colors.Green,
                },
            },
        };

        return row;
    }

    table(daysWithHoliday.map(holidayToRow));

    const is = data.days.reduce((sum, day) => sum + (day.holiday || 0), 0) / data.holiday.minutesPerDay;
    const difference = data.holiday.days - is;

    const color: Colors = difference > 0 ? Colors.Green : difference < 0 ? Colors.Red : Colors.BrightBlack;
    const sign = difference < 0 ? "-" : "";

    const summaryRow: Row = {
        Holiday: {
            value: "Holiday (in Days)",
            style: {
                align: "left",
                color,
            },
        },
        Is: {
            value: is.toString(),
            style: {
                align: "right",
                color,
            },
        },
        Can: {
            value: data.holiday.days.toString(),
            style: {
                align: "right",
                color,
            },
        },
        Difference: {
            value: sign + difference.toString(),
            style: {
                align: "right",
                color,
            },
        },
    };

    table([summaryRow]);
}
