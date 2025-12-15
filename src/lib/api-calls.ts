import type { AdminVerifyTokenResult, AssignmentNew, Student } from "./types";

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

export const baseurl = "https://shelpa.me";
// export const baseurl = "http://localhost";

export async function fetch_assignments(fetch?: any) {
    const url = baseurl + "/api/assignments";
    return await template_get<AssignmentNew[]>(url, fetch);
}

export async function fetch_students(fetch?: any) {
    const url = baseurl + "/api/students";
    return await template_get<Student[]>(url, fetch);
}


export async function verify_token(token: string, fetch?: any) {
    const res = await fetch('/api/admin/verify-token', {
        method: "POST",
        body: JSON.stringify({
            token: token ?? ""
        })
    });

    if (!res) {
        throw new Error("Could not connect to server");
    }

    return res.ok && (await res.json() as AdminVerifyTokenResult).ok;
}
