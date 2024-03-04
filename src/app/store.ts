import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import albumReducer from '../features/album/albumSlice'

export const store = configureStore({
  reducer: {
    album: albumReducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
