import tw from "@/lib/tailwind";
import { IconProps } from "@/types/icon";
import Svg, { Path } from "react-native-svg";

export default function PeopleOutlineNav(props: IconProps) {
	return (
		<Svg style={tw`${props.tw ?? "w-5 h-5"}`} viewBox="0 0 512 512" fill="none">
			<Path
				d="M402 168c-2.93 40.67-33.1 72-66 72s-63.12-31.32-66-72c-3-42.31 26.37-72 66-72s69 30.46 66 72z"
				fill="none"
				stroke={props.fill ?? "#6D6D6D"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
			/>
			<Path
				d="M336 304c-65.17 0-127.84 32.37-143.54 95.41-2.08 8.34 3.15 16.59 11.72 16.59h263.65c8.57 0 13.77-8.25 11.72-16.59C463.85 335.36 401.18 304 336 304z"
				fill="none"
				stroke={props.fill ?? "#6D6D6D"}
				strokeMiterlimit="10"
				strokeWidth="32"
			/>
			<Path
				d="M200 185.94c-2.34 32.48-26.72 58.06-53 58.06s-50.7-25.57-53-58.06C91.61 152.15 115.34 128 147 128s55.39 24.77 53 57.94z"
				fill="none"
				stroke={props.fill ?? "#6D6D6D"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
			/>
			<Path
				d="M206 306c-18.05-8.27-37.93-11.45-59-11.45-52 0-102.1 25.85-114.65 76.2-1.65 6.66 2.53 13.25 9.37 13.25H154"
				fill="none"
				stroke={props.fill ?? "#6D6D6D"}
				strokeLinecap="round"
				strokeMiterlimit="10"
				strokeWidth="32"
			/>
		</Svg>
	);
} 