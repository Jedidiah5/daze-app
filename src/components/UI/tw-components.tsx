import tw from "@/lib/tailwind";
import {
	TwBottomSheetScrollViewProps,
	TwBottomSheetTextInputProps,
	TwBottomSheetViewProps,
	TwGestureHandlerRootViewProps,
	TwPressableProps,
	TwScrollViewProps,
	TwTextInputProps,
	TwTextProps,
	TwViewProps,
} from "@/types/tw-types";
import {
	BottomSheetScrollView,
	BottomSheetView,
	BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export function TwView(props: TwViewProps) {
	return <View style={tw`${props.tw ?? ""}`} {...props}></View>;
}

export function TwText(props: TwTextProps) {
	return <Text style={tw`${props.tw ?? ""}`} {...props}></Text>;
}

export const TwScrollView = forwardRef<ScrollView, TwScrollViewProps>(
	(props, ref) => {
		return <ScrollView ref={ref} style={tw`${props.tw ?? ""}`} {...props} />;
	}
);

export const TwPressable = forwardRef<View, TwPressableProps>((props, ref) => {
	return <Pressable ref={ref} style={tw`${props.tw ?? ""}`} {...props} />;
});

export function TwTextInput(props: TwTextInputProps) {
	return <TextInput style={tw`${props.tw ?? ""}`} {...props} />;
}

export function TwBottomSheetScrollView(props: TwBottomSheetScrollViewProps) {
	return <BottomSheetScrollView style={tw`${props.tw ?? ""}`} {...props} />;
}

export function TwBottomSheetView(props: TwBottomSheetViewProps) {
	return <BottomSheetView style={tw`${props.tw ?? ""}`} {...props} />;
}

export function TwBottomSheetTextInput(props: TwBottomSheetTextInputProps) {
	return <BottomSheetTextInput style={tw`${props.tw ?? ""}`} {...props} />;
}

export function TwGestureHandlerRootView(props: TwGestureHandlerRootViewProps) {
	return <GestureHandlerRootView style={tw`${props.tw ?? ""}`} {...props} />;
}

TwPressable.displayName = "TwPressable";
TwScrollView.displayName = "TwScrollView";
