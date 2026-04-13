<script lang="ts">
  import type { SubmissionNew } from "$lib/types";

  const { submission }: { submission: SubmissionNew | undefined } = $props();
</script>

{submission ?? "No submission found."}
