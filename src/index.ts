import { screen } from "blessed";

import { header } from "./components/header";
import { holidayTable } from "./components/holidayTable";
import { monthSelector } from "./components/monthSelector";
import { monthTable } from "./components/monthTable";
import { store } from "./store";
import { getTitle } from "./utils";

const myScreen = screen({ 
    title: getTitle(store.data),
});

myScreen.append(header());
myScreen.append(holidayTable());
myScreen.append(monthSelector());
myScreen.append(monthTable());

myScreen.key(["escape", "q", "C-c"], () => {
    process.exit(0);
});

myScreen.key(["down", "j"], () => {
    store.selectMonth(store.selectedMonth + 1);
    myScreen.render();
});

myScreen.key(["up", "k"], () => {
    store.selectMonth(store.selectedMonth - 1);
    myScreen.render();
});

myScreen.render();