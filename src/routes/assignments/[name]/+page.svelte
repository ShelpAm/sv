<script lang="ts">
    var { data } = $props();
</script>

<a href="/assignments">Go Back</a>

<h2>Submissions for {data.name}</h2>

<table class="file-table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Last Modified</th>
            <!-- <th>Download</th> -->
        </tr>
    </thead>
    <tbody>
        {#each data.submissions as file}
            <tr>
                <td>{file.Name}</td>
                <td>{new Date(file.LastModified).toLocaleString()}</td>
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

<p>Totally {data.submissions.length} files.</p>

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
