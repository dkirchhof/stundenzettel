import { EventEmitter } from "events";

export const EventType = {
    MonthSelected: Symbol(),
};

export const eventBus = new EventEmitter();
