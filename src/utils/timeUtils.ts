import { format } from "date-fns";

export function militaryTimeToMinutes(timeStr: string) {
    if(timeStr.length !== 4) {
        throw new Error("invalid military time");
    }

    return Number(timeStr.slice(0, 2))*60 + Number(timeStr.slice(2));
}

export function timeToMinutes(timeStr: string) {
    const match = timeStr.match(/(\d{0,2}):(\d{0,2})/);

    if(!match) {
        throw new Error("invalid time");
    }

    const hours = Number(match[1]) || 0;
    const minutes = Number(match[2]) || 0;

    return hours*60 + minutes;
}

export function minutesToMilitaryTime(minutes: number) {
    return minutesToTime(minutes).replace(":", "");
}

export function minutesToTime(minutes: number) {
    const absMinutes = Math.abs(minutes);
    
    const pad = (number: number) => number.toString().padStart(2, "0");

    const hh = pad(Math.floor(absMinutes / 60));
    const mm = pad(absMinutes % 60);

    return `${hh}:${mm}`;
}

export function formatDate(date: Date | string | number) {
    return format(date, "dd, DD.MM.YYYY");
}
