import * as parseArgs from "minimist";

import { printDay } from "./commands/printDay";
import { setDay } from "./commands/setDay";
import { setHoliday } from "./commands/setHoliday";
import { showUI } from "./commands/showUI";

const args: any = parseArgs(process.argv.slice(2), { 
    alias: {
        // set
        "date"      : "d",
        "start"     : "s",
        "end"       : "e",
        "break"     : "b",
        "holiday"   : "h",

        // set-holiday
        "startDate": "s",
        "endDate"  : "e",
    },
});

// console.log(args);

switch(args._[0]) {
    case "get": {
        printDay(args._[1]);
        break;
    }
    case "set": {
        setDay(args);
        break;
    }
    case "setHoliday": {
        setHoliday(args);
        break;
    }
    default: {
        showUI();
        break;
    }
} 
