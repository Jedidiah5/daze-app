import tw from "@/lib/tailwind";
import { IconProps } from "@/types/icon";
import Svg, { Path } from "react-native-svg";

export default function HomeOutlineNav(props: IconProps) {
	return (
		<Svg style={tw`${props.tw ?? "w-5 h-5"}`} viewBox="0 0 512 512" fill="none">
			<Path
				d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212"
				fill="none"
				stroke={props.fill ?? "#6D6D6D"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
			/>
			<Path
				d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69"
				fill="none"
				stroke={props.fill ?? "#6D6D6D"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
			/>
		</Svg>
	);
} 