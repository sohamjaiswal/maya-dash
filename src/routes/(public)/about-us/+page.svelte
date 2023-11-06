<script lang="ts">
	import type { StaffData } from '$lib/types/maya';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
  export let data
	type staffsData = StaffData[];
	let devsArr: staffsData = [];
	let managersArr: staffsData = [];
	let staffArr: staffsData = [];
	$: devsArr;
	$: managersArr;
	$: staffArr;
  onMount(async() => {
    const {staff, devs, managers} = await data.lazy.staffData;
      // convert staffRecord to staffsData
      Object.keys(devs).forEach((id) => {
        const dev = devs[id];
        devsArr = [
          ...devsArr,
          {
            id,
            avatar: dev.avatar,
            name: dev.name,
            bio: dev.bio,
            banner: dev.banner
          }
        ];
      });
      Object.keys(managers).forEach((id) => {
        const manager = managers[id];
        managersArr = [
          ...managersArr,
          {
            id,
            avatar: manager.avatar,
            name: manager.name,
            bio: manager.bio,
            banner: manager.banner
          }
        ];
      });
      Object.keys(staff).forEach((id) => {
        const staffee = staff[id];
        staffArr = [
          ...staffArr,
          {
            id,
            avatar: staffee.avatar,
            name: staffee.name,
            bio: staffee.bio,
            banner: staffee.banner
          }
        ];
      });
  })
</script>

<div class="flex flex-col items-center mt-2">
	<div class="container">
		<h1 class="h1">About Us 🧐</h1>
		<article>
			Maya has been developed by Beezo and SoSweetHam for Guilded.gg. We are a team of developers
			who are passionate about creating the best experience for our users. We are always open to
			feedback and suggestions, so feel free to join our Guilded server and let us know what you
			think!
		</article>
    <div class="flex flex-col gap-4">
      <h2 class="h2 mt-8">Meet the team! 🤗</h2>
    {#await data.lazy.staffData}
      Loading staff data...
    {:then}
      <div class="flex flex-col items-center">
        <h3 class="h3">Developers 💻</h3>
        <div class="flex flex-wrap gap-4 justify-center p-4">
          {#each devsArr as dev}
            <a href={`https://guilded.gg/profile/${dev.id}`}>
              <div class="card card-hover bg-initial w-72 h-80 overflow-hidden">
                <header class="card-header relative">
                  <div
                    style={`background-image: url(${dev.banner})`}
                    class="absolute left-0 right-0 h-60 top-0 bg-cover bg-center"
                  />
                </header>
                <div class="flex flex-col h-full items-center justify-end pb-10">
                  <Avatar src={dev.avatar} width="w-32" />
                  <h6 class="h6">
                    {dev.name}
                  </h6>
                  <!-- <p>
                    {dev.bio}
                  </p> -->
                </div>
              </div>
            </a>
          {/each}
        </div>
        <h3 class="h3">Managers 🧠</h3>
        <div class="flex flex-wrap gap-4 justify-center p-4">
          {#each managersArr as manager}
            <a href={`https://guilded.gg/profile/${manager.id}`}>
              <div class="card card-hover bg-initial w-72 h-80 overflow-hidden">
                <header class="card-header relative">
                  <div
                    style={`background-image: url(${manager.banner})`}
                    class="absolute left-0 right-0 h-60 top-0 bg-cover bg-center"
                  />
                </header>
                <div class="flex flex-col h-full items-center justify-end pb-10">
                  <Avatar src={manager.avatar} width="w-32" />
                  <h6 class="h6">
                    {manager.name}
                  </h6>
                  <!-- <p>
                    {manager.bio}
                  </p> -->
                </div>
              </div>
            </a>
          {/each}
        </div>  
        <h3 class="h3">Staff 🌐</h3>
        <div class="flex flex-wrap gap-4 justify-center p-4">
          {#each staffArr as staff}
            <a href={`https://guilded.gg/profile/${staff.id}`}>
              <div class="card card-hover bg-initial w-72 h-80 overflow-hidden">
                <header class="card-header relative">
                  <div
                    style={`background-image: url(${staff.banner})`}
                    class="absolute left-0 right-0 h-60 top-0 bg-cover bg-center"
                  />
                </header>
                <div class="flex flex-col h-full items-center justify-end pb-10">
                  <Avatar src={staff.avatar} width="w-32" />
                  <h6 class="h6">
                    {staff.name}
                  </h6>
                  <!-- <p>
                    {staff.bio}
                  </p> -->
                </div>
              </div>
            </a>
          {/each}
          </div>  
      </div>
      {:catch}
      An error occured while loading staff.
      {/await}  
    </div>
	</div>
</div>

<style lang="postcss">
  h3 {
    margin-top: 2rem;
    text-decoration: underline;
  }
</style>