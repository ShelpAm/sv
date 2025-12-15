import type { PageLoad } from './$types';
import { fetch_assignments, fetch_students } from '$lib/api-calls';

export const load: PageLoad = async ({ fetch, params }) => {
    const name = params.name;
    const assignments = await fetch_assignments(fetch);
    const students = await fetch_students(fetch);
    const a = assignments.find((e) => e.name == name);
    return { name, submissions: a?.submissions, students };
};
