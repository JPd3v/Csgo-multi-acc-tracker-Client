import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'stores/store';

interface SliceState {
  newSteamAccount: boolean;
}

const initialState: SliceState = {
  newSteamAccount: false,
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    open: (state, action: PayloadAction<keyof SliceState>) => {
      state[action.payload] = true;
      return state;
    },
    closeAll: () => initialState,
  },
});

export const { open, closeAll } = modalSlice.actions;

export function selectModals(state: RootState) {
  return state.modals;
}
export default modalSlice.reducer;
