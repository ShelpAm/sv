import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { verify_token } from '$lib/api-calls';

export const load: PageServerLoad = async ({ url, cookies, fetch }) => {
    const token = cookies.get('token');

    if (token && await verify_token(token, fetch)) {
        throw redirect(302, '/admin/dashboard');
    }

    return { return_to: url.searchParams.get('return_to') };
};
