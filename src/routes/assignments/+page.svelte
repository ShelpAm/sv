<script lang="ts">
    import AssignmentList from "$lib/assignment-list.svelte";

    var { data } = $props();
</script>

<svelte:head>
    <title>Assignments</title>
</svelte:head>

<a href="/submit">Go Back</a>

<AssignmentList assignments={data.assignments} />
