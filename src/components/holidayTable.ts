import { box } from "blessed";

import { store } from "../store";
import { getHolidaySummary, getSign, cell, summaryToColor } from "../utils";

export const holidayTable = () => {
    const summary = getHolidaySummary(store.data);

    const isInDays = summary.is/store.data.minutesPerDay;
    const shouldInDays = summary.should/store.data.minutesPerDay;
    const differenceInDays = `${getSign(summary.difference)}${summary.difference/store.data.minutesPerDay}`;

    const header = box({
        bg: "gray",
        content: "Urlaub    Verbraucht    Anspruch    Verbleibend",
    });

    const color = summaryToColor(summary);

    const cells = [
        cell("Tage", 6, "left"),
        cell(isInDays, 10, "right"),
        cell(shouldInDays, 8, "right"),
        cell(differenceInDays, 11, "right"),
    ]

    const table = box({
        top: 1,
        tags: true,
        content: `${color}${cells.join("\t")}`,
    });

    const container = box({
        top: 2,
    });

    container.append(header);
    container.append(table);

    return container;
};