<script>

	import { page } from "$app/stores";

</script>
<div class="h-full w-full flex flex-col justify-center items-center">
  <h1 class="h1">
    Hi {$page.data.user.name} 👋
  </h1>
  <h2 class="h2">
    Welcome to your Maya Dashboard! ✨
  </h2>
</div>