import type { PageLoad } from "./$types";
import { fetch_assignments } from "$lib/api-call";

export const load: PageLoad = async ({ fetch }) => {
    const assignments = await fetch_assignments(fetch);
    return { assignments };
};
