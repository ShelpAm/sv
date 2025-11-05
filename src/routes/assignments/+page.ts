import type { PageLoad } from './$types';
import type { Assignment } from '$lib/types';

export const load: PageLoad = async (event) => {
    const res = await event.fetch('/api/assignments');
    const assignments: Assignment[] = await res.json();

    return { assignments };
};
