<script lang="ts">
    import { baseurl } from "$lib/api-calls.js";

    var { data } = $props();

    var assignment_name = $state("");

    const download = async () => {
        // window.location.href = `/api/export?assignment=${assignment}`;

        interface AssignmentExportParam {
            assignment_name: string;
        }

        interface AssignmentExportResult {
            exported_uri: string;
        }

        var param: AssignmentExportParam = {
            assignment_name: assignment_name,
        };
        const res = await fetch(baseurl + "/api/assignments/export", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(param),
        });

        if (!res.ok) {
            alert("Download failed");
            return;
        }

        const result: AssignmentExportResult = await res.json();

        const a = document.createElement("a");
        a.href = result.exported_uri;
        a.download = param.assignment_name + ".tar.zst";
        document.body.appendChild(a);
        a.click();
        a.remove();
    };
</script>

<label for="assignment">Choose the assignment you want to export:</label>
<select id="assignment" name="assignment" bind:value={assignment_name} required>
    {#each data.assignments as a}
        <option value={a.name}>{a.name}</option>
    {/each}
</select>
<button onclick={download}>export</button>
