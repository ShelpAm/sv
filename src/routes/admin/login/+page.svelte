<script lang="ts">
    import { goto } from "$app/navigation";
    import type { AdminLoginParams } from "$lib/types";

    var { data } = $props();

    var username = $state("");
    var password = $state("");

    async function submit(e: Event) {
        e.preventDefault();
        const params: AdminLoginParams = {
            username: username,
            password: password,
        };

        const res = await fetch("/admin/login", {
            method: "POST",
            body: JSON.stringify(params),
        });

        if (!res) {
            alert("Could not connect to server");
            console.error("Could not connect to server");
        }

        if (!res.ok) {
            const err = await res.text();
            alert("An error occurred: " + err + " See details in console");
            console.error(err);
            return;
        }

        console.log("Login ok");
        // ok
        if (data.return_to) {
            console.log("Redirecting to " + data.return_to);
            goto(data.return_to);
        } else {
            console.log("Redirecting to /admin/dashboard");
            goto("/admin/dashboard");
        }
    }
</script>

<form>
    <label for="username">Username:</label>
    <input id="username" type="text" bind:value={username} />
    <label for="password">Password:</label>
    <input id="password" type="password" bind:value={password} />
    <button onclick={submit} type="submit">Log in</button>
</form>
