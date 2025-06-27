import { ExpoConfig, ConfigContext } from "expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

export default ({ config }: ConfigContext): ExpoConfig => {
	return {
		...config,
		name: getAppName(),
		slug: "bookpoint",
		android: {
			...config.android,
			package: getUniqueIdentifier(),
		},
		ios: {
			...config.ios,
			bundleIdentifier: getUniqueIdentifier(),
		},
		platforms: ["android", "ios", "web"],
	};
};

const getUniqueIdentifier = () => {
	if (IS_DEV) {
		return "com.enlance.bookpoint.dev";
	}

	if (IS_PREVIEW) {
		return "com.enlance.bookpoint.preview";
	}

	return "com.enlance.bookpoint";
};

const getAppName = () => {
	if (IS_DEV) {
		return "Bookpoint (Dev)";
	}

	if (IS_PREVIEW) {
		return "Bookpoint (Preview)";
	}

	return "Bookpoint";
};
