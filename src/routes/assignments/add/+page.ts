import type { PageLoad } from './$types';
import type { AssignmentNew } from '$lib/types';
import { baseurl } from '$lib/api-calls';

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch(baseurl + '/api/assignments');
    const assignments: AssignmentNew[] = await res.json();

    return { assignments };
};
