export enum Colors {
    Black = "\u001b[30m",
    Red = "\u001b[31m",
    Green = "\u001b[32m",
    Yellow = "\u001b[33m",
    Blue = "\u001b[34m",
    Magenta = "\u001b[35m",
    Cyan = "\u001b[36m",
    White = "\u001b[37m",

    BrightBlack = "\u001b[30;1m",
    BrightRed = "\u001b[31;1m",
    BrightGreen = "\u001b[32;1m",
    BrightYellow = "\u001b[33;1m",
    BrightBlue = "\u001b[34;1m",
    BrightMagenta = "\u001b[35;1m",
    BrightCyan = "\u001b[36;1m",
    BrightWhite = "\u001b[37;1m",

    Reset = "\u001b[0m",
}

export type Alignment = "center" | "left" | "right";

export interface ICell {
    value: string;

    style: { 
        align: Alignment;
        color?: Colors;
    };
}

export type Row = { [k: string]: ICell; };

const alignString = (value: string, width: number, align: Alignment) => {
    switch(align) {
        case "center": return value.padStart(width / 2, " ").padEnd(width / 2, " ");
        case "left": return value.padEnd(width, " ");
        case "right": return value.padStart(width, " ");
    }
};

export const colorizeString = (value: string, color?: Colors) => {
    if(!color) {
        return value;
    }
    
    return `${color}${value}${Colors.Reset}`;
}

export const table = (rows: Row[]) => {
    
    const columnWidths: { [k in keyof Row]: number; } = Object.keys(rows[0])
        .reduce((widths, key) => ({
            ...widths, 
            [key]: Math.max(key.length, ...rows.map(r => r[key].value.length)),
        }), { });

    const printLine = (before: string, between: string, after: string) =>
        console.log(colorizeString(`${before}${Object.values(columnWidths).map(width => "─".repeat(width)).join(between)}${after}`, Colors.Black));

    printLine("┌─", "─┬─", "─┐");

    // header
    console.log([
        colorizeString("│ ", Colors.Black),
        Object.entries(rows[0]).map(([key,value]) => alignString(key, columnWidths[key], value.style.align)).join(colorizeString(" │ ", Colors.Black)),
        colorizeString(" │", Colors.Black),
    ].join(""));

    printLine("├─", "─┼─", "─┤");

    // body
    rows.forEach((row, index, rows) => {
        console.log([
            colorizeString("│ ", Colors.Black),
            Object.entries(row).map(([key,value]) => colorizeString(alignString(value.value, columnWidths[key], value.style.align), value.style.color)).join(colorizeString(" │ ", Colors.Black)),
            colorizeString(" │", Colors.Black),
        ].join(""));

        if(index < rows.length - 1) {
            printLine("├─", "─┼─", "─┤");
        }
    });

    printLine("└─", "─┴─", "─┘");
}
