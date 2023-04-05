import { Action, configureStore } from '@reduxjs/toolkit';
import users from '../page/user/Users.slice';

const middlewareConfiguration = { serializableCheck: false };

export const store = configureStore({
  reducer: { users },
  devTools: {
    name: 'Table',
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(middlewareConfiguration),
});
export type State = ReturnType<typeof store.getState>;

export function dispatchOnCall(action: Action) {
  return () => store.dispatch(action);
}
