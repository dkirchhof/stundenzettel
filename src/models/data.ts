import { IDay } from "./day";

export interface IData {
    name: string;
    year: number;
    startValue: number;
    holiday: {
        days: number;
        minutesPerDay: number;
    };
    days: IDay[];
}