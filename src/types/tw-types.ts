import { BottomSheetScrollViewProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types";
import { BottomSheetTextInputProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput";
import { BottomSheetViewProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types";
import {
	PressableProps,
	ScrollViewProps,
	TextInputProps,
	TextProps,
	ViewProps,
} from "react-native";
import { GestureHandlerRootViewProps } from "react-native-gesture-handler/lib/typescript/components/GestureHandlerRootView";

export interface TwViewProps extends ViewProps {
	tw?: string;
}

export interface TwTextProps extends TextProps {
	tw?: string;
}

export type TwScrollViewProps = ScrollViewProps & {
	tw?: string;
};

export interface TwPressableProps extends PressableProps {
	tw?: string;
}

export type TwTextInputProps = TextInputProps & {
	tw?: string;
};

export type TwBottomSheetScrollViewProps = BottomSheetScrollViewProps & {
	tw?: string;
};

export type TwBottomSheetViewProps = BottomSheetViewProps & {
	tw?: string;
};

export type TwBottomSheetTextInputProps = BottomSheetTextInputProps & {
	tw?: string;
};

export type TwGestureHandlerRootViewProps = GestureHandlerRootViewProps & {
	tw?: string;
};
