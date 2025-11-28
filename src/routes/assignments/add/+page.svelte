<script lang="ts">
    import type { AssignmentNew } from "$lib/types.js";
    import AssignmentList from "$lib/assignment-list.svelte";

    var { data } = $props();

    var success = $state("");
    var name = $state("");
    var start_time = $state("");
    var end_time = $state("");

    var onsubmit = async () => {
        const res = await fetch("/api/assignments/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                start_time: new Date(start_time).toISOString(),
                end_time: new Date(end_time).toISOString(),
                submissions: {},
            }),
        });
        if (!res.ok) {
            success = "Failed to add assignment, see console for details.";
            console.error("Failed to add assignment: " + (await res.text()));
        } else {
            success = "Successfully added assignment.";
        }
    };
</script>

<a href="/assignments">Go Back</a>

<div>
    <div>{success}</div>
    <h3>Add New Assignment</h3>
    <form {onsubmit}>
        <label for="name">Assignment Name:</label>
        <input id="name" type="text" bind:value={name} required />

        <label for="start_time">Start Time:</label>
        <input
            id="start_time"
            type="datetime-local"
            bind:value={start_time}
            required
        />

        <label for="end_time">End Time:</label>
        <input
            id="end_time"
            type="datetime-local"
            bind:value={end_time}
            required
        />

        <button type="submit">Add Assignment</button>
    </form>
</div>

<AssignmentList assignments={data.assignments} />
