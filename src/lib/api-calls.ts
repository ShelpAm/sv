import type { AdminLoginParams, AdminLoginResult, AdminVerifyTokenResult, AssignmentNew, Student } from "./types";

async function template_get<T>(url: string, fetch_impl?: typeof fetch) {
    const f = fetch_impl ?? fetch;
    const res = await f(url);

    if (!res) {
        throw new Error("Failed to connect to the server");
    }

    if (!res.ok) {
        throw new Error(`Failed to GET ${url}: ${res.status}`);
    }

    const result: T = await res.json();
    return result;
}

async function template_post<T>(url: string, body: any, fetch_impl?: typeof fetch) {
    const f = fetch_impl ?? fetch;
    const res = await f(url, {
        method: "POST",
        body: JSON.stringify(body)
    });

    if (!res) {
        throw new Error("Failed to connect to the server");
    }

    if (!res.ok) {
        throw new Error(`Failed to POST ${url}: ${res.status}`);
    }

    const result: T = await res.json();
    return result;
}

export const baseurl = "https://shelpa.me";
// export const baseurl = "http://localhost";

export async function fetch_assignments(fetch_impl?: typeof fetch) {
    const url = baseurl + "/api/assignments";
    return await template_get<AssignmentNew[]>(url, fetch_impl);
}

export async function fetch_students(fetch_impl?: any) {
    const url = baseurl + "/api/students";
    return await template_get<Student[]>(url, fetch_impl);
}

export async function verify_token(token: string, fetch_impl?: any) {
    const url = baseurl + '/api/admin/verify-token';
    const res = await template_post<AdminVerifyTokenResult>(url, {
        token: token ?? ""
    }, fetch_impl);

    if (!res) {
        throw new Error("Could not connect to server");
    }

    return res.ok;
}

export async function login(username: string, password: string, fetch_impl?: any) {
    const url = baseurl + "/api/admin/login";

    const params: AdminLoginParams = { username, password };
    return await template_post<AdminLoginResult>(url, params, fetch_impl);
}
