export interface SignUpData {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	gender: "Male" | "Female";
}

export interface LoginData {
	email: string;
	password: string;
}

export interface ChangePasswordData {
	currentPassword: string;
	newPassword: string;
}

export interface ResetPasswordData {
	email: string;
	password: string;
	otp: string;
}

export interface UserData {
	isVerified: boolean;
	token: string;
	role: string;
	premium: boolean;
	hasSetGoals: boolean;
}
