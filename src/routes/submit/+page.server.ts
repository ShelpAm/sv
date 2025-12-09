import type { PageLoad } from "./$types";
import type { AssignmentNew } from "$lib/types";

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch("/api/assignments");
    if (!res) {
        throw new Error("Failed to connect to the server");
    }
    if (!res.ok) {
        throw new Error("Failed to get /api/assignments: " + res.status);
    }
    const assignments: AssignmentNew[] = await res.json();

    return { assignments };
};
