import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApi } from "@/services/user";
import devToolsEnhancer from "redux-devtools-expo-dev-plugin";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
	reducer: combineReducers({
		[userApi.reducerPath]: userApi.reducer,
	}),
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false }).concat(userApi.middleware),
	devTools: false,
	enhancers: getDefaultEnhancers =>
		getDefaultEnhancers().concat(devToolsEnhancer({ trace: true })),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
