import { box } from "blessed";

import { store } from "../../../../store";
import { minutesToTime, summaryToColor, formatDate, getSummaryOfDay, cell, getDaysOfMonth } from "../../utils";
import { eventBus, EventType } from "../../events";
import { IDay } from "../../../../models/day";

export const monthDetailsTable = () => {
    const headerColumns = [
        cell("Tag", 14, "left"),
        cell("Start", 5, "right"),
        cell("Ende", 5, "right"),
        cell("Pause", 5, "right"),
        cell("Urlaub", 5, "right"),
        cell("Krank", 5, "right"),
        cell("Ist", 5, "right"),
        cell("Soll", 6, "right"),
        cell("+/-", 7, "right"),
        "Anmerkung",
    ]
    
    const header = box({
        bg: "gray",
        content: headerColumns.join("\t"),
    });
    
    const dayToRow = (day: IDay) => {
        const summary = getSummaryOfDay(day);
        
        const columns = [
            cell(formatDate(new Date(day.date)), 14, "left"),
            cell(minutesToTime(day.start), 5, "right"),
            cell(minutesToTime(day.end), 5, "right"),
            cell(minutesToTime(day.break), 5, "right"),
            cell(minutesToTime(day.holiday), 6, "right"),
            cell(minutesToTime(day.sick), 5, "right"),
            cell(minutesToTime(summary.is), 5, "right"),
            cell(minutesToTime(summary.should), 6, "right"),
            cell(minutesToTime(summary.difference, true), 7, "right"),
            day.comment
        ];

        return `${summaryToColor(summary)}${columns.join("\t")}`;
    }

    const setContent = () => {
        const rows = getDaysOfMonth(store.data.days, new Date(store.data.year, store.selectedMonth)).map(dayToRow);
        
        table.setContent(rows.join("\n"));
    }

    const table = box({
        top: 1,
        tags: true,
    });

    table.focus();
 
    setContent();

    eventBus.addListener(EventType.MonthSelected, setContent);

    const container = box({
        top: 4,
    });

    container.append(header);
    container.append(table);

    return container;
};
