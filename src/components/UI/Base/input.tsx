import { TwText, TwTextInput, TwView } from "../tw-components";
import { TextInputProps } from "react-native";
import TW from "@/lib/tailwind";

export default function Input({
	label,
	error,
	icon,
	leftIcon,
	size = "small",
	tw,
	rounded,
	...props
}: TextInputProps & {
	label?: string;
	error?: string;
	size?: "small" | "medium" | "large" | "none";
	tw?: string;
	rounded?: boolean;
	icon?: React.ReactNode;
	leftIcon?: React.ReactNode;
}) {
	return (
		<TwView tw="flex-col gap-2">
			{label && <TwText tw="text-sm font-semibold text-[#464646]">{label}</TwText>}
			<TwView
				style={TW.style(
					rounded ? "rounded-full" : "rounded",
					"bg-neutral px-3 border border-[#ECECEC] flex-row gap-2 items-center",
					{
						"h-8": size === "small",
						"h-10": size === "medium",
						"h-12.5": size === "large",
					}
				)}
			>
				{leftIcon}
				<TwTextInput
					tw={tw ? tw : "" + " text-[#464646] flex-grow h-full"}
					{...props}
					selectionColor={TW.color("primary")}
					placeholderTextColor={"#9D9D9D"}
				/>
				{icon}
			</TwView>
			{error && <TwText tw="text-sm font-medium text-error">{error}</TwText>}
		</TwView>
	);
}
