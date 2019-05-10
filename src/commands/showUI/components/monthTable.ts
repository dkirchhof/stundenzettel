import { box } from "blessed";

import { monthDetailsTable } from "./monthTable/monthDetailsTable";
import { monthSummaryTable } from "./monthTable/monthSummaryTable";

export const monthTable = () => {
    const container = box({
        top: 3,
        left: 21,
    });

    container.append(monthSummaryTable());
    container.append(monthDetailsTable())

    return container;
};