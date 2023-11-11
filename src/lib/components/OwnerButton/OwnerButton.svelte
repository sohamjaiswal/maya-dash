<script lang="ts">
	import { Avatar } from "@skeletonlabs/skeleton";

	export let text: string;
	export let disabled: boolean = false;
  export let ownerId: string;
  export let ownerAvatar: string;
</script>

<a href={`https://guilded.gg/profile/${ownerId}`} target="_blank" rel="noopener noreferrer">
  <button class={`${disabled ? 'disabled ' : ''} variant-filled-tertiary btn`} on:click={() => null}>
      <div class="flex gap-4">
          <Avatar src={ownerAvatar} width="w-7" />
          {text}
      </div>
    </button>
</a>