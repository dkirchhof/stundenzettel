import { IDay } from "./day";

export interface IData {
    name: string;
    year: number;
    minutesPerDay: number;
    startWith: {
        holiday: number;
        deltaFromYearBefore: number;
    };
    days: IDay[];
}