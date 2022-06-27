import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import questsReducer from './quests/questsSlice';

export const store = configureStore({
  reducer: {
    quests: questsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
