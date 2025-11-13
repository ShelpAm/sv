<script lang="ts">
    var { data } = $props();

    var assignment = $state("");

    const download = async () => {
        window.location.href = `/api/export?assignment=${assignment}`;
    };
</script>

<label for="assignment">Choose the assignment you want to export:</label>
<select id="assignment" name="assignment" bind:value={assignment} required>
    {#each data.assignments as a}
        <option value={a.Name}>{a.Name}</option>
    {/each}
</select>
<button onclick={download}>export</button>
