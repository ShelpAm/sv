<script lang="ts">
    var { data } = $props();
</script>

<a href="/assignments">Go Back</a>

<svelte:head>
    <title>Submissions for {data.name}</title>
</svelte:head>

{#if data.submissions != undefined}
    <h2>Submissions for {data.name}</h2>

    <table class="file-table">
        <thead>
            <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Last Modified at</th>
                <!-- <th>Download</th> -->
            </tr>
        </thead>
        <tbody>
            {#each Object.entries(data.submissions) as [_, s]}
                <tr>
                    <td>{s.student_id}</td>
                    <td
                        >{data.students.find(
                            (e) => s.student_id == e.student_id,
                        )?.name}</td
                    >
                    <td>{new Date(s.submission_time).toLocaleString()}</td>
                    <!-- <td> -->
                    <!--     <a -->
                    <!--         href={`/home/homeworks/${data.name}/${file.Name}`} -->
                    <!--         target="_blank" -->
                    <!--     > -->
                    <!--         Download -->
                    <!--     </a> -->
                    <!-- </td> -->
                </tr>
            {/each}
        </tbody>
    </table>

    <p>Totally {Object.entries(data.submissions).length} files.</p>
{/if}

<style>
    table {
        border-collapse: collapse;
        /* ✅ 不再强行占满宽度 */
        margin-top: 10px;
    }

    th,
    td {
        border: 1px solid #ddd;
        padding: 6px 12px; /* ✅ 空隙够了 */
        text-align: left;
        white-space: nowrap; /* ✅ 防止时间换行变丑 */
    }

    th {
        background-color: #f5f5f5;
        font-weight: bold;
    }

    tr:nth-child(even) {
        background-color: #fafafa;
    }
</style>
