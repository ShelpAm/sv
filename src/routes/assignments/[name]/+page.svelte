<script lang="ts">
    import SubmissionList from "$lib/submission-list.svelte";

    var { data } = $props();
</script>

<a href="/assignments">Go Back</a>

<svelte:head>
    <title>Submissions for {data.name}</title>
</svelte:head>

{#if data.submissions}
    <SubmissionList
        name={data.name}
        submissions={data.submissions}
        students={data.students}
    />

    <!-- If is teacher, show grading page -->
{:else}
    Coundn't find such assignment named {data.name}.
{/if}
