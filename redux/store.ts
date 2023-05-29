import { configureStore } from '@reduxjs/toolkit';
import spotReducer from './spot';
import boundsReducer from './bounds';

export const store = configureStore({
  reducer: {
    spot: spotReducer,
    bounds: boundsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
