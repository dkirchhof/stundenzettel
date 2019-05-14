import { box } from "blessed";
import { startOfMonth, min, endOfMonth, startOfYear } from "date-fns";

import { store } from "../../../../store";
import { getSummaryOfRange, minutesToTime, summaryToColor, cell } from "../../utils";
import { eventBus, EventType } from "../../events";

export const monthSummaryTable = () => {
    const headerColumns = [
        cell("Zusammenfassung", 59, "left"),
        cell("Ist", 6, "right"),
        cell("Soll", 6, "right"),
        cell("+/-", 7, "right"),
    ]
    
    const header = box({
        bg: "gray",
        content: headerColumns.join("\t"),
    });

    const setContent = () => {
        const month = new Date(store.data.year, store.selectedMonth);
        const now = new Date();

        const monthSummary = getSummaryOfRange(store.data.days, startOfMonth(month), min(now, endOfMonth(month)));
        const yearSummary = getSummaryOfRange(store.data.days, startOfYear(month), min(now, endOfMonth(month)), store.data.startWith.timeFromYearBefore);

        const monthColumns = [
            cell("Monat", 59, "left"),
            cell(minutesToTime(monthSummary.is), 6, "right"),
            cell(minutesToTime(monthSummary.should), 6, "right"),
            cell(minutesToTime(monthSummary.difference, true), 7, "right"),
        ];

        const yearColumns = [
            cell("Jahr", 59, "left"),
            cell(minutesToTime(yearSummary.is), 6, "right"),
            cell(minutesToTime(yearSummary.should), 6, "right"),
            cell(minutesToTime(yearSummary.difference, true), 7, "right"),
        ]

        const rows = [
            `${summaryToColor(monthSummary)}${monthColumns.join("\t")}`,
            `${summaryToColor( yearSummary)}${yearColumns.join("\t")}`,
        ];

        table.setContent(rows.join("\n"));
    }
    
    const table = box({
        top: 1,
        tags: true,
    });

    setContent();

    eventBus.addListener(EventType.MonthSelected, setContent);
    
    const container = box();

    container.append(header);
    container.append(table);

    return container;
};
