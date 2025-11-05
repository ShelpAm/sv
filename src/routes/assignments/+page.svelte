<script lang="ts">
    var { data } = $props();
</script>

<a href="/submit">Go Back</a>

<h2>Assignments</h2>

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Begin</th>
            <th>End</th>
        </tr>
    </thead>
    <tbody>
        {#each data.assignments as a}
            <tr>
                <td><a href="/assignments/{a.Name}">{a.Name}</a></td>
                <td>{new Date(a.BeginTime).toLocaleString()}</td>
                <td>{new Date(a.EndTime).toLocaleString()}</td>
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
