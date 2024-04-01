import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { taskApi } from "../api/api";

const rootReducer = combineReducers({
  [taskApi.reducerPath]: taskApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
