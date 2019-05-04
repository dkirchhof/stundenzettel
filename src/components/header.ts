import { box } from "blessed";

import { store } from "../store";
import { getTitle } from "../utils";

export const header = () => box({
    content: getTitle(store.data),
    bg: "gray",
    height: 1,
});
