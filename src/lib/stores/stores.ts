import { writable, type Writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { browser } from '$app/environment';

// Session based theme store. Grabs the current theme from the current body.
export const storeTheme = writable(browser ? document.body.getAttribute('data-theme') ?? '' : 'skeleton');
export const userId: Writable<string> = localStorageStore('userId', '');
export const mayaToken: Writable<string> = localStorageStore('mayaToken', '');