import { promises as fs } from "fs";
import { join } from "path";

export function isUndefined(...args: any[]) {
    return args.some(a => a === undefined);
}

export async function readData() {
    const fileContent = await fs.readFile(join(__dirname, "../../data.json"), "utf-8");

    return JSON.parse(fileContent);
}

export async function writeData(data: any) {
    const json = JSON.stringify(data, null, 4);

    await fs.writeFile(join(__dirname, "../../data.json"), json);
}

export function assignDefinedProperties<S extends any>(target: any, source: S, properties: (keyof S)[]) {
    properties.forEach(p => {
        if(source[p] !== undefined) {
            if(source[p] === "null") {
                delete target[p];
            } else {
                target[p] = source[p];
            }
        }
    });

    return target;
}
