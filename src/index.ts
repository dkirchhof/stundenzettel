import { printDay } from "./commands/printDay";
import { setDay } from "./commands/setDay";
import { setHoliday } from "./commands/setHoliday";
import { createConfig } from "./commands/createConfig";
import { createSheet } from "./commands/createSheet";
import { setPublicHoliday } from "./commands/setPublicHoliday";
import { printMonth } from "./commands/printMonth";
import { printYear } from "./commands/printYear";
import { printHolidays } from "./commands/printHolidays";

switch(process.argv[2]) {
    case "create-config": {
        createConfig();
        break;
    }
    case "create-sheet": {
        createSheet();
        break;
    }
    case "print-day": {
        printDay();
        break;
    }
    case "print-month": {
        printMonth();
        break;
    }
    case "print-year": {
        printYear();
        break;
    }
    case "print-holidays": {
        printHolidays();
        break;
    }
    case "set-day": {
        setDay();
        break;
    }
    case "set-holiday": {
        setHoliday();
        break;
    }
    case "set-public-holiday": {
        setPublicHoliday();
        break;
    }
    default: {
        // showUI();
        break;
    }
} 
