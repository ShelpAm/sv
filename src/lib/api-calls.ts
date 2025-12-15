import type { AdminVerifyTokenResult, AssignmentNew, Student } from "./types";

async function template_get<T>(url: string, fetch_impl?: typeof fetch) {
    const f = fetch_impl ?? fetch;
    const res = await f(url);

    if (!res) {
        throw new Error("Failed to connect to the server");
    }

    if (!res.ok) {
        throw new Error(`Failed to get ${url}: ${res.status}`);
    }

    const result: T = await res.json();
    return result;
}

// export const baseurl = "https://shelpa.me";
export const baseurl = "http://localhost";

export async function fetch_assignments(fetch_impl?: typeof fetch) {
    const url = baseurl + "/api/assignments";
    return await template_get<AssignmentNew[]>(url, fetch_impl);
}

export async function fetch_students(fetch_impl?: any) {
    const url = baseurl + "/api/students";
    return await template_get<Student[]>(url, fetch_impl);
}


export async function verify_token(token: string, fetch_impl?: any) {
    const f = fetch_impl ?? fetch;
    const res = await f('/api/admin/verify-token', {
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
