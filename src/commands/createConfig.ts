import { isAbsolute } from "path";

import { CONFIG_PATH, IConfig, saveConfig } from "../config";
import { askQuestions } from "../utils/consoleUtils";
import { mkdirRecursive } from "../utils/fsUtils";

export async function createConfig() {
    const answers = await askQuestions({
        path: {
            question: "Absolute path:",
        },
    });

    if(!isAbsolute(answers.path)) {
        throw new Error("Path should be absolute");
    }

    const config: IConfig = {
        ...answers,
    };

    await mkdirRecursive(config.path);
    await saveConfig(config);

    console.log(`Created config in ${CONFIG_PATH}`);
}
