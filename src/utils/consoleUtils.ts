import chalk from "chalk";
import { Interface, createInterface } from "readline";

export const askQuestion = (readlineInterface: Interface, question: string) => new Promise<string>(resolve => {
    readlineInterface.question(chalk.green(`${question} `), resolve);
});

export const askQuestions = async <T extends { [k: string]: string; }>(questions: T) => {
    const readlineInterface = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const answers = { };
    
    for(const [key, question] of Object.entries(questions)) {
        answers[key] = await askQuestion(readlineInterface, question);
    }

    readlineInterface.close();

    return answers as T;
}
