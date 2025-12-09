import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { verify_token } from '$lib/helpers';

const admin_pages = new Set(["/assignments/add", "/assignments/export", "/students/add", "/admin/dashboard"]);

export const load: LayoutServerLoad = async ({ url, cookies, fetch }) => {
    // If user visiting sensitive pages, check token.
    if (url.pathname == '/admin/login') {
        return
    }
    if (!admin_pages.has(url.pathname)) {
        return
    }

    const token = cookies.get("token");
    console.log("Verifying token before any page loading: " + token);
    if (await verify_token(token ?? "", fetch)) {
        console.log("Verification passed.");
    } else {
        console.log("Verification failed. Redirecting to /admin/login");
        throw redirect(302, '/admin/login?return_to=' + url.pathname);
    }
};
