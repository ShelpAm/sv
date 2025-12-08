<script lang="ts">
    var text = $state("");
    const confirm_str = "Yes I'm silly and want to stop the server";

    const stop_server = async () => {
        if (text != confirm_str) {
            alert(
                "Failed to stop server. Check your have correctly typed the confirmation string.",
            );
            return;
        }

        const res = await fetch("/api/stop", { method: "POST" });
        if (res.ok) {
            alert("Successfully stopped the server");
            console.log("Successfully stopped the server");
        } else {
            console.error("Failed to stop the server: " + (await res.text()));
            alert("Failed to stop the server: " + (await res.text()));
        }
    };
</script>

<h2>Shutdown the server</h2>

<p>VERY DANGER!!! THINK BEFORE YOU TAKE ACTION</p>

Type "{confirm_str}" in the following box if you are <b>really ready</b> to stop
the server, and push the button.

<form>
    <input type="text" bind:value={text} />
    <button onclick={stop_server} type="submit">Stop the server</button>
</form>
