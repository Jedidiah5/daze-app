import tw from "@/lib/tailwind";
import { IconProps } from "@/types/icon";
import Svg, { Path } from "react-native-svg";

export default function PersonOutlineNav(props: IconProps) {
	return (
		<Svg style={tw`${props.tw ?? "w-5 h-5"}`} viewBox="0 0 512 512" fill="none">
			<Path
				d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
				fill="none"
				stroke={props.fill ?? "#6D6D6D"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
			/>
			<Path
				d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
				fill="none"
				stroke={props.fill ?? "#6D6D6D"}
				strokeMiterlimit="10"
				strokeWidth="32"
			/>
		</Svg>
	);
} 