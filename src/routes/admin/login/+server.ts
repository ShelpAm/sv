import type { AdminLoginParams, AdminLoginResult } from "$lib/types";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, cookies, fetch }) => {
    const params: AdminLoginParams = await request.json();

    // 1. 调用 C++ 后端验证账号密码
    const res = await fetch("https://shelpa.me/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    });

    if (!res.ok) {
        return json({ ok: false }, { status: 401 });
    }

    const result: AdminLoginResult = await res.json(); // { token: "xxx" }
    const token = result.token;

    // 2. 设置 HttpOnly Cookie（最安全）
    console.log("Setting cookie");
    cookies.set("token", token, {
        path: "/",            // 所有路径可访问
        httpOnly: true,       // JS 读不到，防 XSS
        secure: true,         // HTTPS 才能用
        sameSite: "strict",   // 防 CSRF
        maxAge: 60 * 60 * 24 * 7 // 7 天
    });

    // 3. 返回成功
    return json({ ok: true });
};

