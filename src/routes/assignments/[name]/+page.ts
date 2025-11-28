import type { PageLoad } from './$types';
import type { AssignmentNew } from '$lib/types';

export const load: PageLoad = async ({ fetch, params }) => {
    const name = params.name;
    const res = await fetch(`/api/assignments`);
    const assignments: AssignmentNew[] = await res.json();
    const a = assignments.find((e) => e.name == name);
    return { name, submissions: a?.submissions };
};
