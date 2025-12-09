import type { PageLoad } from './$types';
import type { Student } from '$lib/types';

export const load: PageLoad = async (event) => {
    const res = await event.fetch('/api/students');
    const students: Student[] = await res.json();

    return { students };
};
