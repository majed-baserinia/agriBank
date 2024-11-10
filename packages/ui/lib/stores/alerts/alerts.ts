import { create } from "zustand";
import type { AppAlert } from "./types";

const state: { alerts: AppAlert[] } = { alerts: [] };

const useAlert = create(() => state);

const pushAlert = (newAlert: AppAlert) => {
	useAlert.setState((prev) => ({ alerts: [...prev.alerts, { ...newAlert }] }));
};

const clearAlert = () => {
	useAlert.setState(() => ({ alerts: [] }));
};

export { clearAlert, pushAlert, useAlert };
