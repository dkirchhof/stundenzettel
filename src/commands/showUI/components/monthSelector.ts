import { box, list } from "blessed";

import { eventBus, EventType } from "../events";
import { store } from "../../../store";
import { getMonthName } from "../utils";

export const monthSelector = () => {
    const header = box({
        content: "Monat",
        bg: "gray",
    });
    
    const listbox = list({
        top: 1,
        items: [
            "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"
        ],
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