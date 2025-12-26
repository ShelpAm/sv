import { login } from "$lib/api-calls";
import type { AdminLoginParams } from "$lib/types";
import { json, type RequestHandler } from "@sveltejs/kit";

// Steps to login:
// 1. 调用 C++ 后端验证账号密码
// 2. 设置 HttpOnly Cookie（最安全）
// 3. 返回成功
export const POST: RequestHandler = async ({ request, cookies, fetch }) => {
    const params: AdminLoginParams = await request.json();

    try {
        const result = await login(params.username, params.password, fetch);

        console.log("Setting cookie");
        cookies.set("token", result.token, {
            path: "/",            // 所有路径可访问
            httpOnly: true,       // JS 读不到，防 XSS
            secure: true,         // HTTPS 才能用
            sameSite: "strict",   // 防 CSRF
            maxAge: 60 * 60 * 24 * 7 // 7 天
        });

        return json({ ok: true });
    } catch (e: any) {
        return json({ ok: false }, { status: 401 });
    }

};

