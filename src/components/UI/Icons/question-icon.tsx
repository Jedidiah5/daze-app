import tw from "@/lib/tailwind";
import { IconProps } from "@/types/icon";
import Svg, { Path } from "react-native-svg";

export default function QuestionIcon(props: IconProps) {
	return (
		<Svg style={tw`${props.tw ?? "w-5 h-5"}`} viewBox="0 0 24 24" fill="none">
			<Path
				d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
				stroke={props.fill ?? "#6D6D6D"}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<Path
				d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.30197 14.92 10C14.92 12 11.92 13 11.92 13"
				stroke={props.fill ?? "#6D6D6D"}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<Path
				d="M12 17H12.01"
				stroke={props.fill ?? "#6D6D6D"}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</Svg>
	);
} 