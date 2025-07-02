import tw from "@/lib/tailwind";
import { IconProps } from "@/types/icon";
import Svg, { Path, Rect, Circle } from "react-native-svg";

export default function CalendarOutlineNav(props: IconProps) {
	return (
		<Svg style={tw`${props.tw ?? "w-5 h-5"}`} viewBox="0 0 512 512" fill="none">
			<Rect
				x="48"
				y="80"
				width="416"
				height="384"
				rx="48"
				fill="none"
				stroke={props.fill ?? "#6D6D6D"}
				strokeLinejoin="round"
				strokeWidth="32"
			/>
			<Circle cx="296" cy="232" r="24" fill={props.fill ?? "#6D6D6D"} />
			<Circle cx="376" cy="232" r="24" fill={props.fill ?? "#6D6D6D"} />
			<Circle cx="296" cy="312" r="24" fill={props.fill ?? "#6D6D6D"} />
			<Circle cx="376" cy="312" r="24" fill={props.fill ?? "#6D6D6D"} />
			<Circle cx="136" cy="312" r="24" fill={props.fill ?? "#6D6D6D"} />
			<Circle cx="216" cy="312" r="24" fill={props.fill ?? "#6D6D6D"} />
			<Circle cx="136" cy="392" r="24" fill={props.fill ?? "#6D6D6D"} />
			<Circle cx="216" cy="392" r="24" fill={props.fill ?? "#6D6D6D"} />
			<Circle cx="296" cy="392" r="24" fill={props.fill ?? "#6D6D6D"} />
			<Path
				d="M128 48v32M384 48v32"
				fill="none"
				stroke={props.fill ?? "#6D6D6D"}
				strokeLinejoin="round"
				strokeWidth="32"
				strokeLinecap="round"
			/>
			<Path
				d="M464 160H48"
				fill="none"
				stroke={props.fill ?? "#6D6D6D"}
				strokeLinejoin="round"
				strokeWidth="32"
			/>
		</Svg>
	);
} 