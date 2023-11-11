<script>
	import { page } from "$app/stores";
</script>
<div class="flex flex-col items-center mt-5">
    <div class="container">
        <div class="flex flex-col w-full justify-center items-center gap-4">
            <h1 class="h1 text-error-500">
                Error
            </h1>
            <p class="p">
                {$page.error?.message}
            </p>
            <!-- button to go back to server browse -->
            <a href="/servers/browse/1">
                <button class="btn variant-filled-primary">
                    Go Back
                </button>
            </a>
        </div>
    </div>
</div>