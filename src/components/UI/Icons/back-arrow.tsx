import tw from "@/lib/tailwind";
import { IconProps } from "@/types/icon";
import Svg, { Path } from "react-native-svg";

export default function BackArrow(props: IconProps) {
	return (
		<Svg style={tw`${props.tw ?? "w-5 h-5"}`} viewBox="0 0 24 24" fill="none">
			<Path
				d="M19 12H5"
				stroke={props.fill ?? "#6D6D6D"}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<Path
				d="M12 19L5 12L12 5"
				stroke={props.fill ?? "#6D6D6D"}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</Svg>
	);
} 