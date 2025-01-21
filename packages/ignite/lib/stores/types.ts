import type { AuthSlice } from "$lib/stores/auth/types";
import type { SettingsSlice } from "$lib/stores/settings/types";
import type { StateCreator } from "zustand";
import type { immer } from "zustand/middleware/immer";
import type { persist } from "zustand/middleware/persist";

export type AppStore = SettingsSlice & AuthSlice;

type ImmerType = NonNullable<ReturnType<typeof immer>["$$storeMutators"]>[0];
type PersistType = NonNullable<ReturnType<typeof persist<AuthSlice>>["$$storeMutators"]>[0];

export type SliceCreator<T> = StateCreator<AppStore, [ImmerType], [PersistType], T>;
