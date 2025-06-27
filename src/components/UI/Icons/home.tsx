import tw from "@/lib/tailwind";
import { IconProps } from "@/types/icon";
import Svg, { Path } from "react-native-svg";

export default function Home(props: IconProps) {
	return (
		<Svg style={tw`${props.tw ?? "w-5 h-5"}`} viewBox="0 0 20 20" fill="none">
			<Path
				d="M7.63099 17.3093V14.7537C7.63098 14.1037 8.16091 13.5755 8.81749 13.5712H11.2226C11.8823 13.5712 12.4171 14.1006 12.4171 14.7537V14.7537V17.3173C12.4169 17.8692 12.8619 18.3202 13.4192 18.3332H15.0226C16.6209 18.3332 17.9166 17.0504 17.9166 15.468V15.468V8.19803C17.9081 7.57553 17.6129 6.99096 17.115 6.6107L11.6314 2.23759C10.6708 1.47614 9.30515 1.47614 8.34449 2.23759L2.885 6.61863C2.3852 6.99736 2.08947 7.58289 2.08331 8.20597V15.468C2.08331 17.0504 3.37904 18.3332 4.97741 18.3332H6.58078C7.15194 18.3332 7.61496 17.8748 7.61496 17.3093V17.3093"
				stroke={props.fill ?? "#6D6D6D"}
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</Svg>
	);
}
