import { fetch_assignments } from "$lib/api-calls";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
    const assignments = await fetch_assignments(fetch);
    return { assignments };
};
