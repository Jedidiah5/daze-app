import Toast from "react-native-toast-message";

export const notify = (
	msg: string,
	type: "error" | "success" | "info" = "info"
) => {
	Toast.show({
		type,
		text1: msg,
	});
};

export function validateEmail(email: string) {
	const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return regex.test(email);
}

//! regex for full password
export function validatePassword(password: string) {
	const regex = /^(?=.*[a-zA-Z])(?=.*[0-9@#$%^&*])(?=.{8,}).*$/;
	return regex.test(password);
}
