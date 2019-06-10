import { colorizeString, Colors } from "../utils/formatter";

export function printHelp(commands: Map<string, { description: string; }>) {
    console.log("Usage: stundenzettel command");
    console.log();
    console.log("Commands:")
    
    const maxWidth = Math.max(
        ...Array
            .from(commands.keys())
            .map(key => key.length)
    );

    for(const [key, { description }] of commands.entries()) {
        console.log(`${colorizeString(key.padEnd(maxWidth), Colors.Green)} ${description}`);
    }
}
