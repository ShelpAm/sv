<script lang="ts">
    import StudentTable from "$lib/student-table.svelte";
    import type { Student } from "$lib/types.js";

    var { data } = $props();

    var success = $state("");
    var student_id = $state("");
    var name = $state("");
    var import_status = $state("");
    var imported_files: FileList | null = $state(null);
    var students_to_import: Student[] = $state([]);

    var parse_csv_to_student = (content: string) => {
        // 202326xxxxx,xyz
        console.log("File content:\n" + content);
        const lines = content.split("\n");
        var students: Student[] = [];
        lines.forEach((line) => {
            if (line.length == 0) {
                return;
            }
            console.log("line: " + line);
            const row = line.split(",");
            console.log("row: " + row);
            if (row.length != 2) {
                throw new Error("Bad file format");
            }
            const stu: Student = { student_id: row[0], name: row[1] };
            students.push(stu);
        });
        return students;
    };

    $effect(() => {
        if (imported_files) {
            Object.values(imported_files).forEach((file) => {
                file.text().then((content) => {
                    try {
                        students_to_import = students_to_import.concat(
                            parse_csv_to_student(content),
                        );
                    } catch (e) {
                        console.error("Error parsing CSV file:", e);
                        import_status = "Error parsing CSV file: " + e;
                    }
                });
            });
        }
    });

    var submit_student = async (stu: Student) => {
        const res = await fetch("/api/students/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(stu),
        });
        if (!res.ok) {
            success = "Failed to add student, see console for details.";
            throw new Error("Failed to add student: " + (await res.text()));
        } else {
            success = "Successfully added student.";
        }
    };

    var onsubmit = async (e: Event) => {
        e.preventDefault();
        const stu: Student = {
            student_id: student_id,
            name: name,
        };
        submit_student(stu);
    };

    var import_onsubmit = async (e: Event) => {
        e.preventDefault();
        students_to_import.forEach((stu) => submit_student(stu));
    };
</script>

<a href="/students">Go Back</a>

<div>{success}</div>

<div>
    <h2>Add New Student</h2>
    <form {onsubmit}>
        <label for="student_id">Student ID:</label>
        <input id="student_id" type="text" bind:value={student_id} required />

        <label for="name">Student Name:</label>
        <input id="name" type="text" bind:value={name} required />

        <button type="submit">Add Student</button>
    </form>
</div>

<div>
    <h2>Import New Student(s)</h2>
    <form onsubmit={import_onsubmit}>
        <p>Your submitted file should satisfy the following requirements:</p>
        <ul>
            <li>
                File format: csv, where the first column is student id and the
                second column is student name.
            </li>
        </ul>
        <label for="imported_files">Imported file(s):</label>
        <input
            id="imported_files"
            type="file"
            bind:files={imported_files}
            multiple
            required
        />

        <button type="submit">Import</button>
    </form>
    <div>{import_status}</div>
    <h3>Preview of students to import</h3>
    {#if imported_files?.length != 0}
        <StudentTable students={students_to_import} />
    {/if}
    {#if imported_files?.length == 0}
        You haven't selected any file.
    {/if}
</div>

<h2>Students</h2>
<StudentTable students={data.students} />
