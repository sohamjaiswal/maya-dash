<script lang="ts">
	import type { MembersData, MembersRecord } from '$lib/types/maya.js';
	import { Avatar, Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	export let data;
	let membersData: MembersData = [];
	$: searchUser = ""
	function convertMembersRecordToMembersData(membersRecord: MembersRecord): MembersData {
			return Object.keys(membersRecord).map((id) => {
				const memberRecord = membersRecord[id];
				return {
					id,
					avatar: memberRecord.avatar,
					name: memberRecord.name,
				};
			});
		}
	$: members = membersData;
	let paginationSettings = {
		page: 0,
		limit: 10,
		size: membersData.length,
		amounts: [10, 25, 50, 100]
	} satisfies PaginationSettings;
	$: paginatedMembers = members.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
	$: handleSearchUser = async() => {
		if (searchUser == "") {
			members = convertMembersRecordToMembersData(await data.lazy.memberData);
		} else {
			members = convertMembersRecordToMembersData(await data.lazy.memberData).filter((member) => member.name.toLowerCase().includes(searchUser.toLowerCase()));
		}
	};
	onMount(async () => {
		const memberData = await data.lazy.memberData;
		members = convertMembersRecordToMembersData(memberData);
		paginationSettings = {
			page: 0,
			limit: 10,
			size: members.length,
			amounts: [10, 25, 50, 100]
		};
	});
</script>

<h1 class="h1 mt-2 mb-8">👥 Members</h1>
{#await data.lazy.memberData}
	<div class="flex flex-col gap-4 p-2 mt-6">
		<p>Loading...</p>
	</div>
{:then}
	<div class="p-2 flex flex-col gap-4">
		<input class="input" type="text" bind:value={searchUser} placeholder="🔍 Find User" on:input={handleSearchUser} />
		{#if searchUser == ""}
		<div class="h-[calc(100vh-20rem)] overflow-y-scroll flex flex-col gap-4">
			{#each paginatedMembers as member}
				<div class="card p-4 flex items-center bg-initial justify-between">
					<div class="flex gap-2 items-center">
						<Avatar src={member.avatar} width="w-12" rounded="rounded-full" />
						{member.name}
					</div>
					<div class="flex gap-4 items-center">
						{member.id}
						<form action="?/kick" method="post">
							<input type="hidden" name="id" value={member.id} />
							<button type="submit" class="btn btn-primary variant-outline-error">Kick</button>
						</form>
						<form action="?/ban" method="post">
							<input type="hidden" name="id" value={member.id} />
							<button type="submit" class="btn btn-primary variant-filled-error">Ban</button>
						</form>
					</div>
				</div>
			{/each}
		</div>
		<Paginator
			bind:settings={paginationSettings}
			showFirstLastButtons={true}
			showPreviousNextButtons={true}
			showNumerals
			maxNumerals={3}
		/>
		{:else}
			{#if members.length > 0}
				<div class="h-[calc(100vh-20rem)] overflow-y-scroll flex flex-col gap-4">
					{#each members as member}
						<div class="card p-4 flex items-center bg-initial justify-between">
							<div class="flex gap-2 items-center">
								<Avatar src={member.avatar} width="w-12" rounded="rounded-full" />
								{member.name}
							</div>
							<div class="flex gap-4 items-center">
								{member.id}
								<form action="?/kick" method="post">
									<input type="hidden" name="id" value={member.id} />
									<button type="submit" class="btn btn-primary variant-outline-error">Kick</button>
								</form>
								<form action="?/ban" method="post">
									<input type="hidden" name="id" value={member.id} />
									<button type="submit" class="btn btn-primary variant-filled-error">Ban</button>
								</form>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p>
					No members found.
				</p>
			{/if}
		{/if}
	</div>
{:catch error}
	<p>
		{error.message}
	</p>
{/await}
