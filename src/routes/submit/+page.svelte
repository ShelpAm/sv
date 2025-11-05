<script lang="ts">
    import { goto } from "$app/navigation";
    import type { ProcessHomeworkResult } from "$lib/types";

    var { data } = $props();

    let username = $state("");
    let schoolId = $state("");
    let assignmentName = $state("");
    let file: File | null = null;

    // 提交文件
    async function submitHomework(e: SubmitEvent) {
        e.preventDefault();

        if (!file) {
            alert("请先选择一个文件");
            return;
        }

        const formData = new FormData();
        formData.append("homework", file);
        formData.append("username", username);
        formData.append("schoolId", schoolId);
        formData.append("assignmentName", assignmentName);

        const res = await fetch("/api/process-homework", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            alert("提交失败: " + (await res.text()));
            return;
        }

        const processRes: ProcessHomeworkResult = await res.json();
        alert(
            `Uploading your homework, please wait. (ID: ${processRes.TaskId})`,
        );

        // 轮询进度
        let done = false;
        const fd = new FormData();
        fd.append("taskId", processRes.TaskId);
        const timer = setInterval(async () => {
            const r = await fetch("/api/progress", {
                method: "POST",
                body: fd,
            });
            const progress = parseFloat(await r.text());
            if (progress === 1) {
                clearInterval(timer);
                alert("Your homework has been successfully submitted!");
                done = true;
            }
        }, 500);

        setTimeout(() => {
            if (!done) clearInterval(timer);
        }, 60000);
    }
</script>

<div id="wrapper">
    <div class="container">
        <h1>提交作业</h1>

        <form onsubmit={submitHomework}>
            <div class="form-group">
                <label for="assignmentName">作业:</label>
                <select
                    id="assignmentName"
                    bind:value={assignmentName}
                    required
                >
                    <option value="">请选择作业</option>
                    {#each data.assignments as a}
                        <option
                            value={a.Name}
                            disabled={new Date() < new Date(a.BeginTime) ||
                                new Date() > new Date(a.EndTime)}
                        >
                            {a.Name === "五个一" ? "数据库" : a.Name}
                            ({new Date(a.BeginTime).toLocaleDateString()} - {new Date(
                                a.EndTime,
                            ).toLocaleDateString()})
                            {new Date() < new Date(a.BeginTime) ||
                            new Date() > new Date(a.EndTime)
                                ? " ❌已关闭"
                                : ""}
                        </option>
                    {/each}
                </select>
            </div>

            <div class="form-group">
                <label for="username">姓名:</label>
                <input
                    id="username"
                    type="text"
                    bind:value={username}
                    required
                />
            </div>

            <div class="form-group">
                <label for="schoolId">学号:</label>
                <input
                    id="schoolId"
                    type="text"
                    bind:value={schoolId}
                    required
                />
            </div>

            <div class="form-group">
                <label for="file">选择文件:</label>
                <input
                    id="file"
                    type="file"
                    onchange={(e) =>
                        (file =
                            (e.target as HTMLInputElement).files?.[0] ?? null)}
                    required
                />
            </div>

            <div class="buttons form-group">
                <button type="submit" class="button">提交</button>
                <button
                    type="button"
                    class="button-green"
                    onclick={() => {
                        goto("/assignments");
                    }}>提交情况</button
                >
            </div>
        </form>
    </div>
</div>

<style>
    #wrapper {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
        color: #495057;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
    }

    .container {
        background: #ffffff;
        padding: 40px;
        border-radius: 16px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        max-width: 500px;
        width: 100%;
        text-align: center;
        border: 1px solid #dee2e6;
    }

    h1 {
        margin-bottom: 20px;
        color: #343a40;
        font-size: 26px;
        font-weight: 600;
    }

    .form-group {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
    }

    label {
        font-size: 15px;
        color: #6c757d;
        font-weight: 500;
        margin-right: 0px;
        /* 添加右边距 */
        flex: 0.4;
        /* 使标签占据一定空间 */
    }

    select,
    input[type="text"],
    input[type="file"] {
        padding: 14px;
        font-size: 16px;
        border: 1px solid #ced4da;
        border-radius: 8px;
        flex: 2;
        /* 使输入框占据更多空间 */
    }

    .buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }

    .button {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 14px 28px;
        border-radius: 8px;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        transition:
            background-color 0.3s,
            transform 0.2s,
            box-shadow 0.2s;
    }

    .button:hover {
        background-color: #0056b3;
        transform: scale(1.05);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .button:active {
        background-color: #004085;
        transform: scale(1);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .button-green {
        background-color: #28a745;
        /* 绿色 */
        color: #fff;
        border: none;
        padding: 14px 28px;
        border-radius: 8px;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        transition:
            background-color 0.3s,
            transform 0.2s,
            box-shadow 0.2s;
    }

    .button-green:hover {
        background-color: #218838;
        transform: scale(1.05);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .button-green:active {
        background-color: #1e7e34;
        transform: scale(1);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
</style>
