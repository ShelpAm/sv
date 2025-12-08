// src/routes/+layout.server.js
import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';
import type { LayoutServerLoad } from './$types';
import { verify_token } from '$lib/helpers';

const admin_pages = new Set(["/assignments/add", "/assignments/export", "/students/add", "/admin/dashboard"]);

export const load: LayoutServerLoad = async ({ url, cookies, fetch }) => {
    const token = cookies.get('token');

    if (await verify_token(token ?? "", fetch)) {
        console.log("Verified token: " + token);
    } else {
        if (url.pathname == '/admin/login') {
            return
        }
        if (admin_pages.has(url.pathname)) {
            throw redirect(302, '/admin/login?return_to=' + url.pathname);
        }
    }
};
