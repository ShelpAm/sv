interface AdminVerifyTokenResult {
    ok: boolean
};

export function EncodeBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            // 去掉前缀 "data:xxx;base64," 只保留纯 base64 字符串
            resolve(result.split(',')[1]);
        };
        reader.onerror = () => reject(new Error("文件读取失败"));
        reader.readAsDataURL(file);
    });
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
