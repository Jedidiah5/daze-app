import { apiUrl } from "@/utils/env";
import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";

const baseQuery = fetchBaseQuery({
	baseUrl: apiUrl,
	prepareHeaders: async headers => {
		const accessToken = await SecureStore.getItemAsync("accessToken");
		if (accessToken) {
			headers.set("Authorization", `Bearer ${accessToken}`);
		}
		return headers;
	},
});
const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result.error && result.error.status === 401) {
		// try to get a new token
		console.log("Refreshing token");
		const refreshResult = await baseQuery(
			"/api/v1/auth/refresh-access-token",
			api,
			extraOptions
		);
		if (refreshResult.data) {
			console.log(
				(refreshResult.data as any).accessToken,
				(refreshResult.data as any).refreshToken,
				" - tokens"
			);
			// store the new token
			await SecureStore.setItemAsync(
				"accessToken",
				(refreshResult.data as any).accessToken
			);
			await SecureStore.setItemAsync(
				"refreshToken",
				(refreshResult.data as any).refreshToken
			);
			// retry the initial query
			result = await baseQuery(args, api, extraOptions);
		} else {
			await SecureStore.deleteItemAsync("access_token");
			await SecureStore.deleteItemAsync("refresh_token");
		}
	}
	return result;
};

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: [],
	endpoints: () => ({}),
});
