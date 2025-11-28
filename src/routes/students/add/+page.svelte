<script lang="ts">
    import type { Student } from "$lib/types.js";

    var success = $state("");
    var student_id = $state("");
    var name = $state("");

    var onsubmit = async () => {
        const stu: Student = {
            student_id: student_id,
            name: name,
        };
        const res = await fetch("/api/students/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(stu),
        });
        if (!res.ok) {
            success = "Failed to add student, see console for details.";
            console.error("Failed to add student: " + (await res.text()));
        } else {
            success = "Successfully added student.";
        }
    };
</script>

<a href="/students">Go Back</a>

<div>
    <div>{success}</div>
    <h3>Add New Student</h3>
    <form {onsubmit}>
        <label for="student_id">Student ID:</label>
        <input id="student_id" type="text" bind:value={student_id} required />

        <label for="name">Student Name:</label>
        <input id="name" type="text" bind:value={name} required />

        <button type="submit">Add Student</button>
    </form>
</div>
