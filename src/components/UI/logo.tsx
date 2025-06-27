import { IconProps } from "@/types/icon";
import LogoIcon from "./Icons/logo-icon";
import { TwText, TwView } from "./tw-components";

export default function Logo(props: IconProps) {
	return (
		<TwView tw={"gap-3.5 " + props.tw}>
			<LogoIcon />
			<TwText tw="font-medium text-center text-4xl text-[2.5rem]">
				Book
				<TwText tw="font-medium text-center text-4xl text-[2.5rem]">Point</TwText>
			</TwText>
		</TwView>
	);
}
