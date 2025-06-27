import {
	ChangePasswordData,
	LoginData,
	ResetPasswordData,
	SignUpData,
} from "@/types/auth";
import { userApi } from "./user";
import * as SecureStore from "expo-secure-store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
// import {
// 	GoogleSignin,
// 	isSuccessResponse,
// 	isErrorWithCode,
// 	statusCodes,
// } from "@react-native-google-signin/google-signin";
import { apiUrl } from "@/utils/env";

export const authApi = userApi.injectEndpoints({
	endpoints: builder => ({
		changePassword: builder.mutation<any, ChangePasswordData>({
			query: details => ({
				url: "/auth/change-password",
				method: "POST",
				body: details,
			}),
		}),
		activateAccount: builder.mutation<any, Omit<ResetPasswordData, "password">>({
			query: details => ({
				url: "/auth/activate-account",
				method: "POST",
				body: details,
				credentials: "omit",
			}),
		}),
		createAccount: builder.mutation<any, SignUpData>({
			query: details => ({
				url: "/auth/signup",
				method: "POST",
				body: details,
				credentials: "omit",
			}),
		}),
		resetPassword: builder.mutation<any, ResetPasswordData>({
			query: details => ({
				url: "/auth/password-reset",
				method: "POST",
				body: details,
				credentials: "omit",
			}),
		}),
		requestResetPassword: builder.mutation<any, string>({
			query: email => ({
				url: "/auth/password-reset-request",
				method: "POST",
				body: { email },
				credentials: "omit",
			}),
		}),
		resendActivationToken: builder.mutation<any, string>({
			query: email => ({
				url: "/auth/resend-activation-token",
				method: "POST",
				body: { email },
				credentials: "omit",
			}),
		}),
		logIn: builder.mutation<any, LoginData>({
			queryFn: async details => {
				try {
					const res = await fetch(`${apiUrl}/auth/login`, {
						method: "POST",
						body: JSON.stringify(details),
						headers: {
							"Content-Type": "application/json",
						},
						credentials: "omit",
					});
					const data = await res.json();
					console.log(data, res.status);
					if (res.ok) {
						console.log(data.data.accessToken, data.data.refreshToken, " - tokens");
						await SecureStore.setItemAsync("accessToken", data.data.accessToken);
						await SecureStore.setItemAsync("refreshToken", data.data.refreshToken);
						return data;
					}

					return { error: { data, status: res.status } };
				} catch (error: any) {
					console.error("Error logging in:", error);
					return { error: { ...error } as FetchBaseQueryError };
				}
			},
		}),
		logInGoogle: builder.mutation<any, void>({
			queryFn: async () => {
				// try {
				// await GoogleSignin.hasPlayServices();
				// await GoogleSignin.signOut();
				// const response = await GoogleSignin.signIn();
				// if (isSuccessResponse(response)) {
				// 	// setState({ userInfo: response.data });
				// 	console.log(response);
				// 	const res = await fetch(`${apiUrl}/accounts/mobile/google/`, {
				// 		method: "POST",
				// 		body: JSON.stringify({
				// 			id_token: response.data.idToken,
				// 			auth_code: response.data.serverAuthCode,
				// 		}),
				// 		headers: {
				// 			"Content-Type": "application/json",
				// 		},
				// 		credentials: "omit",
				// 	});
				// 	const data = await res.json();
				// 	console.log(data, res.status);
				// 	if (res.ok) {
				// 		await SecureStore.setItemAsync("access_token", data.access);
				// 		await SecureStore.setItemAsync("refresh_token", data.refresh);
				// 		return {
				// 			data: {
				// 				message: "Logged in successfully",
				// 				hasSetGoals: data.user.has_set_goals,
				// 			},
				// 		};
				// 	}

				// return { error: { data, status: res.status } };
				// } else {
				// 	// sign in was cancelled by user
				return { error: { data: "You must select an account", status: 400 } };
				// }
				// } catch (error: any) {
				// 	// if (isErrorWithCode(error)) {
				// 	// 	switch (error.code) {
				// 	// 		case statusCodes.IN_PROGRESS:
				// 	// 			// operation (eg. sign in) already in progress
				// 	// 			console.error("Error logging in:", error);
				// 	// 			return {
				// 	// 				error: { data: "A request is already in progress", status: 400 },
				// 	// 			};
				// 	// 		case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
				// 	// 			// Android only, play services not available or outdated
				// 	// 			console.error("Error logging in:", error);
				// 	// 			return {
				// 	// 				error: {
				// 	// 					data: "You must update play services to continue",
				// 	// 					status: 500,
				// 	// 				},
				// 	// 			};
				// 	// 		default:
				// 	// 			// some other error happened
				// 	// 			console.error("Error logging in:", error);
				// 	// 			return { error: { ...(error as any) } as FetchBaseQueryError };
				// 	// 	}
				// 	// } else {
				// 	// 	// an error that's not related to google sign in occurred
				// 	// 	console.error("Error logging in:", error);
				// 	return { error: { ...error } as FetchBaseQueryError };
				// 	// }
				// }
			},
		}),
		logOut: builder.mutation<any, void>({
			queryFn: async () => {
				try {
					// await GoogleSignin.signOut();
					await SecureStore.deleteItemAsync("access_token");
					await SecureStore.deleteItemAsync("refresh_token");
					return { data: { message: "Logged out successfully" } };
				} catch (error: any) {
					console.error("Error logging out:", error);
					return { error: { ...error } as FetchBaseQueryError };
				}
			},
		}),
	}),
});

export const {
	useChangePasswordMutation,
	useActivateAccountMutation,
	useCreateAccountMutation,
	useLogInMutation,
	useLogInGoogleMutation,
	useLogOutMutation,
	useRequestResetPasswordMutation,
	useResendActivationTokenMutation,
	useResetPasswordMutation,
} = authApi;
