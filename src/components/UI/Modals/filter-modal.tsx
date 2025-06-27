import { TwBottomSheetScrollView, TwText, TwView } from "../tw-components";
import Button from "../Base/button";
import BottomSheetModal from "@/components/UI/bottom-sheet-modal";

export default function VerifiedModal({
	text,
	subtext,
	buttonText,
	showModal,
	setShowModal,
}: {
	text: string;
	subtext: string;
	buttonText: string;
	showModal: boolean;
	setShowModal: (prev: boolean) => void;
}) {
	return (
		<BottomSheetModal
			bottomModalOpen={showModal}
			setBottomModalOpen={setShowModal}
		>
			<TwBottomSheetScrollView tw="flex-1 pb-2 mt-6">
				<TwView tw="items-center gap-6">
					<TwView tw="gap-6">
						<TwView></TwView>
					</TwView>
					{/* <VerifiedIcon /> */}
					<TwView tw="gap-4">
						<TwView tw="gap-2">
							<TwText tw="font-semibold text-primary-text text-center">{text}</TwText>
							<TwText tw="text-sm text-secondary-text font-light text-center">
								{subtext}
							</TwText>
						</TwView>
						<Button tw="" text={buttonText} />
					</TwView>
				</TwView>
			</TwBottomSheetScrollView>
		</BottomSheetModal>
	);
}
