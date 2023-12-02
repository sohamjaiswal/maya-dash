<script lang="ts">
	import type { AuditElement, AuditRecords } from '$lib/types/maya';
	import { Paginator, type PaginationSettings, Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	export let data;
	let audits: AuditElement[] = [];
	$: audits = audits;
	let paginationSettings = {
		page: 0,
		limit: 5,
		size: audits.length,
		amounts: [1, 2, 5, 10]
	} satisfies PaginationSettings;
	$: paginatedAudits = audits.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
	onMount(async () => {
		function convertAndSortAuditRecords(records: AuditRecords): AuditElement[] {
			const sortedKeys = Object.keys(records)
				.map(Number)
				.sort((a, b) => b - a);
			const sortedAuditRecords = sortedKeys.map((key) => records[key]);
			return sortedAuditRecords;
		}
		const auditLogData = await data.lazy.auditLogData;
		audits = convertAndSortAuditRecords(auditLogData);
		paginationSettings = {
			page: 0,
			limit: 5,
			size: audits.length,
			amounts: [1, 2, 5, 10]
		};
	});
</script>

<h1 class="h1 mt-2 mb-8">📜 Audit Log</h1>
{#await data.lazy.auditLogData}
	<div class="flex flex-col gap-4 p-2 mt-6">
		<p>Loading...</p>
	</div>
{:then}
	<div class="flex flex-col gap-4 p-2">
		<div class="h-[calc(100vh-16rem)] overflow-y-scroll flex flex-col gap-4">
			{#each paginatedAudits as audit}
				<div class="card p-4 md:grid md:grid-cols-5 flex flex-col gap-4 bg-initial w-full">
					<div class="flex gap-2 justify-center items-center">
						<Avatar src={audit.user.avatar} width="w-12" rounded="rounded-full" />
						{audit.user.name}
					</div>
					<div class="flex justify-center items-center">
						{audit.user.id}
					</div>
					<div class="flex justify-center items-center">
						{#if audit.action == 'Kick'}
							🥾 Kicked
						{:else if audit.action == 'Ban'}
							🚫 Banned
						{:else if audit.action == 'Unban'}
							🚫 Unbanned
						{:else if audit.action == 'Mute'}
							🔇 Muted
						{:else if audit.action == 'Unmute'}
							🔊 Unmuted
						{:else if audit.action == 'Warn'}
							⚠️ Warned
						{:else if audit.action == 'Unwarn'}
							⚠️ Unwarned
						{:else if audit.action == 'ClearWarns'}
							⚠️ Cleared Warns
						{:else if audit.action == 'ClearMutes'}
							🔇 Cleared Mutes
						{:else if audit.action == 'ClearKicks'}
							🥾 Cleared Kicks
						{:else if audit.action == 'ClearBans'}
							🚫 Cleared Bans
						{:else if audit.action == 'ClearLogs'}
							📜 Cleared Logs
						{:else if audit.action == 'ClearAll'}
							🧹 Cleared All
						{:else if audit.action == 'Clear'}
							🧹 Cleared
						{:else if audit.action == 'ClearMessages'}
							🗑️ Cleared Messages
						{:else if audit.action == 'ClearMessagesFrom'}
							🗑️ Cleared Messages From
						{:else if audit.action == 'ClearMessagesBetween'}
							🗑️ Cleared Messages Between
						{:else if audit.action == 'ClearMessagesFromBy'}
							🗑️ Cleared Messages From By
						{:else if audit.action == 'ClearMessagesFromIn'}
							🗑️ Cleared Messages From In
						{:else if audit.action == 'ClearMessagesFromBetween'}
							🗑️ Cleared Messages From Between
						{:else if audit.action == 'ClearMessagesByIn'}
							🗑️ Cleared Messages By In
						{:else if audit.action == 'ClearMessagesByBetween'}
							🗑️ Cleared Messages By Between
						{:else if audit.action == 'ClearMessagesInBetween'}
							🗑️ Cleared Messages In Between
						{/if}
					</div>
					<div class="flex items-center justify-center">
						{audit.victim.id}
					</div>
					<div class="flex-row-reverse gap-2 items-center justify-center flex md:flex-row md:justify-end">
						{audit.victim.name}
						<Avatar src={audit.victim.avatar} width="w-12" rounded="rounded-full" />
					</div>
				</div>
			{/each}
		</div>
		<Paginator
			bind:settings={paginationSettings}
			showFirstLastButtons={true}
			showPreviousNextButtons={true}
			showNumerals
			maxNumerals={5}
		/>
	</div>
{:catch error}
	<p>
		{error.message}
	</p>
{/await}
