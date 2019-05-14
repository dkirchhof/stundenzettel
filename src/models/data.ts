import { IDay } from "./day";

export interface IData {
    name: string;
    year: number;
    minutesPerDay: number;
    startWith: {
        holiday: number;
        timeFromYearBefore: number;
    };
    days: IDay[];
}