import { IDay, isTimeOfDay, realShouldTimeOfDay } from "./day";
import { Colors, Row, table } from "../utils/formatter";
import { minutesToTime } from "../utils/timeUtils";

export interface ISummary {
    is: number;
    should: number;
    difference: number;
}

export interface IRangeSummary extends ISummary {
    rangeStart: string;
    rangeEnd: string; 
}

export const getSummaryOfDay = (day: IDay): ISummary => {
    const is = isTimeOfDay(day);
    const should = realShouldTimeOfDay(day);
    const difference = is - should;

    return { is, should, difference };
}

export const getSummaryOfRange = (days: IDay[], offset?: number): IRangeSummary => {
    const startValue: ISummary = {
        is: offset || 0,
        should: 0,
        difference: offset || 0,
    };
    
    const summary = days.reduce((summary, day) => { 
        const summaryOfDay = getSummaryOfDay(day);

        const newSummary: ISummary = {
            is: summary.is + summaryOfDay.is,
            should: summary.should + summaryOfDay.should,
            difference: summary.difference + summaryOfDay.difference,
        };

        return newSummary;

    }, startValue);

    return {
        ...summary,
        rangeStart: days[0].date, 
        rangeEnd: days[days.length - 1].date,
    }
}

export const printAsTable = (summaries: Array<{ name: string; summary: IRangeSummary; }>) => {
    const summaryToRow = (summary: { name: string; summary: IRangeSummary; }) => {

        const color: Colors = summary.summary.should === 0 ? Colors.BrightBlack : summary.summary.difference < 0 ? Colors.Red : Colors.Green;

        const row: Row = {
            Summary: { 
                value: summary.name,
                style: {
                    align: "left",
                    color,
                },
            },
            "First Date": {
                value: summary.summary.rangeStart,
                style: {
                    align: "left",
                    color,
                }
            },
            "Last Date": {
                value: summary.summary.rangeEnd,
                style: {
                    align: "left",
                    color,
                }
            },
            Is: {
                value: minutesToTime(summary.summary.is),
                style: {
                    align: "right",
                    color,
                },
            },
            Should: {
                value: minutesToTime(summary.summary.should),
                style: {
                    align: "right",
                    color,
                },
            },
            Difference: {
                value: minutesToTime(summary.summary.difference),
                style: {
                    align: "right",
                    color,
                },
            },
        };

        return row;
    };

    table(summaries.map(summaryToRow));
}
