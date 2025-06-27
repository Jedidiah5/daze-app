import { forwardRef, useState } from "react";
import { TwPressable, TwText, TwView } from "../tw-components";
import { ActivityIndicator, View } from "react-native";
import TW from "../../../lib/tailwind";
import { TwPressableProps } from "@/types/tw-types";

const Button = forwardRef<
	View,
	TwPressableProps & {
		text?: string;
		variant?: "primary" | "neutral" | "ghost" | "error";
		size?: "small" | "medium" | "large" | "undefined";
		ghostText?: string;
		icon?: React.ReactNode;
		leftIcon?: React.ReactNode;
		loading?: boolean;
		rounded?: string;
	}
>(
	(
		{
			text,
			variant = "primary",
			size = "large",
			tw,
			icon,
			ghostText,
			leftIcon,
			loading,
			rounded,
			...props
		},
		ref
	) => {
		const [isPressed, setIsPressed] = useState(false);
		return (
			<TwView
				style={TW.style(tw, rounded ? `rounded-${rounded}` : "rounded-full", {
					"bg-primary": variant === "primary",
					"bg-white border border-border": variant === "neutral",
					"bg-error": variant === "error",
					"h-8": size === "small",
					"h-10": size === "medium",
					"h-12.5": size === "large",
					"opacity-50": props.disabled!,
					"opacity-85": !props.disabled! && isPressed,
				})}
			>
				<TwPressable
					onPressIn={e => {
						if (props.onPressIn) props.onPressIn(e);
						setIsPressed(true);
					}}
					onPressOut={e => {
						if (props.onPressOut) props.onPressOut(e);
						setIsPressed(false);
					}}
					android_ripple={{ color: TW.color("white"), borderless: false }}
					tw={`w-full h-full border-0 flex-row gap-2 items-center justify-center`}
					ref={ref}
					{...props}
				>
					{loading ?
						<ActivityIndicator animating={loading} color={TW.color("white")} />
					:	<>
							{leftIcon}
							{text && (
								<TwText
									tw={`${
										variant === "ghost" ?
											ghostText ? ghostText
											:	"text-primary"
										: variant === "neutral" ? "text-primary-text"
										: "text-background"
									} ${
										size === "large" ? "font-semibold text-base"
										: size === "medium" ? "font-medium text-sm"
										: size === "small" ? "font-normal text-xs"
										: ""
									}`}
								>
									{text}
								</TwText>
							)}
							{icon}
						</>
					}
				</TwPressable>
			</TwView>
		);
	}
);

Button.displayName = "Button";

export default Button;
