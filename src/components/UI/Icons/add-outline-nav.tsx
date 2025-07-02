import tw from "@/lib/tailwind";
import { IconProps } from "@/types/icon";
import Svg, { Path } from "react-native-svg";

export default function AddOutlineNav(props: IconProps) {
	return (
		<Svg style={tw`${props.tw ?? "w-5 h-5"}`} viewBox="0 0 512 512" fill="none">
			<Path
				d="M256 112v288M400 256H112"
				fill="none"
				stroke={props.fill ?? "#6D6D6D"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
			/>
		</Svg>
	);
} 