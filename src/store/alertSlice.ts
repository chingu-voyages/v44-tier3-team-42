import type { StateCreator } from 'zustand';

import { ALERT_AUTO_DISMISS } from '@/config/constants';

export type AlertType = 'default' | 'error' | 'success';

export type Alert = {
  type?: AlertType;
  message?: string;
};

export type AlertSlice = {
  alert: Alert;
  setAlert: (alert: Alert) => void;
  resetAlert: () => void;
};

const initialState = {
  type: undefined,
  message: undefined,
};

export const createAlertSlice: StateCreator<AlertSlice, [], [], AlertSlice> = (
  set,
  get,
) => ({
  alert: initialState,
  setAlert: (newAlert) => {
    set(() => ({ alert: newAlert }));
    setTimeout(() => {
      get().resetAlert();
    }, ALERT_AUTO_DISMISS);
  },
  resetAlert: () => set(() => ({ alert: initialState })),
});
