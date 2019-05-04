import { eventBus, EventType } from "./events";
import { data } from "./data";

class Store {
    public data = data;
    public selectedMonth = 0;

    public selectMonth(index: number) {
        if(index < 0) {
            index = this.data.months.length - 1;
        } else if(index >= this.data.months.length) {
            index = 0;
        }

        this.selectedMonth = index;
            
        eventBus.emit(EventType.MonthSelected);
    }
};

export const store = new Store();
