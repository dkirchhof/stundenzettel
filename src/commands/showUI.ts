import { screen } from "blessed";

import { store } from "../store";
import { header } from "./showUI/components/header";
import { monthSelector } from "./showUI/components/monthSelector";
import { monthTable } from "./showUI/components/monthTable";

export const showUI = () => {
    const myScreen = screen({ 
        title: `Stundenzettel - ${store.data.name} - ${store.data.year}`,
    });
    
    myScreen.append(header());
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
}