<script lang="ts">
    var { data } = $props();

    var assignment_name = $state("");

    const download = async () => {
        // window.location.href = `/api/export?assignment=${assignment}`;

        interface AssignmentExportParam {
            assignment_name: string;
        }

        var param: AssignmentExportParam = {
            assignment_name: assignment_name,
        };
        const res = await fetch("/api/assignments/export", {
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

        const blob = await res.blob();

        // Create a temporary download link
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = assignment_name + ".tar.zst";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };
</script>

<label for="assignment">Choose the assignment you want to export:</label>
<select id="assignment" name="assignment" bind:value={assignment_name} required>
    {#each data.assignments as a}
        <option value={a.name}>{a.name}</option>
    {/each}
</select>
<button onclick={download}>export</button>
