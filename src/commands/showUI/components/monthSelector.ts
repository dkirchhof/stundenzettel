import { box, list } from "blessed";

import { eventBus, EventType } from "../events";
import { store } from "../../../store";
import { getMonthName } from "../utils";

export const monthSelector = () => {
    const header = box({
        content: "Monat",
        bg: "gray",
    });
    
    const items = store.data.months.map((_, i) => getMonthName(i));
    
    const listbox = list({
        top: 1,
        items,
        style: { 
            selected: {
                bg: "blue",
            }
        }
    });

    listbox.select(store.selectedMonth);

    eventBus.addListener(EventType.MonthSelected, () => listbox.select(store.selectedMonth));

    const container = box({
        top: 3,
        width: 20,
    });
    
    container.append(header);
    container.append(listbox);

    return container;
}