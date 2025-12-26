<script lang="ts">
    import type { AssignmentNew } from "$lib/types.js";
    import { Format } from "./helpers";

    var { assignments }: { assignments: AssignmentNew[] } = $props();
</script>

<h2>Assignments</h2>

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
        </tr>
    </thead>
    <tbody>
        {#each assignments as a}
            <tr>
                <td><a href="/assignments/{a.name}">{a.name}</a></td>
                <td>{Format(new Date(a.start_time))}</td>
                <td>{Format(new Date(a.end_time))}</td>
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
