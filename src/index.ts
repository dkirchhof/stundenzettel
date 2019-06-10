import { printDay } from "./commands/printDay";
import { setDay } from "./commands/setDay";
import { setHoliday } from "./commands/setHoliday";
import { createConfig } from "./commands/createConfig";
import { createSheet } from "./commands/createSheet";
import { setPublicHoliday } from "./commands/setPublicHoliday";
import { printMonth } from "./commands/printMonth";
import { printYear } from "./commands/printYear";
import { printHolidays } from "./commands/printHolidays";
import { printHelp } from "./commands/printHelp";

const commands = new Map([
    ["create-config", { 
        command: createConfig, 
        description: "Creates a config file to your home directory.",
    }],
    ["create-sheet", { 
        command: createSheet, 
        description: "Creates a new sheet for a specific year.",
    }],
    ["print-day", { 
        command: printDay, 
        description: "Outputs a given date.",
    }],
    ["print-month", { 
        command: printMonth, 
        description: "Outputs a given month.",
    }],
    ["print-year", { 
        command: printYear, 
        description: "Outputs a given year.",
    }],
    ["print-holidays", { 
        command: printHolidays, 
        description: "Lists all days of vacation and remaining holiday entitlement.",
    }],
    ["set-day", { 
        command: setDay, 
        description: "Sets the data of a specific day.",
    }],
    ["set-holiday", { 
        command: setHoliday, 
        description: "Marks all working days between a specific range as holiday.",
    }],
    ["set-public-holiday", { 
        command: setPublicHoliday, 
        description: "Sets the should time of a specific date to zero. It doesn't count to the holiday entitlement.",
    }],
]);

const command = commands.get(process.argv[2]);

if(command) {
    command.command();
} else {
    printHelp(commands);
}
