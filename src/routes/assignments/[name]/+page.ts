import type { PageLoad } from './$types';
import type { Submission } from '$lib/types';

export const load: PageLoad = async (event) => {
    const name = event.params.name;
    const res = await event.fetch(`/api/submissions?AssignmentName=${encodeURIComponent(name)}`);
    const submissions: Submission[] = await res.json();
    return { name, submissions };
};
