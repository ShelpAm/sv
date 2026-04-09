import type { PageLoad } from './$types';
import type { Student } from '$lib/types';
import { baseurl } from '$lib/api-calls';

export const load: PageLoad = async (event) => {
    const res = await event.fetch(baseurl + '/api/students');
    const students: Student[] = await res.json();

    return { students };
};
