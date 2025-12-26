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

/// @return String in the form of 2025-12-22 11:42:07
export function Format(date: Date) {
    const y = date.getFullYear()
    const m = date.getMonth() + 1 // 0-indexed
    const d = date.getDate()

    const h = date.getHours()
    const M = date.getMinutes()
    const s = date.getSeconds()

    const pad = (n: number) => n.toString().padStart(2, '0')

    return `${y}-${pad(m)}-${pad(d)} ${pad(h)}:${pad(M)}:${pad(s)}`
}
