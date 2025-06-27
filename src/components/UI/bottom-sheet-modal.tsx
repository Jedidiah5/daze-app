import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { TwGestureHandlerRootView } from "./tw-components";
import tw from "@/lib/tailwind";
import { ReactNode, useCallback, useEffect, useRef } from "react";

export default function BottomSheetModal({
	bottomModalOpen,
	setBottomModalOpen,
	modalHeight,
	children,
}: {
	bottomModalOpen: boolean;
	setBottomModalOpen: (value: boolean) => void;
	modalHeight?: string;
	children: ReactNode;
}) {
	const sheetRef = useRef<BottomSheet>(null);
	// const snapPoints = useMemo(() => [modalHeight ?? "40%"], [modalHeight]);
	const handleSheetChange = useCallback((index: number) => {
		console.log("handleSheetChange", index);
	}, []);
	const handleSnapPress = useCallback((index: number) => {
		sheetRef.current?.snapToIndex(index);
	}, []);
	const handleBottomSheetClosePress = useCallback(() => {
		setBottomModalOpen(false);
		sheetRef.current?.close();
	}, [setBottomModalOpen]);
	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				pressBehavior="close"
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				style={tw`bg-black/40`}
			/>
		),
		[]
	);

	useEffect(() => {
		if (bottomModalOpen) {
			handleSnapPress(0);
		} else {
			handleBottomSheetClosePress();
		}
	}, [bottomModalOpen, handleBottomSheetClosePress, handleSnapPress]);

	return (
		<TwGestureHandlerRootView tw="absolute inset-0 z-50">
			<BottomSheet
				ref={sheetRef}
				index={0}
				// snapPoints={snapPoints}
				backdropComponent={renderBackdrop}
				onChange={handleSheetChange}
				onClose={handleBottomSheetClosePress}
				enablePanDownToClose
				backgroundStyle={tw`bg-background rounded-t-lg p-5`}
				handleIndicatorStyle={tw`bg-[#E0E0E0] w-10`}
			>
				{children}
			</BottomSheet>
		</TwGestureHandlerRootView>
	);
}
