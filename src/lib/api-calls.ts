import type { AssignmentNew, Student } from "./types";

async function template_get<T>(url: string, fetch?: any) {
    const res = await fetch(url);

    if (!res) {
        throw new Error("Failed to connect to the server");
    }

    if (!res.ok) {
        throw new Error(`Failed to get ${url}: ${res.status}`);
    }

    const result: T = await res.json();
    return result;
}

export async function fetch_assignments(fetch?: any) {
    const url = "https://shelpa.me/api/assignments";
    return await template_get<AssignmentNew[]>(url, fetch);
}

export async function fetch_students(fetch?: any) {
    const url = "https://shelpa.me/api/assignments";
    return await template_get<Student[]>(url, fetch);
}
