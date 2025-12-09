import type { PageLoad } from './$types';
import type { AssignmentNew } from '$lib/types';

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch('/api/assignments');
    const assignments: AssignmentNew[] = await res.json();

    return { assignments };
};
