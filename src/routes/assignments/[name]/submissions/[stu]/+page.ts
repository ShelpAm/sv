import type { PageLoad } from './$types';
import { fetch_assignments, fetch_students } from '$lib/api-calls';
import type { SubmissionNew } from '$lib/types';

export const load: PageLoad = async ({ fetch, params }) => {
    const assignment_name = params.name;
    const stu = params.stu;

    const assignments = await fetch_assignments(fetch);
    const students = await fetch_students(fetch);
    const a = assignments.find((e) => e.name == assignment_name);
    const s = students.find((e) => e.student_id + e.name == stu);

    let submission: SubmissionNew | undefined;
    if (a == undefined || s == undefined || a.submissions[s.student_id] == undefined) {
        submission = undefined;
    } else {
        submission = a.submissions[s.student_id];
    }

    return { submission };
};
