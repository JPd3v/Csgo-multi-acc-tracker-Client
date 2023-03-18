import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import modalsSlice from 'features/modals/redux/modalsSlice';

const store = configureStore({ reducer: { modals: modalsSlice } });

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
