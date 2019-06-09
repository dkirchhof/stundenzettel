import chalk from "chalk";
import { Interface, createInterface } from "readline";

interface IQuestion<T> {
    question: string;
    optional?: boolean;
    defaultValue?: string;
    converter?: (s: string) => T;
}

type Questions = { [k: string]: IQuestion<any>; };
type Result<Q extends Questions> = { 
    [k in keyof Q]
        : Q[k] extends IQuestion<string> ? string
        : Q[k] extends IQuestion<infer T> ? T 
        : never; 
};

export const askQuestion = <T>(readlineInterface: Interface, question: IQuestion<T>) => new Promise<string | T>(resolve => {
    const string = question.optional ? `[${question.question}]: ` : `${question.question}: `;
    
    readlineInterface.question(chalk.green(string), answer => {
        if(question.converter) {
            return resolve(question.converter(answer));
        }

        return resolve(answer);
    });

    if(question.defaultValue) {
        readlineInterface.write(question.defaultValue);
    }
});

export const askQuestions = async <T extends Questions>(questions: T) => {
    const readlineInterface = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const answers: any = { };
    
    for(const [key, question] of Object.entries(questions)) {
        answers[key] = await askQuestion(readlineInterface, question);
    }

    readlineInterface.close();

    return answers as Result<T>;
}
