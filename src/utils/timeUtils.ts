import { format } from "date-fns";

export function timeToMinutes(timeStr: string) {
    const match = timeStr.match(/(-?)(\d*):(\d*)/);

    if(!match) {
        throw new Error("invalid time");
    }

    const multiplier = match[1] ? -1 : 1;
    const hours = Number(match[2]) || 0;
    const minutes = Number(match[3]) || 0;

    return (hours*60 + minutes) * multiplier;
}

export function minutesToTime(minutes: number) {
    const absMinutes = Math.abs(minutes);
    
    const pad = (number: number) => number.toString().padStart(2, "0");

    const sign = minutes < 0 ? "-" : "";
    const hh = pad(Math.floor(absMinutes / 60));
    const mm = pad(absMinutes % 60);

    return `${sign}${hh}:${mm}`;
}

export function formatDate(date: Date | string | number) {
    return format(date, "dd, DD.MM.YYYY");
}
