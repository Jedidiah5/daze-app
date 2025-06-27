import { TwBottomSheetView, TwText, TwView } from "../tw-components";
import Button from "../Base/button";
import VerifiedIcon from "../Icons/verified-icon";
import BottomSheetModal from "@/components/UI/bottom-sheet-modal";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function VerifiedModal({
	text,
	subtext,
	buttonText,
	showModal,
	setShowModal,
	onConfirm,
}: {
	text: string;
	subtext: string;
	buttonText: string;
	showModal: boolean;
	setShowModal: (prev: boolean) => void;
	onConfirm: () => void;
}) {
	return (
		<BottomSheetModal
			bottomModalOpen={showModal}
			setBottomModalOpen={setShowModal}
		>
			<TwBottomSheetView tw="p-5 items-center gap-6">
				<VerifiedIcon />
				<TwView tw="gap-4">
					<TwView tw="gap-2">
						<TwText tw="font-semibold text-primary-text text-center">{text}</TwText>
						<TwText tw="text-sm text-secondary-text font-light text-center">
							{subtext}
						</TwText>
					</TwView>
					<Button
						onPress={onConfirm}
						icon={<AntDesign name="right" size={16} color="white" />}
						text={buttonText}
					/>
				</TwView>
			</TwBottomSheetView>
		</BottomSheetModal>
	);
}
