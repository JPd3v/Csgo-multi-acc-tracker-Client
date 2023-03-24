import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'stores/store';

interface SliceState {
  newSteamAccount: ImodalState;
  deleteSteamAccount: ImodalState;
}

interface ImodalState {
  show: boolean;
  extraInfo?: IpayloadExtra;
}

interface Ipayload {
  modal: keyof SliceState;
  extraInfo?: IpayloadExtra;
}

interface IpayloadExtra {
  id?: string;
}

const initialState: SliceState = {
  newSteamAccount: { show: false },
  deleteSteamAccount: { show: false },
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    open: (state, action: PayloadAction<Ipayload>) => {
      state[action.payload.modal].show = true;
      state[action.payload.modal].extraInfo = action.payload.extraInfo;
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
