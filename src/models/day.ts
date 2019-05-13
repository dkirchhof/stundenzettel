export interface IDay {
    date: string;
    should: number;

    start?: number;
    end?: number;
    break?: number;
    holiday?: number;
    sick?: number;
    comment?: string;
}
