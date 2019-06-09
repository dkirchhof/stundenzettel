import { box } from "blessed";

import { store } from "../../../store";
import { getHolidaySummary, table, minutesToTime } from "../utils";

export const header = () => {
    
    const summary = getHolidaySummary(store.data);

    const isInDays = summary.is/store.data.minutesPerDay;
    const shouldInDays = summary.should/store.data.minutesPerDay;

    const t = table([
        [
            { value: "Stundenzettel    ", align: "left" },
            { value: "Jahr", align: "right" },
            { value: "Vorjahr", align: "right" },
            { value: "Zeit/Tag", align: "right" },
            { value: "Urlaub", align: "right" },
        ],
        [
            { value: store.data.name, align: "left" },
            { value: store.data.year, align: "right" },
            { value: minutesToTime(store.data.holiday.deltaFromYearBefore, true), align: "right" },
            { value: minutesToTime(store.data.minutesPerDay), align: "right" },
            { value: `${isInDays}/${shouldInDays}`, align: "right" },
        ]
    ])
  
    const header = box({
        content: t[0].join("\t"),
        bg: "gray",
    });

    const body = box({
        content: t[1].join("\t"),
        top: 1,
        tags: true,
    });

    const container = box();

    container.append(header);
    container.append(body);

    return container;
};
