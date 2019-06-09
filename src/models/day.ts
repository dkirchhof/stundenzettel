import { table, Row, Colors } from "../utils/formatter";
import { minutesToTime, formatDate } from "../utils/timeUtils";
import { getSummaryOfDay } from "./summary";

export interface IDay {
    date: string;
    should: number;

    start?: number;
    end?: number;
    break?: number;
    holiday?: number;
    sick?: number;
    comment?: string;
}

export const isTimeOfDay = (day: IDay) => (day.end || 0) - (day.start || 0) - (day.break || 0);
export const realShouldTimeOfDay = (day: IDay) => day.should - (day.holiday || 0) - (day.sick || 0);

export const printAsTable = (days: IDay[]) => {

    const minutesToTimeSafe = (day: IDay, property: keyof IDay) => day && day[property] && minutesToTime(day[property] as number) || "";
    
    const dayToRow = (day: IDay) => {

        const summary = getSummaryOfDay(day);

        const color: Colors = summary.should === 0 ? Colors.BrightBlack : summary.difference < 0 ? Colors.Red : Colors.Green;
        const sign = summary.difference < 0 ? "-" : summary.difference > 0 ? "+" : "";

        const row: Row = {
            Date: { 
                value: formatDate(day.date),
                style: {
                    align: "left",
                    color,
                },
            },
            Start: { 
                value: minutesToTimeSafe(day, "start"),
                style: {
                    align: "right",
                    color,
                },
            },
            End: { 
                value: minutesToTimeSafe(day, "end"),
                style: {
                    align: "right",
                    color,
                },
            },
            Break: { 
                value: minutesToTimeSafe(day, "break"),
                style: {
                    align: "right",
                    color,
                },
            },
            Holiday: { 
                value: minutesToTimeSafe(day, "holiday"),
                style: {
                    align: "right",
                    color,
                }, 
            },
            Sick: { 
                value: minutesToTimeSafe(day, "sick"),
                style: {
                    align: "right",
                    color,
                },
            },
            Is: { 
                value: minutesToTime(summary.is),
                style: {
                    align: "right",
                    color,
                }, 
            },
            Should: { 
                value: minutesToTime(summary.should),
                style: {
                    align: "right",
                    color,
                }, 
            },
            Difference: { 
                value: sign + minutesToTime(summary.difference),
                style: {
                    align: "right",
                    color,
                }, 
            },
            Comment: { 
                value: day.comment || "",
                style: {
                    align: "left",
                    color,
                }, 
            },
        };

        return row;
    }

    table(days.map(dayToRow));
}
