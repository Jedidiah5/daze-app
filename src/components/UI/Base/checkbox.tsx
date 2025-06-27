import TW from "@/lib/tailwind";
import Checkbox, { CheckboxProps } from "expo-checkbox";

export default function TwCheckbox({
	tw,
	...props
}: CheckboxProps & {
	tw?: string;
}) {
	return (
		<Checkbox
			color={props.value ? TW.color("primary") : TW.color("#8C8C8C")}
			style={TW`${tw ?? ""} size-4 rounded border`}
			{...props}
		/>
	);
}
