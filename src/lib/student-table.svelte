<script lang="ts">
    import type { Student } from "$lib/types";

    var { students }: { students: Student[] } = $props();
</script>

<table>
    <thead>
        <tr>
            <th>Student ID</th>
            <th>Name</th>
        </tr>
    </thead>
    <tbody>
        {#each students as s}
            <tr>
                <td>{s.student_id}</td>
                <td>{s.name}</td>
            </tr>
        {/each}
    </tbody>
</table>

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
