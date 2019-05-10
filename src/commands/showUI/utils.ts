import { format, getDayOfYear } from "date-fns";
import * as de from "date-fns/locale/de";

import { IData } from "../../models/data";
import { IDay } from "../../models/day";
import { ISummary } from "../../models/summary";

export const getMonthName = (month: number) => format(new Date(0, month), "MMMM", { locale: de });

export const formatDate = (year: number, month: number, day: number) => format(new Date(year, month, day), "dd, DD.MM.YYYY", { locale: de });

export function militaryTimeToMinutes(timeStr: string) {
    return Number(timeStr.slice(0, 2))*60 + Number(timeStr.slice(2));
}

export function minutesToMilitaryTime(minutes: number) {
    return minutesToTime(minutes, false)!.replace(":", "");
}

export function minutesToTime(minutes?: number, withSign?: boolean) {
    if(minutes === undefined) {
        return null;
    }

    const absMinutes = Math.abs(minutes);

    const sign = withSign ? getSign(minutes) : "";
    const h = Math.floor(absMinutes / 60);
    const m = absMinutes % 60;

    const pad = (number: number) => number.toString().padStart(2, "0");

    return `${sign}${pad(h)}:${pad(m)}`;
}

export function isTimeOfDay(day: IDay) {
    return (day.end || 0) - (day.start || 0) - (day.break || 0);
}

export function shouldTimeOfDay(day: IDay) {
    return day.should - (day.holiday || 0) - (day.sick || 0);
}

export function getDay(months: IDay[][], date: Date) {
    return getDays(months, date, date)[0] || null;
}

export function getDays(months: IDay[][], start: Date, end: Date) {
    const startAsDayOfYear = getDayOfYear(start);
    const endAsDayOfYear = getDayOfYear(end);

    return months.flat().slice(startAsDayOfYear-1, endAsDayOfYear);    
}

export function getSummaryOfDay(day: IDay): ISummary {
    const is = isTimeOfDay(day);
    const should = shouldTimeOfDay(day);
    const difference = is - should;

    return { is, should, difference };
}

export function getSummaryOfRange(months: IDay[][], start: Date, end: Date, offset?: number) {
    const startValue: ISummary = {
        is: offset || 0,
        should: 0,
        difference: offset || 0,
    };

    return getDays(months, start, end)
        .reduce((summary, day) => { 
            const summaryOfDay = getSummaryOfDay(day);

            const newSummary: ISummary = {
                is: summary.is + summaryOfDay.is,
                should: summary.should + summaryOfDay.should,
                difference: summary.difference + summaryOfDay.difference,
            };

            return newSummary;

        }, startValue);
}

export function getHolidaySummary(data: IData): ISummary {
    const is = data.months.flat().reduce((sum, day) => sum + (day.holiday || 0), 0);

    return {
        is,
        should: data.startWith.holiday,
        difference: data.startWith.holiday - is,
    };
}

export function getSign(number: number) {
    if(number > 0) {
        return "+";
    }

    if(number < 0) {
        return "-";
    }

    return " ";
}

interface IStringable {
    toString(): string;
}

export function cell(value: IStringable | undefined, width: number, align: "center" | "left" | "right") {
    if(!value) {
        return " ".repeat(width);
    }
    
    switch(align) {
        case "center": return value.toString().padStart(width / 2, " ").padEnd(width / 2, " ");
        case "left": return value.toString().padEnd(width, " ");
        case "right": return value.toString().padStart(width, " ");
    }
}

interface ICell {
    align: "center" | "left" | "right"; 
    value: IStringable | undefined;
}

export const table = (rows: ICell[][]) => {
    const columnWidths = rows[0].map((_, i) => {
        const widths = rows.map(r => r[i].value.toString().length);
        return Math.max(...widths);
    });

    const toRealCells = (c: ICell, column: number) => cell(c.value, columnWidths[column], c.align);

    return rows.map(r => r.map(toRealCells));
}

export function summaryToColor(summary: ISummary) {
    if(summary.should === 0) {
        return "{gray-fg}";
    }

    if(summary.difference < 0) {
        return "{red-fg}";
    }

    return "{green-fg}";
}

export function numberToColor(value: number) {
    if(value > 0) {
        return "{green-fg}";
    }

    if(value < 0) {
        return "{red-fg}";
    }

    return "";
}
