import { writable } from 'svelte/store';

export const connected_account = writable(false);
export const connect_account_type = writable("");
export const bridge_tab_selected = writable("");

