<script lang="ts">
    import StudentList from "$lib/student-list.svelte";

    var { data } = $props();
</script>

<svelte:head>
    <title>Students</title>
</svelte:head>

<a href="/">Go Back</a>

<StudentList students={data.students} />
