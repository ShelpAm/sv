<script lang="ts">
    import "./new.css";
    import type {
        /* ProcessHomeworkResult, */ SubmitRequest,
    } from "$lib/types";
    import { EncodeBase64 } from "$lib/helpers";

    var { data } = $props();

    let username = $state("");
    let schoolId = $state("");
    let assignmentName = $state("");
    var file: FileList | null = $state(null);

    // 提交文件
    async function submitHomework(e: SubmitEvent) {
        e.preventDefault();

        if (!file) {
            alert("请先选择一个文件");
            return;
        }

        var sr: SubmitRequest = {
            student_id: schoolId,
            student_name: username,
            assignment_name: assignmentName,
            file: {
                filename: file[0].name,
                content: await EncodeBase64(file[0]),
            },
        };
        const res = await fetch("/api/assignments/submit", {
            method: "POST",
            body: JSON.stringify(sr),
        });
        if (!res.ok) {
            alert("提交失败: " + (await res.text()));
            return;
        }
        alert("Your homework has been successfully submitted!");

        // const formData = new FormData();
        // formData.append("homework", file);
        // formData.append("username", username);
        // formData.append("schoolId", schoolId);
        // formData.append("assignmentName", assignmentName);
        //
        // const res = await fetch("/api/process-homework", {
        //     method: "POST",
        //     body: formData,
        // });
        //
        // if (!res.ok) {
        //     alert("提交失败: " + (await res.text()));
        //     return;
        // }
        //
        // const processRes: ProcessHomeworkResult = await res.json();
        // alert(
        //     `Uploading your homework, please wait. (ID: ${processRes.TaskId})`,
        // );
        //
        // // 轮询进度
        // let done = false;
        // const fd = new FormData();
        // fd.append("taskId", processRes.TaskId);
        // const timer = setInterval(async () => {
        //     const r = await fetch("/api/progress", {
        //         method: "POST",
        //         body: fd,
        //     });
        //     const progress = parseFloat(await r.text());
        //     if (progress === 1) {
        //         clearInterval(timer);
        //         alert("Your homework has been successfully submitted!");
        //         done = true;
        //     }
        // }, 500);
        //
        // setTimeout(() => {
        //     if (!done) clearInterval(timer);
        // }, 60000);
    }
</script>

<svelte:head>
    <title>Submit My Homework</title>
</svelte:head>

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
                        {@const value = a.name}
                        {@const now = new Date()}
                        {@const disabled =
                            now < new Date(a.start_time) ||
                            now > new Date(a.end_time)}
                        {@const status =
                            now < new Date(a.start_time)
                                ? "未开始"
                                : now > new Date(a.end_time)
                                  ? "已逾期"
                                  : ""}
                        <option {value} {disabled}>
                            {a.name}
                            {new Date(a.start_time).toLocaleString()} -
                            {new Date(a.end_time).toLocaleString()}
                            {status}
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
                <input id="file" type="file" bind:files={file} required />
            </div>

            <div class="buttons form-group">
                <button type="submit" class="button">提交</button>
                <a href="/assignments" class="button-green">提交情况</a>
                <!-- <button -->
                <!--     type="button" -->
                <!--     class="button-green" -->
                <!--     onclick={() => { -->
                <!--         goto("/assignments"); -->
                <!--     }}>提交情况</button -->
                <!-- > -->
            </div>
        </form>
    </div>
</div>
