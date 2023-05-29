import { create } from 'zustand';

import { type AlertSlice, createAlertSlice } from './alertSlice';

const useBoundStore = create<AlertSlice>((...a) => ({
  ...createAlertSlice(...a),
}));

export default useBoundStore;
