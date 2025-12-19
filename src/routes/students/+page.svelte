<script lang="ts">
    import StudentTable from "$lib/student-table.svelte";

    var { data } = $props();
</script>

<svelte:head>
    <title>Students</title>
</svelte:head>

<a href="/">Go Back</a>

<h2>Students</h2>
<StudentTable students={data.students} />

<p>Totally {Object.entries(data.students).length} students.</p>
