import { TwText, TwView } from "../tw-components";
import {
	NativeSyntheticEvent,
	TextInputKeyPressEventData,
	TextInputProps,
} from "react-native";
import TW from "@/lib/tailwind";
import { useCallback, useEffect, useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";

export default function OTPInput({
	label,
	error,
	otpLength = 6,
	isError,
	tw,
	...props
}: TextInputProps & {
	label?: string;
	error?: string;
	isError?: boolean;
	otpLength?: number;
	tw?: string;
	icon?: React.ReactNode;
	leftIcon?: React.ReactNode;
}) {
	const { onChangeText } = props;
	const [otpValues, setOtpValues] = useState(() => {
		const initialValues = Array(otpLength).fill("");
		if (props.value) {
			for (let i = 0; i < props.value.length && i < otpLength; i++) {
				initialValues[i] = props.value[i];
			}
		}
		return initialValues;
	});
	const [isFocused, setIsFocused] = useState(false);
	const inputsRef = useRef<TextInput[]>([]);

	const handleChange = useCallback(
		(index: number, value: string) => {
			// Only allow numbers and ensure it's a single digit
			if (/^\d?$/.test(value)) {
				setOtpValues(prevValues => {
					const newValues = [...prevValues];
					newValues[index] = value;
					return newValues;
				});

				// Auto-focus next input if a digit is entered
				if (value && index < otpLength!) {
					inputsRef.current[index + 1]?.focus();
				}
			}
		},
		[otpLength]
	);

	const handleKeyPress = useCallback(
		(
			index: number,
			{ nativeEvent: { key } }: NativeSyntheticEvent<TextInputKeyPressEventData>
		) => {
			if (key === "Backspace" && !otpValues[index] && index > 0) {
				// Auto-focus previous input when pressing backspace on empty input
				inputsRef.current[index - 1]?.focus();
			}
		},
		[otpValues]
	);

	// Add useEffect to propagate changes
	useEffect(() => {
		if (onChangeText) onChangeText(otpValues.join(""));
	}, [otpValues, onChangeText]); // Runs when otpValues changes

	return (
		<TwView tw="flex-col gap-2 w-full">
			{label && <TwText tw="text-sm font-medium text-white">{label}</TwText>}
			<TwView tw="flex-row gap-2 justify-evenly w-full">
				{otpValues.map((value, index) => (
					<TwView
						key={index}
						tw={
							`size-13 bg-[#ECEDED] rounded-lg flex-row gap-2 justify-center items-center` +
							`${
								isError ? " border-red-500 border"
								: isFocused ? " border-primary border"
								: ""
							}`
						}
					>
						<TextInput
							style={TW`${tw ? tw : ""} text-primary-text items-center text-lg text-center flex-grow min-w-1 h-full`}
							{...props}
							ref={el => {
								inputsRef.current[index] = el as TextInput;
							}}
							onFocus={e => {
								if (props.onFocus) props.onFocus(e);
								setIsFocused(true);
							}}
							onBlur={e => {
								if (props.onBlur) props.onBlur(e);
								setIsFocused(false);
							}}
							value={value}
							maxLength={1}
							inputMode="numeric"
							selectionColor={TW.color("primary")}
							onChangeText={text => handleChange(index, text)}
							onKeyPress={e => handleKeyPress(index, e)}
						/>
					</TwView>
				))}
			</TwView>
			{error && <TwText tw="text-sm font-medium text-red-500">{error}</TwText>}
		</TwView>
	);
}
