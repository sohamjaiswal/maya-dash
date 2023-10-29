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
	});
</script>

<h1 class="h1 mt-2">📜 Audit Log</h1>
{#await data.lazy.auditLogData}
	<div class="flex flex-col gap-4 p-2 mt-6">
		<p>Loading...</p>
	</div>
{:then}
	<div class="flex flex-col gap-4 p-2 mt-6">
		{#each paginatedAudits as audit}
			<div class="card p-4 flex items-center bg-initial justify-between">
				<div class="flex gap-2 items-center">
					<Avatar src={audit.user.avatar} width="w-12" rounded="rounded-full" />
					{audit.user.name}
				</div>
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
				{:else if audit.action == 'ClearMessagesBy'}
					🗑️ Cleared Messages By
				{:else if audit.action == 'ClearMessagesIn'}
					🗑️ Cleared Messages In
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
				<div class="flex gap-2 items-center">
					<Avatar src={audit.victim.avatar} width="w-12" rounded="rounded-full" />
					{audit.victim.name}
				</div>
			</div>
		{/each}
		<Paginator
			bind:settings={paginationSettings}
			showFirstLastButtons={false}
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
